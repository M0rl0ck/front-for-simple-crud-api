import { createContext, useState } from "react";
import { connector } from "../api/API";
import { STATUS_CODES } from "../constants/statusCodes";
import { IUser } from "../types/types";

export const UsersContext = createContext<IUser[]>([]);
export const ErrorMessageContext = createContext<string>("");
export const GetUsersContext = createContext<() => void>(() => {});
export const StatusContext = createContext<string>("");

const UsersContextProvider = ({ children }: { children: JSX.Element }) => {
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
    <UsersContext.Provider value={users}>
      <ErrorMessageContext.Provider value={errorMessage}>
        <GetUsersContext.Provider value={getUsers}>
          <StatusContext.Provider value={status}>
            {children}
          </StatusContext.Provider>
        </GetUsersContext.Provider>
      </ErrorMessageContext.Provider>
    </UsersContext.Provider>
  );
};

export { UsersContextProvider };
