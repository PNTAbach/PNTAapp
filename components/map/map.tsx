import React, { useEffect, useRef, useState } from 'react';
import MapView from 'react-native-map-clustering';
import { StyleSheet, View, Text, Image } from 'react-native';
import * as Location from 'expo-location';
import mapStyle from '@/conf/mapStyle';
import VenueService from '@/services/venue.service';
import { VenueDTO, VenueFilterDTO } from '@/models/IVenue';
import MapControls from './mapControls';
import FilterScreen from './filterScreen';
import List from './list';
import { initialFilters } from '@/models/IVenue';
import { Marker } from 'react-native-maps';
import DetailedMarker from './detailedMarker';

export interface Coordinates {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export default function Map() {
    const mapRef = useRef<any>(null);
    const [selectedVenue, setSelectedVenue] = useState<VenueDTO | null>(null);
    const [venues, setVenues] = useState<VenueDTO[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [searchBar, setSearchBar] = useState<string>('');
    const [numberOfUsedFilters, setNumberOfUsedFilters] = useState<number>(0);
    const [filterVisible, setFilterVisible] = useState(false);
    const [mapVisible, setMapVisible] = useState(true);
    const venueService = new VenueService();

    useEffect(() => {
        if (!loading) {
            getUserCurrentPosition();
            getAllVenues(initialFilters);
        }
    }, [searchBar, loading]);

    useEffect(() => {
        if (selectedVenue) {
            const region: Coordinates = {
                latitude: selectedVenue.locations[0].latitude,
                longitude: selectedVenue.locations[0].longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            };
            if (mapRef.current) mapRef!.current.animateToRegion(region);
        }
    }, [selectedVenue]);

    const getAllVenues = async (filters: VenueFilterDTO) => {
        try {
            const data = await venueService.getAllFilteredVenues(filters);
            const filteredData = data.filter((venue) =>
                venue.name.toLowerCase().includes(searchBar.toLowerCase())
            );
            setVenues(filteredData);
        } catch (e) {
            console.error(e);
        }
    };

    const getUserCurrentPosition = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 10000,
        });
        const region: Coordinates = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
        };
        if (mapRef.current) mapRef!.current.animateToRegion(region);
    };

    const handleApplyFilters = (filters: VenueFilterDTO) => {
        getAllVenues(filters);
        setFilterVisible(false);
    };

    const initialRegion = {
        latitude: 55.67535,
        longitude: 12.572135,
        latitudeDelta: 150,
        longitudeDelta: 150,
    };

    return (
        <>
            <View style={styles.controlsContainer}>
                <MapControls
                    searchBar={setSearchBar}
                    onFilterPress={() => setFilterVisible(true)}
                    onToggleMapList={() => {
                        setMapVisible(!mapVisible);
                        if (!mapVisible) getUserCurrentPosition();
                    }}
                    numberOfFilter={numberOfUsedFilters}
                />
            </View>
            {mapVisible ? (
                <>
                    <MapView
                        initialRegion={initialRegion}
                        style={{ width: '100%', height: '100%' }}
                        clusterColor={'#7F00FF'}
                        rotateEnabled={false}
                        showsUserLocation={true}
                        // showsPointsOfInterest={false}
                        customMapStyle={mapStyle}
                        loadingEnabled={true}
                        toolbarEnabled={false}
                        showsMyLocationButton={false}
                        userInterfaceStyle={'dark'}
                        ref={mapRef}
                        onMapReady={() => setLoading(false)}
                        edgePadding={{
                            bottom: 100,
                            left: 100,
                            right: 100,
                            top: 100,
                        }}
                        onPress={() => {
                            if (selectedVenue) setSelectedVenue(null);
                        }}
                    >
                        {venues &&
                            venues.length > 0 &&
                            venues!.map((venue) => {
                                return (
                                    <Marker
                                        key={venue.venueId}
                                        onPress={() => setSelectedVenue(venue)}
                                        coordinate={{
                                            latitude:
                                                venue!.locations[0].latitude,
                                            longitude:
                                                venue!.locations[0].longitude,
                                        }}
                                    >
                                        <View style={styles.markerContainer}>
                                            <View style={styles.iconContainer}>
                                                <Image
                                                    source={{
                                                        uri: venue.icon,
                                                    }}
                                                    style={styles.markerImage}
                                                />
                                                <View style={styles.triangle} />
                                            </View>

                                            <Text style={styles.markerText}>
                                                {venue.name}
                                            </Text>
                                        </View>
                                    </Marker>
                                );
                            })}
                    </MapView>
                    {selectedVenue && <DetailedMarker venue={selectedVenue} />}
                </>
            ) : (
                <List
                    venues={venues}
                    onPress={() => console.log('Venue pressed')}
                />
            )}
            <FilterScreen
                visible={filterVisible}
                onClose={() => setFilterVisible(false)}
                onApply={handleApplyFilters}
                numberOfFilter={setNumberOfUsedFilters}
            />
        </>
    );
}

const styles = StyleSheet.create({
    controlsContainer: {
        position: 'absolute',
        zIndex: 10,
        top: 20,
        width: '100%',
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    triangle: {
        position: 'relative',
        top: '-9%',
        left: '0%',
        zIndex: -10,
        width: 0,
        height: 0,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderTopWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'white',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerImage: {
        height: 35,
        width: 35,
        borderRadius: 35,
        borderWidth: 1,
        borderColor: 'white',
    },
    markerText: {
        color: 'white',
        marginTop: 5,
    },
});