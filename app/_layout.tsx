import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import React from 'react';
import { UserProvider, useAuth } from '../conf/useAuth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const RootLayout = () => {
    const { isLoggedIn } = useAuth();
    return (
        <Stack initialRouteName={isLoggedIn() ? '(home)' : '(auth)'}>
            <Stack.Screen name="(home)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="[missing]" options={{ title: '404' }} />
        </Stack>
    );
};

const App = () => (
    <GestureHandlerRootView>
        <UserProvider>
            <View style={styles.root}>
                <RootLayout />
            </View>
        </UserProvider>
    </GestureHandlerRootView>
);

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#363636',
    },
});
export default App;