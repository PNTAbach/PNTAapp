import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface IFilter {
    onPress: () => void;
    filterCount: number;
}

const Filter = ({ onPress, filterCount }: IFilter) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.iconContainer}>
                <Svg
                    width={16}
                    height={15}
                    viewBox="0 0 14 15"
                    fill={'none'}
                    stroke={'#F8E193'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginBottom: 4.5 }}
                >
                    <Path d="M13.7619 3.56199C13.7619 3.16529 13.7616 2.96679 13.6844 2.81527C13.6165 2.68199 13.5086 2.5737 13.3753 2.50579C13.2238 2.42859 13.025 2.42859 12.6283 2.42859H3.56163C3.16493 2.42859 2.96677 2.42859 2.81525 2.50579C2.68197 2.5737 2.57369 2.68199 2.50578 2.81527C2.42857 2.96679 2.42857 3.16529 2.42857 3.56199V4.08422C2.42857 4.25747 2.42857 4.34416 2.44814 4.42568C2.4655 4.49795 2.49419 4.56699 2.53303 4.63037C2.57682 4.70183 2.63817 4.76319 2.7606 4.88562L6.34671 8.47173C6.46921 8.59423 6.53013 8.65515 6.57394 8.72663C6.61277 8.79001 6.64185 8.85928 6.65921 8.93156C6.67858 9.01225 6.67858 9.09791 6.67857 9.26766V12.6364C6.67857 13.2436 6.67857 13.5474 6.80646 13.7302C6.91813 13.8899 7.0904 13.9964 7.28315 14.0248C7.50388 14.0575 7.77558 13.9218 8.31867 13.6503L8.88534 13.3669C9.11275 13.2532 9.22619 13.1962 9.30926 13.1113C9.38273 13.0363 9.43893 12.9463 9.47317 12.847C9.51188 12.7348 9.51191 12.6073 9.51191 12.353V9.27293C9.51191 9.09968 9.51191 9.01308 9.53148 8.93156C9.54883 8.85928 9.57752 8.79001 9.61636 8.72663C9.65987 8.65562 9.72063 8.59487 9.8415 8.47399L9.84394 8.47173L13.43 4.88562C13.5526 4.76311 13.6135 4.70185 13.6573 4.63037C13.6961 4.56699 13.7252 4.49796 13.7425 4.42568C13.7619 4.34499 13.7619 4.25923 13.7619 4.08949V3.56199Z" />
                </Svg>
            </View>
            <Text style={styles.text}>
                Filters {filterCount > 0 && `(${filterCount})`}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333333',

        paddingLeft: 9,
        paddingTop: 5,
        paddingBottom: 2,
        paddingRight: 11,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    iconContainer: {
        marginRight: 7,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 13,
        paddingBottom: 3,
    },
});

export default Filter;