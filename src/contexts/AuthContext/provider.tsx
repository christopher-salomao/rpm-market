import { type ReactNode, useState, useEffect } from "react";
import { AuthContext } from "./context";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

interface UserProps {
  uid: string;
  email: string | null;
  name: string | null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user?.email,
          name: user?.displayName,
        });
        setLoadingAuth(false);
      } else {
        setUser(null);
        setLoadingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [])

  return (
    <AuthContext.Provider value={{ signed: !!user, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
