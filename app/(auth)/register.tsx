import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../conf/useAuth";

export default function RegisterScreen() {
  const router = useRouter();
  const { registerUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    phoneCountryCode: "",
    birthDate: "",
    fname: "",
    lname: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    try {
      console.log("Sending data:", {
  ...form,
  birthDate: new Date(form.birthDate),
});

      await registerUser({
      ...form,
      birthDate: new Date(form.birthDate), // convert string to Date
    });
      Alert.alert("Success", "Registration successful!");
      router.replace("/login"); 
    } catch (error) {
      Alert.alert("Error", "Registration failed. Please check your data.");
      console.error("Register error:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>
      {Object.entries(form).map(([key, value]) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key}
          value={value}
          onChangeText={(text) => handleChange(key, text)}
        />
      ))}
      <Button title="Register" onPress={handleRegister} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
});
