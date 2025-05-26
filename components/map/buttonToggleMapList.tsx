import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface IButtonToggleMapList {
    onPress: () => void;
}

const ButtonToggleMapList = ({ onPress }: IButtonToggleMapList) => {
    const [mapVisible, setMapVisible] = useState<boolean>(true);

    const toggleMapVisibility = () => {
        setMapVisible(!mapVisible);
        onPress();
    };
    return mapVisible ? (
        <TouchableOpacity style={styles.button} onPress={toggleMapVisibility}>
            <View style={styles.iconContainer}>
                <Svg
                    width={14}
                    height={15}
                    viewBox="0 0 11 9"
                    fill={'none'}
                    stroke={'#F8E193'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginBottom: 4.5 }}
                >
                    <Path d="M0.541668 8.04171H10.4583M0.541668 4.50004H10.4583M0.541668 0.958374H10.4583" />
                </Svg>
            </View>
            <Text style={styles.text}>List</Text>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity style={styles.button} onPress={toggleMapVisibility}>
            <View style={styles.iconContainer}>
                <Svg
                    width={14}
                    height={15}
                    viewBox="0 0 24 24"
                    fill={'none'}
                    stroke={'#F8E193'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginBottom: 4 }}
                >
                    <Path d="M16.6111 6.13892V22.3889M16.6111 6.13892L23.1111 2.88892V19.1389L16.6111 22.3889M16.6111 6.13892L10.1111 2.88892M16.6111 22.3889L10.1111 19.1389M10.1111 19.1389L3.61111 22.3889V6.13892L10.1111 2.88892M10.1111 19.1389V2.88892" />
                </Svg>
            </View>
            <Text style={styles.text}>Map</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333333',
        width: 70,
        paddingHorizontal: 12,
        paddingTop: 5,
        paddingBottom: 2,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    iconContainer: {
        marginRight: 7,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 13,
        paddingBottom: 5,
    },
});

export default ButtonToggleMapList;