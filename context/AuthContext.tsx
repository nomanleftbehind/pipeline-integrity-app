import { QueryLazyOptions } from '@apollo/client';

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

interface IContextProps {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  authLoading: boolean;
  authError: string;
  loadUser: (options?: QueryLazyOptions<Exact<{ [key: string]: never; }>> | undefined) => void;
}

const AuthContext = createContext<IContextProps | null>(null);

interface IAuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUser>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string>('');

  const [loadUser, { data, loading }] = useMeLazyQuery({
    onCompleted: (data) => {
      console.log('on completed', data);
      setUser(data.me);
      setAuthLoading(loading);
    },
    onError: (err) => {
      setAuthError(err.message);
    },
  });

  useEffect(() => loadUser(), []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, authLoading, loadUser, authError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
