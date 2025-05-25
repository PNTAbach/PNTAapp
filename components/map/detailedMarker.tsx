import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScheduleDTO, VenueDTO } from '@/models/IVenue';
import moment from 'moment';
import { getDayInInt } from '@/helpers/dateHelper';

interface IDetailedMarker {
    venue: VenueDTO;
}

const DetailedMarker = ({ venue }: IDetailedMarker) => {
    const [todaySchedule, setTodaySchedule] = useState<ScheduleDTO>();

    useEffect(() => {
        venue.schedules.forEach((schedule: ScheduleDTO) => {
            if (schedule.weekDay === getDayInInt(moment().format('dddd'))) {
                setTodaySchedule(schedule);
            }
        });
    }, [venue]);

    return (
        <View style={[styles.card]}>
            <Image source={{ uri: venue.icon }} style={styles.image} />
            <View style={styles.rightContainer}>
                <Text style={styles.title}>{venue.name}</Text>
                <Text style={styles.description}>
                    {venue.locations[0].address}
                </Text>

                <View style={styles.footer}>
                    {todaySchedule ? (
                        <Text>
                            {todaySchedule?.openingTime} -{' '}
                            {todaySchedule?.closingTime}
                        </Text>
                    ) : (
                        <Text>No specific hours</Text>
                    )}

                    <Text>
                        ★ {venue.rating} ({12})
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        left: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    image: {
        width: 150,
        aspectRatio: 1,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    rightContainer: {
        padding: 10,
        flex: 1,
    },
    title: {
        marginBottom: 10,
        fontSize: 16,
    },
    description: {
        color: 'gray',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 'auto',
    },
});

export default DetailedMarker;