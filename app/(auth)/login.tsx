import React from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../../conf/useAuth";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const { loginUser } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    loginUser({ email: "admin@admin.com", password: "Admin12344*" });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          handleLogin();
        }}
      >
        Sign In
      </Text>

      <Button
        onPress={() => {
          router.navigate("/register");
        }}
        title="open regster"
      ></Button>
    </View>
  );
}
