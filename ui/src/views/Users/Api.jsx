import REQUEST from "../../services/Request";

export const GET_USERS = async () => {
  return await REQUEST({
    method: "GET",
    url: "Auth",
  });
};
export const GET_USER_BY_ID = async (id) => {
  return await REQUEST({
    method: "GET",
    url: "Auth/" + id,
  });
};
export const GET_ROLES = async () => {
  return await REQUEST({
    method: "GET",
    url: "Auth/roles",
  });
};
export const GET_STORES = async (id) => {
  return await REQUEST({
    method: "GET",
    url: "store/admin",
  });
};
export const EDIT_USER = async (data) => {
  return await REQUEST({
    method: "POST",
    url: data.Id.length > 1 ? "Auth/update" : "Auth/register",
    data,
  });
};

export const DELETE_USER = async (id) => {
  return await REQUEST({
    method: "DELETE",
    url: "Auth/" + id,
  });
};
