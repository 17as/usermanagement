import { Dispatch, SetStateAction } from "react";
import { UserProps } from "../pages";
import styles from "../styles/UserDetails.module.css";
import { GROUPS } from "../utils/utils";

export type UserDetailsProps = {
  user: UserProps;
  setUserId: Dispatch<SetStateAction<number>>;
  deleteUser: (idToBeDeleted: number) => void;
};

export const UserDetails = ({
  user,
  setUserId,
  deleteUser,
}: UserDetailsProps) => (
  <div className={styles.container}>
    <button className={styles.button} onClick={() => setUserId(-1)}>
      Back
    </button>
    <section className={styles.container}>
      <h1>
        {user.first_name} {user.last_name}
      </h1>
      <p>Gender: {user.gender}</p>
      <p>
        Contact: {user.phone}, {user.email}
      </p>
      <p>About: {user.about}</p>
      <p>Location: {user.city}</p>
      <p>
        Groups:
        {user.groups?.map((group: number) => (
          <span className={styles.group}>{GROUPS[group].description}</span>
        ))}
      </p>
    </section>
    <button className={styles.button} onClick={() => deleteUser(user.id)}>
      Delete user
    </button>
  </div>
);
