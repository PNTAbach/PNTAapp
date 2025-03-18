import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import React from "react";
import { UserProvider, useAuth } from "../conf/useAuth";

const RootLayout = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Stack initialRouteName={"(auth)"}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
};

const App = () => (
  <UserProvider>
    <View style={styles.root}>
      <RootLayout />
    </View>
  </UserProvider>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#363636",
  },
});

export default App;
