import React from 'react';
import { Text, View } from 'react-native';

export default function Missing() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text onPress={() => {}}>404</Text>
        </View>
    );
}