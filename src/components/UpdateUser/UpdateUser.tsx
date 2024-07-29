import Modal from "../Modal/Modal";
import UserForm from "../UserForm/UserForm";
import { connector } from "../../api/API";
import { IUser, NewUser } from "../../types/types";

interface IProps {
  setUpdateUserShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  userData: IUser;
}

const UpdateUserModal = ({ setUpdateUserShowModal, userData }: IProps) => {
  const sendData = async (data: NewUser) => {
    const res = await connector.updateUser(userData.id, data);
    return res;
  };

  return (
    <Modal
      header="Edit user"
      setShowModal={setUpdateUserShowModal}
      renderChildren={(closeModal) => (
        <UserForm
          closeModal={closeModal}
          sandData={sendData}
          userData={userData}
        />
      )}
    />
  );
};

export default UpdateUserModal;
