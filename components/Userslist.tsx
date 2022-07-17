import { Dispatch, SetStateAction, useState } from "react";
import { UserProps } from "../pages";
import styles from "../styles/Users.module.css";
import { UserDetails } from "./UserDetails";

export type UsersListProps = {
  users: UserProps[];
  setUsers: Dispatch<SetStateAction<UserProps[]>>;
};

const getUserWithId = (users: UserProps[], id: number) => {
  const filtered = users.filter((user) => user.id === id);
  const user = filtered.length > 0 ? filtered[0] : undefined;

  return user;
};

export const UsersList = ({ users, setUsers }: UsersListProps) => {
  const [userId, setUserId] = useState(-1);

  const deleteUser = (idToBeDeleted: number) => {
    const newUsers = users.filter((user) => user.id !== idToBeDeleted);
    setUsers(newUsers);
    setUserId(-1);
  };

  const user = getUserWithId(users, userId);

  return (
    <>
      {userId === -1 && (
        <div className={styles.grid}>
          {users.map((user: UserProps) => (
            <button
              className={styles.userButton}
              onClick={() => setUserId(user.id)}
              key={user.id}
            >
              {user.id} {user.first_name} {user.last_name}
            </button>
          ))}
        </div>
      )}
      {userId > -1 && user && (
        <UserDetails
          user={user}
          setUserId={setUserId}
          deleteUser={deleteUser}
        />
      )}
    </>
  );
};
