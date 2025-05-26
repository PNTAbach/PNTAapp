// MapControls.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonToggleMapList from './buttonToggleMapList';
import SearchBar from './searchBar';
import Filter from './filter';

interface IMapControls {
    onFilterPress: () => void;
    onToggleMapList: () => void;
    numberOfFilter: number;
    searchBar: (count: string) => void;
}

const MapControls = ({
    onFilterPress,
    onToggleMapList,
    numberOfFilter,
    searchBar,
}: IMapControls) => {
    return (
        <>
            <SearchBar
                onChange={(text: string) => {
                    searchBar(text);
                }}
            />
            <View style={styles.container}>
                <Filter onPress={onFilterPress} filterCount={numberOfFilter} />
                <ButtonToggleMapList onPress={onToggleMapList} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 3,
        alignItems: 'center',
    },
});

export default MapControls;