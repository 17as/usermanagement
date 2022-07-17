import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { UserForm } from "../components/UserForm";
import { UsersList } from "../components/Userslist";
import styles from "../styles/Home.module.css";
import { generateGroups } from "../utils/utils";

export type UserProps = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  avatar: string;
  phone: string;
  about: string;
  city: string;
  groups?: number[];
};

type HomeProps = {
  data: UserProps[];
};

const Home: NextPage<HomeProps> = ({ data }) => {
  const [users, setUsers] = useState<UserProps[]>(generateGroups(data));
  const [isAddingUser, setIsAddingUser] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>User management</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>Welcome to Usermanagement!</header>
      {!isAddingUser && (
        <main className={styles.main}>
          <button
            className={styles.userButton}
            onClick={() => setIsAddingUser(true)}
          >
            Add new user
          </button>
          <UsersList users={users} setUsers={setUsers} />
        </main>
      )}
      {isAddingUser && (
        <UserForm
          users={users}
          setUsers={setUsers}
          setIsAddingUser={setIsAddingUser}
        />
      )}

      <footer className={styles.footer}>Copyright © 2022</footer>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`
  http://localhost:3000/MOCK_DATA.json`);
  const data = await res.json();
  return { props: { data } };
}

export default Home;
