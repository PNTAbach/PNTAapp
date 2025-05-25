export interface LocationDTO {
    latitude: number;
    longitude: number;
    city: string;
    postalCode: string;
    country: string;
    address: string;
}

export interface MenuDTO {
    menuId: number;
    description: string;
    type: string;
    name: string;
}

export interface VenueDTO {
    venueId: number;
    name: string;
    icon: string;
    schedules: ScheduleDTO[];
    description: string;
    priceRating: number;
    rating: number;
    managerId: number;
    locations: LocationDTO[];
    types: string[];
    menus: MenuDTO[];
}

export interface ScheduleDTO {
    weekDay: number;
    happyHour: string;
    openingTime: string;
    closingTime: string;
}

export interface ScheduleFilterDTO {
    weekDay: number;
    time: string | null;
}

export interface VenueFilterDTO {
    name: string;
    city: string;
    country: string;
    scheduleFilterDTO: ScheduleFilterDTO;
    minRating: number;
    maxRating: number;
    types: string[];
    priceRating: 'HIGH' | 'LOW' | 'MEDIUM' | '' | null;
}

export const initialFilters: VenueFilterDTO = {
    name: '',
    city: '',
    country: '',
    scheduleFilterDTO: {
        weekDay: -1,
        time: null,
    },
    minRating: 0,
    maxRating: 5,
    types: [],
    priceRating: null,
};