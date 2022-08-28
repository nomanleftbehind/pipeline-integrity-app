import { LazyQueryHookOptions, QueryResult } from '@apollo/client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  ReactNode,

} from 'react';

import { useMeLazyQuery, MeQuery, Exact } from '../graphql/generated/graphql';

export type IUser = MeQuery['me'];

export type IUserNonNull = NonNullable<IUser>;

interface IContextProps {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  authLoading: boolean;
  authError: string;
  loadUser: (options?: Partial<LazyQueryHookOptions<MeQuery, Exact<{ [key: string]: never; }>>>) => Promise<QueryResult<MeQuery, Exact<{ [key: string]: never; }>>>;
}

const AuthContext = createContext<IContextProps | null>(null);

interface IAuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUser>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  const [loadUser, { data, loading }] = useMeLazyQuery({
    onCompleted: (data) => {
      setUser(data.me);
      setAuthLoading(loading);
    },
    onError: (err) => {
      setAuthError(err.message);
    },
  });

  useEffect(() => {
    const loadUserAwait = async () => {
      await loadUser();
    }
    loadUserAwait();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, authLoading, loadUser, authError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
