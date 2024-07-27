import { createPortal } from "react-dom";
import Styles from "./newUser.module.css";
import { useState } from "react";

interface IProps {
  setNewUserShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewUser = ({ setNewUserShowModal }: IProps) => {
  const [closedModal, setClosedModal] = useState<boolean>(false);

  const closeModal = () => {
    document.body.addEventListener(
      "animationend",
      () => setNewUserShowModal(false),
      { once: true }
    );
    setClosedModal(true);
  };

  const crateNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal();
  };

  return createPortal(
    <div
      className={
        closedModal
          ? Styles.newUserModalWrapper + " " + Styles.closeModalWrapper
          : Styles.newUserModalWrapper
      }
      onClick={closeModal}
    >
      <div
        className={
          closedModal
            ? Styles.newUserModal + " " + Styles.closeModal
            : Styles.newUserModal
        }
        onClick={(e) => e.stopPropagation()}
      >
        <button className={Styles.buttonClose} onClick={closeModal}>
          ✖
        </button>
        <h1>New user</h1>
        <form action="" onSubmit={crateNewUser}>
          <div>
            <label>Name</label>
            <input type="text" />
          </div>
          <div>
            <label>Age</label>
            <input type="text" />
          </div>
          <div>
            <label>Hobbies</label>
            <input type="text" />
          </div>{" "}
          <button>Create</button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default NewUser;
