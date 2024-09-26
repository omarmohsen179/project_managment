import { createQueryString } from "../../services/SharedData";
import REQUEST from "../../services/Request";

export const GET_PROJECTS = async (data) => {
  return await REQUEST({
    method: "POST",
    url: "Project/pagination?" + createQueryString(data),
  });
};

export const GET_PROJECTS_ALL = async () => {
  return await REQUEST({
    method: "GET",
    url: "Project",
  });
};
export const EDIT_PROJECT = async (data) => {
  return await REQUEST({
    method: data.Id > 0 ? "PUT" : "POST",
    url: "Project",
    data,
  });
};

export const DELETE_PROJECTS = async (id) => {
  return await REQUEST({
    method: "DELETE",
    url: "Project/" + id,
  });
};
