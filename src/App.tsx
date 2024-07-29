import { useContext, useState } from "react";
import Styles from "./App.module.css";
import Users from "./components/Users/Users";
import NewUserModal from "./components/NewUser/NewUser";
import {
  UsersContext,
  ErrorMessageContext,
  GetUsersContext,
  StatusContext,
} from "./context/getUsersContext";

const App = () => {
  const [newUserShowModal, setNewUserShowModal] = useState<boolean>(false);
  const users = useContext(UsersContext);
  const errorMessage = useContext(ErrorMessageContext);
  const getUsers = useContext(GetUsersContext);
  const status = useContext(StatusContext);

  return (
    <main className={Styles.main}>
      <h1>App</h1>
      <div className={Styles.mainButtons}>
        <button onClick={getUsers}>Get users</button>
        <button onClick={() => setNewUserShowModal(true)}>New user</button>
      </div>

      <div>Status: {status}</div>
      <Users users={users} errorMessage={errorMessage} />
      {newUserShowModal && (
        <NewUserModal setNewUserShowModal={setNewUserShowModal} />
      )}
    </main>
  );
};

export default App;
