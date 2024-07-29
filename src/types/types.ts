interface NewUser {
  username: string;
  age: number;
  hobbies: string[];
}
interface IUser extends NewUser {
  id: string;
}

interface IErrorMessage {
  message: string;
}

export type { IUser, NewUser, IErrorMessage };
