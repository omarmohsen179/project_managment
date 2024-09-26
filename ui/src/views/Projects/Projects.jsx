import CrudMUI from "../../components/CrudTable/CrudMUI";
import PageLayout from "../../components/PageLayout/PageLayout";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DELETE_PROJECTS, EDIT_PROJECT, GET_PROJECTS } from "./Api";
const Projects = () => {
  const { t, i18n } = useTranslation();
  const columnAttributes = useMemo(() => {
    return [
      {
        caption: "الرقم",
        captionEn: "Number",
        field: "Id",
        disable: true,
        widthRatio: 100,
      },
      {
        caption: "الاسم",
        field: "ProjectName",
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
        caption: "Budget",
        field: "Budget",
        captionEn: "Budget",
        required: true,
      },
      {
        caption: "Owner",
        field: "Owner",
        captionEn: "Owner",
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
    ];
  }, []);

  return (
    <PageLayout>
      <CrudMUI
        id={"Id"}
        colAttributes={columnAttributes}
        EDIT={EDIT_PROJECT}
        ADD={EDIT_PROJECT}
        DELETE={DELETE_PROJECTS}
        GET={GET_PROJECTS}
      />
    </PageLayout>
  );
};

export default Projects;
