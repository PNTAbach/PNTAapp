import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScheduleDTO, VenueDTO } from '@/models/IVenue';
import Svg, { Path } from 'react-native-svg';
import { getDayInInt } from '@/helpers/dateHelper';
import moment from 'moment';
interface IList {
    venues?: VenueDTO[];
    onPress: () => void;
}

const List = ({ venues, onPress }: IList) => {
    const [myMap, setMyMap] = useState<Map<number, ScheduleDTO>>(new Map());
    useEffect(() => {
        const newMap = new Map<number, ScheduleDTO>();
        venues?.forEach((venue) => {
            venue.schedules.forEach((schedule: ScheduleDTO) => {
                if (schedule.weekDay === getDayInInt(moment().format('dddd'))) {
                    newMap.set(venue.venueId, schedule);
                }
            });
        });
        setMyMap(newMap);
    }, [venues]);

    return (
        <View style={styles.listPage}>
            <ScrollView style={styles.scrollView}>
                {venues?.map((venue, index) => (
                    <TouchableOpacity key={venue.venueId} onPress={onPress}>
                        <View
                            style={[
                                styles.itemContainer,
                                index % 2 === 0
                                    ? styles.itemContainerEven
                                    : styles.itemContainerOdd,
                                index === 0 ? styles.firstItem : {},
                                index === venues.length - 1
                                    ? styles.lastItem
                                    : {},
                            ]}
                        >
                            <Image
                                source={{
                                    uri: venue.icon,
                                }}
                                style={styles.icon}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>{venue.name}</Text>
                                <Text style={styles.address}>
                                    {venue.locations?.[0]?.city ?? "Unknown"},
                                    {' ' + venue.locations?.[0]?.country }
                                </Text>
                                {myMap.get(venue.venueId) ? (
                                    <Text style={styles.hours}>
                                        {myMap.get(venue.venueId)?.openingTime}{' '}
                                        -{' '}
                                        {myMap.get(venue.venueId)?.closingTime}
                                    </Text>
                                ) : (
                                    <Text style={styles.hours}>
                                        No specific hours
                                    </Text>
                                )}
                            </View>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.rating}>
                                    {venue.rating}
                                </Text>
                                <Svg width={23} height={23} fill="none">
                                    <Path
                                        stroke="#F8E193"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.238 9.975c-.3-.265-.137-.745.269-.791L8.26 8.53a.478.478 0 0 0 .379-.263l2.427-5.032a.489.489 0 0 1 .87 0l2.427 5.032c.07.145.212.244.378.263l5.754.653c.406.046.568.526.268.792l-4.253 3.762a.446.446 0 0 0-.144.426l1.128 5.436c.08.383-.347.68-.703.49l-5.056-2.708a.497.497 0 0 0-.468 0L6.211 20.09c-.356.19-.784-.106-.704-.49l1.129-5.435a.446.446 0 0 0-.145-.426L2.238 9.975Z"
                                    />
                                </Svg>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default List;
const styles = StyleSheet.create({
    listPage: {
        backgroundColor: '#363636',
        height: '100%',
    },
    scrollView: {
        backgroundColor: '#363636',
        marginTop: '33%',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 23,
    },
    itemContainerEven: {
        backgroundColor: '#3f3f3f',
    },
    itemContainerOdd: {
        backgroundColor: '#4a4a4a',
    },
    firstItem: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    lastItem: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
    address: {
        fontSize: 12,
        color: '#aaa',
    },
    hours: {
        fontSize: 12,
        color: '#aaa',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 17,
        fontWeight: '300',
        color: '#F8E193',
        marginRight: 5,
    },
});