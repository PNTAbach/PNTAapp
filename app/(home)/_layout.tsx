import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {
    SafeAreaProvider,
    initialWindowMetrics,
} from 'react-native-safe-area-context';

export default function _layout() {
    const [tabBarHeight, setTabBarHeight] = useState(0);

    useEffect(() => {
        const screenHeight = Dimensions.get('window').height;
        const calculatedHeight = Math.floor(screenHeight * 0.075);
        setTabBarHeight(calculatedHeight);
    }, []);

    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <Tabs
                initialRouteName="venue"
                screenOptions={{
                    tabBarHideOnKeyboard: true,
                    tabBarActiveTintColor: '#F8E193',
                    tabBarInactiveTintColor: '#f6f6f6',
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#363636',
                        //height: tabBarHeight,
                        shadowColor: '#F8E193',
                        shadowOffset: { width: 0, height: -10 },
                        shadowOpacity: 0.2,
                        shadowRadius: 10.0,
                        elevation: 24,
                        zIndex: 20,
                    },
                    tabBarShowLabel: false,
                }}
            >
                <Tabs.Screen
                    name="venue"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Svg
                                width={size}
                                height={size}
                                viewBox="0 0 24 24"
                                fill={'none'}
                                stroke={color}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ marginBottom: 5 }}
                            >
                                <Path d="M16.6111 6.13892V22.3889M16.6111 6.13892L23.1111 2.88892V19.1389L16.6111 22.3889M16.6111 6.13892L10.1111 2.88892M16.6111 22.3889L10.1111 19.1389M10.1111 19.1389L3.61111 22.3889V6.13892L10.1111 2.88892M10.1111 19.1389V2.88892" />
                            </Svg>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Svg
                                width={size * 1.3}
                                height={size}
                                viewBox="0 0 24 24"
                                fill={color}
                                stroke={color}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={0.3}
                                style={{ marginBottom: 5 }}
                            >
                                <Path d="M6.167 28v.5h1V28h-1Zm19.666 0c0-5.43-4.402-9.833-9.833-9.833v1A8.833 8.833 0 0 1 24.833 28h1ZM16 18.167c-5.43 0-9.833 4.402-9.833 9.833h1A8.833 8.833 0 0 1 16 19.167v-1Zm0-4a4.833 4.833 0 0 1-4.833-4.834h-1A5.833 5.833 0 0 0 16 15.167v-1Zm-4.833-4.834A4.833 4.833 0 0 1 16 4.5v-1a5.833 5.833 0 0 0-5.833 5.833h1ZM16 4.5a4.833 4.833 0 0 1 4.833 4.833h1A5.833 5.833 0 0 0 16 3.5v1Zm4.833 4.833A4.833 4.833 0 0 1 16 14.167v1a5.833 5.833 0 0 0 5.833-5.834h-1Z" />
                            </Svg>
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaProvider>
    );
}