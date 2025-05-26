/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import UserService from "../services/user.service";
import { UserLoginDTO, UserSignUpDTO } from "../models/IUser";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

type UserContextType = {
  token: string | null;
  error: string | null;
  registerUser: (data: UserSignUpDTO) => void;
  loginUser: (data: UserLoginDTO) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

type Props = { children: React.ReactNode };

export const UserProvider = ({ children }: Props) => {
  const userService: UserService = new UserService();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("token");
        setToken(storedToken);
      } catch (e) {
        console.error(e);
      } finally {
        setIsReady(true);
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    if (isReady) {
      if (token) {
        console.log("hello test loginUser");
      } else {
        router.replace("/login");
      }
    }
  }, [isReady, token, router]);

  const loginUser = async (data: UserLoginDTO): Promise<void> => {
    try {
      const response = await userService.login(data);
      await SecureStore.setItemAsync("token", response.token);
      setToken(response.token);
      setError(null);
      console.log("hello test loginUser");
    } catch (e) {
      console.error("Login Failed" + e);
    }
  };

  const registerUser = async (data: UserSignUpDTO): Promise<void> => {
    try {
      const response = await userService.register(data);
      await SecureStore.setItemAsync("token", response.token);
      setToken(response.token);
      setError(null);
      console.log("Registered successfully");
    } catch (error: any) {
      console.log(
        "Full error object:",
        JSON.stringify(error, Object.getOwnPropertyNames(error), 2)
      );

      if (error.response) {
        console.error("Backend response:", error.response.data);
        Alert.alert("Register Error", JSON.stringify(error.response.data));
      } else if (error.request) {
        console.error("No response received:", error.request);
        Alert.alert(
          "Register Error",
          "No response from server. Check network or API URL."
        );
      } else {
        console.error("Unknown error:", error.message);
        Alert.alert("Register Error", error.message);
      }

      throw error;
    }
  };

  const isLoggedIn = (): boolean => {
    return !!token;
  };

  const logout = (): void => {
    SecureStore.deleteItemAsync("token");
    setToken(null);
    router.replace("/login");
  };

  return (
    <UserContext.Provider
      value={{
        loginUser,
        token,
        logout,
        isLoggedIn,
        registerUser,
        error,
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
