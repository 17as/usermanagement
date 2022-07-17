import { Dispatch, SetStateAction, useState } from "react";
import { UserProps } from "../pages";
import styles from "../styles/UserForm.module.css";
import { generateUniqueId, GROUPS } from "../utils/utils";

export type UserDetailsProps = {
  users: UserProps[];
  setUsers: Dispatch<SetStateAction<UserProps[]>>;
  setIsAddingUser: Dispatch<SetStateAction<boolean>>;
};

export const UserForm = ({
  users,
  setUsers,
  setIsAddingUser,
}: UserDetailsProps) => {
  const [inputs, setInputs] = useState<UserProps>({
    id: -1,
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    avatar: "",
    phone: "",
    about: "",
    city: "",
    groups: [],
  });

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name.indexOf("custom-checkbox-") > -1) {
      const checkboxID = Number(name.replace("custom-checkbox-", ""));
      console.log(checkboxID);
      let newGroups = inputs.groups ? [...inputs.groups] : [];
      if (value === "on") newGroups.push(checkboxID);
      else {
        newGroups = newGroups.filter((group) => group !== checkboxID);
      }
      setInputs((values) => ({
        ...values,
        groups: newGroups,
      }));
    } else {
      setInputs((values) => ({ ...values, [name]: value }));
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setIsAddingUser(false);
    inputs.id = generateUniqueId(users);
    setUsers([...users, inputs]);
    alert(JSON.stringify(inputs));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        First name:
        <input
          type="text"
          name="first_name"
          value={inputs.first_name || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Last name:
        <input
          type="text"
          name="last_name"
          value={inputs.last_name || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={inputs.email || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Gender:
        <input
          type="text"
          name="gender"
          value={inputs.gender || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Avatar link:
        <input
          type="text"
          name="avatar"
          value={inputs.avatar || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Phone:
        <input
          type="text"
          name="phone"
          value={inputs.phone || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        About:
        <input
          type="text"
          name="about"
          value={inputs.about || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        City:
        <input
          type="text"
          name="city"
          value={inputs.city || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Select groups:
        {GROUPS.map(({ id, description }) => {
          return (
            <div>
              <input
                type="checkbox"
                id={`custom-checkbox-${id}`}
                key={id}
                name={`custom-checkbox-${id}`}
                checked={inputs.groups && inputs.groups?.indexOf(id) > -1}
                onChange={handleChange}
              />
              <label htmlFor={`custom-checkbox-${id}`}>{description}</label>
            </div>
          );
        })}
      </label>
      <input type="submit" className={styles.button} />
    </form>
  );
};
