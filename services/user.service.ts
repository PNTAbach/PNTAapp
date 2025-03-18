import { AxiosInstance } from "axios";

import {
  UserSignUpDTO,
  UserAuthResponse,
  UserDTO,
  UserLoginDTO,
  UserUpdateDTO,
} from "./../models/IUser";
import createAxiosClient from "../conf/axiosInstance";

const resourceUser: string = "user/users";
const resourceAuthenticate: string = "auth/authenticate";
const resourceRegister: string = "auth/register";

class UserService {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = createAxiosClient();
  }

  async login(data: UserLoginDTO): Promise<UserAuthResponse> {
    const response = await this.axiosClient.post(resourceAuthenticate, data);
    return response.data;
  }

  async register(data: UserSignUpDTO): Promise<UserAuthResponse> {
    const response = await this.axiosClient.post(resourceRegister, data);
    return response.data;
  }

  async getUser(id: number | null): Promise<string | UserDTO[] | UserDTO> {
    const response = await this.axiosClient.get(`/${resourceUser}/${id}`);
    return response.data;
  }

  async updateUser(data: UserUpdateDTO): Promise<string | UserDTO> {
    const response = await this.axiosClient.put(`/${resourceUser}`, data);
    return response.data;
  }
}

export default UserService;
