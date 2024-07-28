import Modal from "../Modal/Modal";
import UserForm from "../UserForm/UserForm";
import { connector } from "../../api/API";
import { NewUser } from "../../types/types";

interface IProps {
  setNewUserShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const newUserModal = ({ setNewUserShowModal }: IProps) => {
  const sendData = async (data: NewUser) => {
    const res = await connector.createUser(data);
    return res;
  };

  return (
    <Modal
      header="New user"
      setShowModal={setNewUserShowModal}
      renderChildren={(closeModal) => (
        <UserForm closeModal={closeModal} sandData={sendData} />
      )}
    />
  );
};

export default newUserModal;
