import { IUser } from "../../types/types";
import Styles from "./user.module.css";

interface IProps {
  user: IUser;
}

function User({ user }: IProps) {
  return (
    <div className={Styles.userCard}>
      <div className={Styles.userDescription}>
        <h3>Name: {user.username}</h3>
        <p>Id: {user.id}.</p>
        <p>Age: {user.age}.</p>
        <p>Hobbies: {user.hobbies.join(", ")}.</p>
      </div>
      <button>Delete</button>
    </div>
  );
}

export default User;
