import Styles from "./userForm.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { IUser, NewUser } from "../../types/types";

interface IFormInput {
  username: string;
  age: number;
  hobbies: string;
}

interface IProps {
  closeModal: () => void;
  sandData: (
    data: NewUser
  ) => Promise<{ status: number; user: IUser | { message: string } }>;
  userData?: IUser;
}

const UserForm = ({ closeModal, sandData, userData }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const createNewUser: SubmitHandler<IFormInput> = async (data) => {
    const { username, age, hobbies } = data;
    await sandData({
      username,
      age,
      hobbies: hobbies.split(",").map((el) => el.trim()),
    });
    closeModal();
  };

  return (
    <form
      className={Styles.userForm}
      action=""
      onSubmit={handleSubmit(createNewUser)}
    >
      <div>
        <label>Name:</label>{" "}
        <input
          defaultValue={userData?.username || ""}
          {...register("username", {
            required: '"Name" is required',
            validate: (value) =>
              value
                .split(" ")
                .filter(Boolean)
                .every((el) => el[0] !== el[0].toLowerCase()) ||
              "First name or last name must start with a capital letter",
          })}
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>
      <div>
        <label>Age:</label>{" "}
        <input
          type="number"
          defaultValue={userData?.age || ""}
          {...register("age", {
            required: '"Age" is required',
            valueAsNumber: true,
            validate: (value) => value < 100 || "I'm too old for all this shit",
          })}
        />
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <div>
        <label>Hobbies:</label>{" "}
        <input
          defaultValue={userData?.hobbies.join(", ") || ""}
          {...register("hobbies")}
        />
      </div>{" "}
      <button>Create</button>
    </form>
  );
};

export default UserForm;
