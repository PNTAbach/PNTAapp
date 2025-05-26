import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Button,
    StyleSheet,
    StatusBar as RNStatusBar,
} from 'react-native';
import { useAuth } from '../../conf/useAuth';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen() {
    const { logout } = useAuth();
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" backgroundColor="#363636" />
            <View>
                <Text>ProfileScreen</Text>
                <Button
                    title="logout"
                    onPress={() => {
                        logout();
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#363636',
        paddingTop: RNStatusBar.currentHeight || 0,
    },
});