import { ApolloServer } from 'apollo-server-micro';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';
import Cors from 'micro-cors';

import { schema } from '../../graphql/schema';
import { createContext } from '../../graphql/context';
import { prisma } from '../../lib/prisma';
import { pubsub } from '../../graphql/context';


const cors = Cors({ allowCredentials: true, origin: 'https://studio.apollographql.com' });


const path = '/api';
const apollo = new ApolloServer({
  schema,
  csrfPrevention: true,
  introspection: true,
  // Default cache in Apollo Server 3 is unbounded, meaning an attacker can exhaust the memory and crash the server.
  // Without this setting, server is vulnerable to denial of service attacks via memory exhaustion.
  // cache: "bounded" is the equivalent of cache: new InMemoryLRUCache(),
  // a wrapper around the lru-cache package that has a default maximum of approximately 30MiB of memory.
  cache: 'bounded',
  context: createContext,
});

// Very important that this is defined here and called from inside handler,
// otherwise apollo server will be initialized on every request
const startServer = apollo.start();

export default cors(async function (req, res: any) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  // await startServer here, because if placed inside IF statement block it will be called multiple times
  // and we will get ERROR: server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration
  await startServer;

  if (!res.socket.server.apollo) {
    res.socket.path = path;
    res.socket.server.apollo = apollo.createHandler({ path });
    res.socket.server.gqlwsserver = new WebSocketServer({
      server: res.socket.server,
      path,
    });

    res.socket.server.subtransport = useServer(
      {
        schema,
        onConnect: ({ subscriptions, connectionParams }) => {
          console.log('connectionParams', connectionParams);
        },
        onError: (ctx, msg, errors) => {
          console.log(errors);
        },
        onDisconnect: () => {
          console.log('Disconnected');
        },
        context: async (ctx, msg, args) => {
          return {
            pubsub,
            prisma,
          }
        }
      },
      res.socket.server.gqlwsserver,
    );
  }

  // Possibly use return instead of await here
  await res.socket.server.apollo(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};