import REQUEST from "../../services/Request";
export const LOGIN = async (e) => {
  return await REQUEST({
    method: "post",
    url: "auth/login",
    data: e,
  });
};
