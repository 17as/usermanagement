import { UserProps } from "../pages";

export const GROUPS = [
  { id: 0, description: "Baking" },
  { id: 1, description: "Music rocks" },
  { id: 2, description: "Javascript rules" },
  { id: 3, description: "I love CSS" },
  { id: 4, description: "Music rocks" },
  { id: 5, description: "Marvel fans" },
  { id: 6, description: "German language" },
];
export const generateGroups = (data: UserProps[]) => {
  const clonedData: UserProps[] = [];
  data.forEach((user) => {
    user.groups = [];
    // min one hobby group for each user
    const randomGroupssNumber = Math.max(Math.floor(Math.random() * 7) + 1, 1);
    let userGroups = [...GROUPS];
    for (let i: number = 0; i < randomGroupssNumber; ++i) {
      const groupId =
        userGroups[Math.floor(Math.random() * userGroups.length)].id;
      user.groups.push(groupId);
      userGroups = userGroups.filter((group) => group.id !== groupId);
    }
    clonedData.push({ ...user });
  });
  return clonedData;
};

export const generateUniqueId: (users: UserProps[]) => number = (
  users: UserProps[]
) => {
  //put temporary cap limit of 1000 users
  const newId = Math.floor(Math.random() * 1000);
  const isIsUnique = users.filter((user) => user.id === newId).length === 0;
  if (isIsUnique) return newId;
  return generateUniqueId(users);
};
