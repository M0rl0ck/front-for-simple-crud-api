import { IUser } from "../../types/types";
import Styles from "./user.module.css";
import { connector } from "../../api/API";
import UpdateUserModal from "../UpdateUser/UpdateUser";
import { useState } from "react";

interface IProps {
  user: IUser;
}

function User({ user }: IProps) {
  const [updateUserShowModal, setUpdateUserShowModal] =
    useState<boolean>(false);

  return (
    <div className={Styles.userCard}>
      <div className={Styles.userDescription}>
        <h3>Name: {user.username}</h3>
        <p>Id: {user.id}.</p>
        <p>Age: {user.age}.</p>
        <p>Hobbies: {user.hobbies.join(", ")}.</p>
      </div>
      <div className={Styles.userButtons}>
        <button onClick={() => connector.deleteUser(user.id)}>Delete</button>
        <button onClick={() => setUpdateUserShowModal(true)}>Edit</button>
      </div>
      {updateUserShowModal && (
        <UpdateUserModal
          setUpdateUserShowModal={setUpdateUserShowModal}
          userData={user}
        />
      )}
    </div>
  );
}

export default User;
