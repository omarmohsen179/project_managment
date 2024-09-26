import REQUEST from "../../services/Request";
export const REGISTRATION = async (e) => {
  return await REQUEST({
    method: "post",
    url: "auth/register",
    data: e,
  });
};
