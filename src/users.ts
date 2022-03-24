export interface User {
  id: number;
  name: string;
  role: "admin" | "user";
  age: number;
}
export type Users = User[];

export const siteUsers: Users = [
  {
    id: 1,
    name: "John",
    role: "admin",
    age: 30,
  },
  {
    id: 2,
    name: "Mary",
    role: "user",
    age: 13,
  },
  {
    id: 3,
    name: "Mike",
    role: "user",
    age: 15,
  },
  {
    id: 4,
    name: "Adam",
    role: "admin",
    age: 22,
  },
  {
    id: 5,
    name: "Julie",
    role: "admin",
    age: 35,
  },
];
export const getUser = (username: User["name"]): User =>
  siteUsers.find((response: User) => {
    return response.name == username;
  });

export const isAdmin = (username: User["name"], age: User["age"]): Boolean => {
  const siteUser = getUser(username);
  if (!siteUser) {
    return false;
  }
  return siteUser.role == "admin";
};

export const isAgedAppropriately = (age: User["age"]) => {
  let answer = age < 18 || age > 65 ? false : true;
  return answer;
};
