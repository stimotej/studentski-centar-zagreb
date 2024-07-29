import type {
  LoginResponse,
  ValidateTokenResponse,
} from "@/features/auth/types";
import React, { createContext, useMemo, useState, useEffect } from "react";
import axios from "axios";
import * as z from "zod";

const userSchema = z.object({
  email: z.string(),
  nicename: z.string(),
  displayName: z.string(),
  roles: z.array(z.string()),
});

type User = z.infer<typeof userSchema>;

axios.defaults.baseURL =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_SC_API_URL
    : "/api/data";

interface AuthContextData {
  user: User | null;
  login: (username: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const userData = JSON.parse(localStorage.getItem("user-data") || "null");
      try {
        const parsedUser = userSchema.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        return;
      }
      const token = localStorage.getItem("access-token");
      try {
        const response = await axios.post<ValidateTokenResponse>(
          "http://161.53.174.14/wp-json/jwt-auth/v1/token/validate",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.data.status !== 200) {
          logout();
          return;
        }
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        setUser(null);
        logout();
      }
    })();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post<LoginResponse>(
        "http://161.53.174.14/wp-json/jwt-auth/v1/token",
        {
          username,
          password,
        }
      );
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      localStorage.setItem("access-token", response.data.token || "");
      const userData = {
        email: response.data.user_email,
        nicename: response.data.user_nicename,
        displayName: response.data.user_display_name,
        roles: response.data.user_roles,
      };
      localStorage.setItem("user-data", JSON.stringify(userData));
      setUser(userData);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("access-token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const authData = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={authData}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }

  return context;
};
