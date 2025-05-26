import React from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

interface ISearchBar {
    onChange: (text: string) => void;
}

const SearchBar = ({ onChange }: ISearchBar) => {
    const [searchText, setSearchText] = React.useState('');

    const handleTextChange = (text: string) => {
        setSearchText(text);
        onChange(text);
    };

    const clearSearch = () => {
        setSearchText('');
        onChange('');
    };

    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: 'https://img.icons8.com/ios-glyphs/30/000000/search--v1.png',
                }}
                style={styles.icon}
            />
            <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor="#888"
                value={searchText}
                onChangeText={handleTextChange}
            />
            {searchText.length > 0 && (
                <TouchableOpacity onPress={clearSearch}>
                    <Image
                        source={{
                            uri: 'https://img.icons8.com/ios-glyphs/30/000000/macos-close.png',
                        }}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 6,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d3a65a',
        borderRadius: 25,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#363636',
    },
    icon: {
        width: 20,
        height: 20,
    },
});

export default SearchBar;