import { useMemo, useRef } from "react";

import CrudComponent from "../../components/CrudComponent/CrudComponent";
import { DELETE_USER, EDIT_USER, GET_USERS, GET_USER_BY_ID } from "./Api";
import UserForm from "./UserForm";

const Users = () => {
  const defaultData = useRef({
    Id: "",
    Username: "",
    Password: "",
    AllStores: false,
    Roles: [],
    UsersStores: [],
    Elements: [],
  });

  const columnAttributes = useMemo(() => {
    return [
      {
        caption: "الاسم",
        field: "UserName",
        captionEn: "Name",
      },
    ];
  }, []);
  return (
    <CrudComponent
      columnAttributes={columnAttributes}
      defaultData={defaultData}
      DELETE={DELETE_USER}
      EDIT={EDIT_USER}
      GET={GET_USERS}
      GET_BY_ID={GET_USER_BY_ID}
      Form={UserForm}
    />
  );
};

export default Users;
