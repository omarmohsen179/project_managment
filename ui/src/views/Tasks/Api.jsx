import { createQueryString } from "../../services/SharedData";
import REQUEST from "../../services/Request";

export const EDIT_TASK = async (data) => {
  return await REQUEST({
    method: data.Id > 0 ? "PUT" : "POST",
    url: "Task",
    data: data,
  });
};

export const DELETE_TASK = async (id) => {
  return await REQUEST({
    method: "DELETE",
    url: "Task/" + id,
  });
};
export const GET_TASK_BY_ID = async (id) => {
  return await REQUEST({
    method: "GET",
    url: "Task/" + id,
  });
};
export const GET_TASKS = async (data) => {
  return await REQUEST({
    method: "POST",
    url: "Task/pagination?" + createQueryString(data),
  });
};
