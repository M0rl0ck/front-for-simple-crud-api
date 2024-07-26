import { useState } from "react";
import Styles from "./App.module.css";
import { IUser } from "./types/types";
import { connector } from "./api/API";
import { STATUS_CODES } from "./constants/statusCodes";
import Users from "./components/Users/Users";

const App = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const getUsers = async () => {
    console.log("getUsers");
    const { status, users } = await connector.getUsers();
    setStatus(status.toString());
    if (status === STATUS_CODES.OK) {
      setErrorMessage("");
      setUsers(users);
    } else {
      setUsers([]);
      setErrorMessage(users);
    }
  };
  return (
    <main className={Styles.main}>
      <h1>App</h1>
      <button onClick={getUsers}>Get users</button>
      <div>Status: {status}</div>
      <Users users={users} errorMessage={errorMessage} />
    </main>
  );
};

export default App;
