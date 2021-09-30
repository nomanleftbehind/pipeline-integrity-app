import * as express from "express";
import * as cors from 'cors';
import { connect, connection } from 'mongoose';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());


const uri = process.env.PIPELINE_DATABASE_URL;

if (typeof uri === "string") {
  connect(uri);
}

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// const pipelinesRouter = require('./routes/pipelines');
import pipelinesRouter from './routes/pipelines';
// const usersRouter = require('./routes/users');

app.use('/', pipelinesRouter);
// app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
