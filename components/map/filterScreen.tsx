import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Modal,
    ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { VenueFilterDTO } from '@/models/IVenue';

interface IFilterScreen {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: VenueFilterDTO) => void;
    numberOfFilter: (count: number) => void;
}

const FilterScreen = ({
    visible,
    onClose,
    onApply,
    numberOfFilter,
}: IFilterScreen) => {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [priceRating, setPriceRating] = useState<
        'HIGH' | 'LOW' | 'MEDIUM' | ''
    >('');
    const [minRating, setMinRating] = useState(0);
    const [maxRating, setMaxRating] = useState(5);
    const [types, setTypes] = useState<string[]>([]);
    const [weekDay, setWeekDay] = useState(-1); // New state for weekDay
    const [time, setTime] = useState<string | null>(null); // New state for time
    const [dropDownCustomTime, setdropDownCustomTime] = useState(false);
    const daysOfWeek = [
        { label: 'Any Day', value: -1 },
        { label: 'Monday', value: 0 },
        { label: 'Tuesday', value: 1 },
        { label: 'Wednesday', value: 2 },
        { label: 'Thursday', value: 3 },
        { label: 'Friday', value: 4 },
        { label: 'Saturday', value: 5 },
        { label: 'Sunday', value: 6 },
    ];
    const hoursOfDay = Array.from({ length: 24 }, (_, i) => {
        const hour = `${i.toString().padStart(2, '0')}:00`;
        return { label: hour, value: hour };
    });
    const toggleType = (type: string) => {
        setTypes((prevTypes) =>
            prevTypes.includes(type)
                ? prevTypes.filter((t) => t !== type)
                : [...prevTypes, type]
        );
    };

    useEffect(() => {
        const appliedFiltersCount = calculateFiltersCount();
        numberOfFilter(appliedFiltersCount);
    }, [
        name,
        city,
        country,
        priceRating,
        minRating,
        maxRating,
        types,
        weekDay,
        time,
    ]);
    const handleWeekDayChange = (itemValue: number, itemIndex: number) => {
        setWeekDay(itemValue);
    };
    const handleTimeChange = (itemValue: string | null) => {
        setTime(itemValue);
    };
    const calculateFiltersCount = () => {
        let count = 0;
        if (name) count++;
        if (city) count++;
        if (country) count++;
        if (priceRating) count++;
        if (minRating > 0) count++;
        if (maxRating < 5) count++;
        count += types.length; // Count each selected type individually
        if (weekDay !== -1) count++; // Include weekDay in filter count
        if (time) count++; // Include time in filter count
        return count;
    };

    const getCurrentTime = () => {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const handleHoursSelection = (selection: 'Any' | 'Open' | 'Custom') => {
        if (selection === 'Any') {
            setWeekDay(-1);
            setTime(null);
        } else if (selection === 'Open') {
            setTime(getCurrentTime());
        } else if (selection === 'Custom') {
            setdropDownCustomTime(!dropDownCustomTime);
        }
    };

    const applyFilters = () => {
        const selectedPriceRating = priceRating === '' ? null : priceRating;

        const filters: VenueFilterDTO = {
            name,
            city,
            country,
            priceRating: selectedPriceRating,
            minRating,
            maxRating,
            types,
            scheduleFilterDTO: {
                weekDay,
                time,
            },
        };

        onApply(filters);
        numberOfFilter(calculateFiltersCount());
        onClose();
    };

    const resetFilters = () => {
        setName('');
        setCity('');
        setCountry('');
        setPriceRating('');
        setMinRating(0);
        setMaxRating(5);
        setTypes([]);
        setWeekDay(-1);
        setTime(null);
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={false}>
            <ScrollView bounces={false}>
                <View style={styles.container}>
                    <View style={styles.tagsContainer}>
                        <Text style={styles.label}>General</Text>
                        {[
                            'Pub',
                            'Club',
                            'Tavern',
                            'Inn',
                            'Hotel',
                            'Irish',
                            'Dive',
                            'Brew',
                            'Gastro',
                            'Sports',
                            'Concept',
                            'Beach',
                            'Pool',
                            'College',
                            'Hookah',
                        ].map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    styles.tag,
                                    types.includes(type) && styles.selectedTag,
                                ]}
                                onPress={() => toggleType(type)}
                            >
                                <Text
                                    style={[
                                        styles.tagText,
                                        types.includes(type) &&
                                            styles.selectedTagText,
                                    ]}
                                >
                                    {type}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.tagsContainer}>
                        <Text style={styles.label}>Music</Text>
                        {[
                            'Rave',
                            'Techno',
                            'House',
                            'Rap',
                            'Live',
                            'Pop',
                            'Loud',
                            'None',
                            'Karaoke',
                            'DJ',
                        ].map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    styles.tag,
                                    types.includes(type) && styles.selectedTag,
                                ]}
                                onPress={() => toggleType(type)}
                            >
                                <Text
                                    style={[
                                        styles.tagText,
                                        types.includes(type) &&
                                            styles.selectedTagText,
                                    ]}
                                >
                                    {type}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.tagsContainer}>
                        <Text style={styles.label}>Miscellaneous</Text>
                        {['40+', 'Young', 'LGBTQ', 'Street', 'Student'].map(
                            (type) => (
                                <TouchableOpacity
                                    key={type}
                                    style={[
                                        styles.tag,
                                        types.includes(type) &&
                                            styles.selectedTag,
                                    ]}
                                    onPress={() => toggleType(type)}
                                >
                                    <Text
                                        style={[
                                            styles.tagText,
                                            types.includes(type) &&
                                                styles.selectedTagText,
                                        ]}
                                    >
                                        {type}
                                    </Text>
                                </TouchableOpacity>
                            )
                        )}
                    </View>
                    {/*
                    <View style={styles.section}>
                        <Text style={styles.label}>City</Text>
                        <TextInput
                            style={styles.input}
                            value={city}
                            onChangeText={setCity}
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Country</Text>
                        <TextInput
                            style={styles.input}
                            value={country}
                            onChangeText={setCountry}
                        />
                    </View>

*/}

                    <View style={styles.section}>
                        <Text style={styles.label}>Price</Text>
                        <View style={styles.priceContainer}>
                            {['', 'LOW', 'MEDIUM', 'HIGH'].map(
                                (price, index) => (
                                    <TouchableOpacity
                                        key={price}
                                        style={[
                                            styles.priceButton,
                                            priceRating === price &&
                                                styles.selectedPriceButton,
                                            index === 0 && styles.firstButton, // Apply left border radius for the first button
                                            index === 3 && styles.lastButton, // Apply right border radius for the last button
                                        ]}
                                        onPress={() =>
                                            setPriceRating(
                                                price as
                                                    | 'HIGH'
                                                    | 'LOW'
                                                    | 'MEDIUM'
                                                    | ''
                                            )
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.priceButtonText,
                                                priceRating === price &&
                                                    styles.selectedPriceButtonText,
                                            ]}
                                        >
                                            {price === ''
                                                ? 'Any'
                                                : price.charAt(0) +
                                                  price.slice(1).toLowerCase()}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            )}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Hours</Text>
                        <View style={styles.hoursContainer}>
                            {['Any', 'Open', 'Custom'].map((option, index) => (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.hoursButton,
                                        (option === 'Any' &&
                                            weekDay === -1 &&
                                            time === null) ||
                                        (option === 'Open' && time !== null) ||
                                        (option === 'Custom' &&
                                            time !== null &&
                                            weekDay !== -1)
                                            ? styles.selectedHoursButton
                                            : null,
                                        index === 0 && styles.firstButton, // Apply left border radius for the first button
                                        index === 2 && styles.lastButton, // Apply right border radius for the last button
                                    ]}
                                    onPress={() =>
                                        handleHoursSelection(
                                            option as 'Any' | 'Open' | 'Custom'
                                        )
                                    }
                                >
                                    <Text
                                        style={[
                                            styles.hoursButtonText,
                                            (option === 'Any' &&
                                                weekDay === -1 &&
                                                time === null) ||
                                            (option === 'Open' &&
                                                time !== null) ||
                                            (option === 'Custom' &&
                                                time !== null &&
                                                weekDay !== -1)
                                                ? styles.selectedHoursButtonText
                                                : null,
                                        ]}
                                    >
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {dropDownCustomTime ? (
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Picker
                                        selectedValue={weekDay}
                                        onValueChange={handleWeekDayChange}
                                    >
                                        {daysOfWeek.map((day, index) => (
                                            <Picker.Item
                                                key={index}
                                                label={day.label}
                                                value={day.value}
                                            />
                                        ))}
                                    </Picker>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Picker
                                        selectedValue={time}
                                        onValueChange={handleTimeChange}
                                    >
                                        <Picker.Item
                                            label="Any Time"
                                            value={null}
                                        />
                                        {hoursOfDay.map((hour, index) => (
                                            <Picker.Item
                                                key={index}
                                                label={hour.label}
                                                value={hour.value}
                                            />
                                        ))}
                                    </Picker>
                                </View>
                            </View>
                        ) : null}
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.applyButton}
                            onPress={applyFilters}
                        >
                            <Text style={styles.buttonText}>Apply</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.resetButton}
                            onPress={resetFilters}
                        >
                            <Text style={styles.buttonText}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    firstButton: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    lastButton: {
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    container: {
        flex: 1,
        padding: 20,
        paddingTop: '10%',
        backgroundColor: '#333',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: 20,
    },
    tag: {
        backgroundColor: '#333',
        borderRadius: 20,
        borderColor: '#6B3163',
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 3,
        marginVertical: 4,
    },
    selectedTag: {
        backgroundColor: '#AF587B',
    },
    tagText: {
        color: '#fff',
    },
    selectedTagText: {
        color: '#fff',
    },
    section: {
        marginBottom: 20,
    },
    label: {
        color: '#fff',
        width: '100%',
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#fff',
        color: '#000',
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#fff',
        color: '#000',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    priceButton: {
        paddingVertical: 7,
        paddingHorizontal: '6%',
        backgroundColor: '#F6F6F6',
        borderColor: '#3C1C4B',
        borderWidth: 2,
    },
    selectedPriceButton: {
        backgroundColor: '#AF587B',
        borderColor: '#6B3163',
        borderWidth: 1,
    },
    priceButtonText: {
        color: '#363636',
    },
    selectedPriceButtonText: {
        color: '#fff',
    },
    hoursContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    hoursButton: {
        paddingVertical: 7,
        paddingHorizontal: '10%',

        backgroundColor: '#F6F6F6',
        borderColor: '#3C1C4B',
        borderWidth: 2,
    },
    selectedHoursButton: {
        backgroundColor: '#AF587B',
        borderColor: '#6B3163',
        borderWidth: 1,
    },
    hoursButtonText: {
        color: '#363636',
    },
    selectedHoursButtonText: {
        color: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    applyButton: {
        paddingVertical: 10,
        marginHorizontal: 8,
        paddingHorizontal: 40,
        backgroundColor: '#AF587B',
        borderColor: '#6B3163',
        borderWidth: 1,
        borderRadius: 70,
    },
    resetButton: {
        paddingVertical: 10,
        marginHorizontal: 8,
        paddingHorizontal: 40,
        backgroundColor: '#AF587B',
        borderColor: '#6B3163',
        borderWidth: 1,
        borderRadius: 70,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
});

export default FilterScreen;