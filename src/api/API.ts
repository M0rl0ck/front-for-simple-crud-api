import { IUser, NewUser } from "../types/types";

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

  async getUsers(): Promise<{
    status: number;
    users: IUser[] | { message: string };
  }> {
    const { status, message: users } = await this.request();

    return { status, users };
  }

  async getUser(
    id: string
  ): Promise<{ status: number; user: IUser | { message: string } }> {
    const { status, message: user } = await this.request(id);

    return { status, user };
  }

  async createUser(
    body: NewUser
  ): Promise<{ status: number; user: IUser | { message: string } }> {
    const { status, message: user } = await this.request("", "POST", body);

    return { status, user };
  }

  async updateUser(
    id: string,
    body: NewUser
  ): Promise<{ status: number; user: IUser | { message: string } }> {
    const { status, message: user } = await this.request(id, "PUT", body);

    return { status, user };
  }

  async deleteUser(
    id: string
  ): Promise<{ status: number; message: undefined | { message: string } }> {
    const { status, message } = await this.request(id, "DELETE");

    return { status, message };
  }
}

const connector = new Connector("/api/users");

export { connector };
