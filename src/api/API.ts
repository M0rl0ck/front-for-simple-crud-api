import { STATUS_CODES } from "../constants/statusCodes";
import { IErrorMessage, IUser, NewUser } from "../types/types";

class Connector {
  baseURL: string;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request(
    id: string = "",
    method: string = "GET",
    body: unknown = undefined
  ) {
    console.log(this.baseURL);
    const requestInit = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    };
    const response = await fetch(`${this.baseURL}/${id}`, requestInit);
    const status = response.status;
    const message = await response.json();

    return { status, message };
  }

  async getUsers(): Promise<
    | {
        status: STATUS_CODES.OK;
        users: IUser[];
      }
    | { status: string; users: string }
  > {
    const { status, message: users } = await this.request();

    return { status, users };
  }

  async getUser(
    id: string
  ): Promise<{ status: number; user: IUser | IErrorMessage }> {
    const { status, message: user } = await this.request(id);

    return { status, user };
  }

  async createUser(
    body: NewUser
  ): Promise<{ status: number; user: IUser | IErrorMessage }> {
    const { status, message: user } = await this.request("", "POST", body);

    return { status, user };
  }

  async updateUser(
    id: string,
    body: NewUser
  ): Promise<{ status: number; user: IUser | IErrorMessage }> {
    const { status, message: user } = await this.request(id, "PUT", body);

    return { status, user };
  }

  async deleteUser(
    id: string
  ): Promise<{ status: number; message: undefined | IErrorMessage }> {
    const { status, message } = await this.request(id, "DELETE");

    return { status, message };
  }
}

const connector = new Connector("http://localhost:4000/api/users");

export { connector };
