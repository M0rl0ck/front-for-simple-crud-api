import { IUser } from "../../types/types";
import User from "../User/User";
import Styles from "./users.module.css";

interface IProps {
  users: IUser[];
  errorMessage: string;
}
const Users = ({ users, errorMessage }: IProps) => {
  return (
    <section className={Styles.users}>
      <h2>Users</h2>
      <div className={Styles.usersField}>
        {users.length
          ? users.map((user) => <User key={user.id} user={user} />)
          : "No users"}
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    </section>
  );
};

export default Users;
