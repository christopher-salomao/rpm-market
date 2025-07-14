import { createContext } from "react";


interface AuthContextData {
  signed: boolean;
  loadingAuth: boolean;
}

export const AuthContext = createContext({} as AuthContextData);
