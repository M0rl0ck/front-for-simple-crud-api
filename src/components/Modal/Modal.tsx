import { createPortal } from "react-dom";
import Styles from "./modal.module.css";
import { useState } from "react";

interface IProps {
  renderChildren: (closeModal: () => void) => React.ReactNode;
  header: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ renderChildren, header, setShowModal }: IProps) => {
  const [closedModal, setClosedModal] = useState<boolean>(false);

  const closeModal = () => {
    document.body.addEventListener("animationend", () => setShowModal(false), {
      once: true,
    });
    setClosedModal(true);
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
        <h2>{header}</h2>
        {renderChildren(closeModal)}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
