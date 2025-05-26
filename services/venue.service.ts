import { AxiosInstance } from 'axios';
import createAxiosClient from '../conf/axiosInstance';
import { VenueDTO, VenueFilterDTO } from '@/models/IVenue';
import * as SecureStore from 'expo-secure-store';

const resourceGetAllVenues: string = 'venue';
const resourceGetAllFilteredVenues: string = 'venue/filter';
const resourceGetVenueInfo: string = 'venue/';


class VenueService {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = createAxiosClient();
    }

    async getAllVenues(): Promise<VenueDTO[]> {
        const response = await this.axiosClient.get(resourceGetAllVenues);
        return response.data;
    }
    async getAllFilteredVenues(data:VenueFilterDTO): Promise<VenueDTO[]> {
        const response = await this.axiosClient.post(
            resourceGetAllFilteredVenues,
            data
        );
        return response.data;
    }
    async getVenueInfo(): Promise<VenueDTO> {
        const response = await this.axiosClient.get(resourceGetVenueInfo);
        return response.data;
    }
}

export default VenueService;