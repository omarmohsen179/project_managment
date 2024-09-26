import Projects from "../../views/Projects/Projects";
import Tasks from "../../views/Tasks/Tasks";
import Users from "../../views/Users/Users";

export const routes = [
  {
    name: "Projects",
    route: "/projects",
    key: "Manager",
    Component: Projects,
  },
  {
    name: "Tasks",
    route: "/tasks",
    key: "Manager",
    Component: Tasks,
  },
  {
    name: "Users",
    route: "/users",
    key: "Manager",
    Component: Users,
  },
];
