import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import CrudMUI from "../../components/CrudTable/CrudMUI";
import PageLayout from "../../components/PageLayout/PageLayout";
import { DELETE_TASK, EDIT_TASK, GET_TASKS } from "./Api";
import { GET_PROJECTS, GET_PROJECTS_ALL } from "../Projects/Api";

const Tasks = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    GET_PROJECTS_ALL().then((res) => {
      console.log(res);
      setProjects(res);
    });
  }, []);
  const columnAttributes = useMemo(() => {
    return [
      {
        caption: "الرقم",
        captionEn: "Number",
        field: "Id",
        disable: true,
      },
      {
        caption: "الاسم",
        field: "TaskName",
        captionEn: "Name",
        required: true,
      },
      {
        caption: "Description",
        field: "Description",
        captionEn: "Description",
        required: true,
      },
      {
        caption: "AssignedTo",
        field: "AssignedTo",
        captionEn: "AssignedTo",
        required: true,
      },
      {
        caption: "Priority",
        field: "Priority",
        captionEn: "Priority",
        display: "Name",
        data: [
          { id: 1, Name: "High" },
          { id: 2, Name: "Medium" },
          { id: 3, Name: "Low" },
        ],
        required: true,
      },
      {
        caption: "Status",
        field: "Status",
        captionEn: "Status",
        display: "Name",
        data: [
          { id: 1, Name: "NotStarted" },
          { id: 2, Name: "InProgress" },
          { id: 3, Name: "Completed" },
        ],
        required: true,
      },

      {
        caption: "التصنيف",
        field: "ProjectId",
        captionEn: "ProjectName",
        display: "ProjectName",
        data: projects,
        value: "Id",
        required: true,
      },
    ];
  }, [projects]);

  return (
    <PageLayout>
      <CrudMUI
        id={"Id"}
        colAttributes={columnAttributes}
        EDIT={EDIT_TASK}
        ADD={EDIT_TASK}
        DELETE={DELETE_TASK}
        GET={GET_TASKS}
      />
    </PageLayout>
  );
};

export default Tasks;
