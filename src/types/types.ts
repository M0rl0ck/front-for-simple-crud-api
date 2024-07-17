interface NewUser {
  username: string;
  age: number;
  hobbies: string[];
}
interface IUser extends NewUser {
  id: string;
}

export type { IUser, NewUser };
