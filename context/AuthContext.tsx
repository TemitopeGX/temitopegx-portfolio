import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import {
  User,
  signInWithEmailAndPassword,
  signOut,
  AuthError,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/router";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        router.push("/admin/products");
      }
    } catch (error) {
      console.error("Login error:", error);
      const authError = error as AuthError;
      switch (authError.code) {
        case "auth/invalid-credential":
          throw new Error("Invalid email or password");
        case "auth/user-not-found":
          throw new Error("No account found with this email");
        case "auth/wrong-password":
          throw new Error("Incorrect password");
        case "auth/too-many-requests":
          throw new Error("Too many failed attempts. Please try again later");
        case "auth/user-disabled":
          throw new Error("This account has been disabled");
        default:
          throw new Error("Failed to login. Please try again");
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error("Failed to logout. Please try again");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
