import { createContext } from "react";

import type { UserProps } from "./provider";

interface AuthContextData {
  signed: boolean;
  loadingAuth: boolean;
  user: UserProps | null;
}

export const AuthContext = createContext({} as AuthContextData);
