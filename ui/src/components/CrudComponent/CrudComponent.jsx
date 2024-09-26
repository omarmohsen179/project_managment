import notify from "devextreme/ui/notify";
import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import EditDelete1 from "../../components/EditDelete1";
import PageLayout from "../../components/PageLayout/PageLayout";
import ButtonsRow from "../../components/components/ButtonsRow";
import { routes } from "../NavigationBar/routes";
const CrudComponent = ({
  columnAttributes,
  defaultData,
  DELETE,
  EDIT,
  GET,
  GET_BY_ID,
  Form,
  validate = "",
}) => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [data, setData] = useState([]);
  const [values, setValues] = useState(defaultData.current);
  const [editDeleteStatus, setEditDeleteStatus] = useState("");

  const onUndo = useCallback(() => {
    setValues({ ...defaultData.current });
  }, []);
  const submit = useCallback(
    (e) => {
      e.preventDefault();
      if (validate) {
        notify(
          {
            message: t(validate),
            width: 600,
          },
          "error",
          3000
        );
      }
      setLoading(true);
      EDIT(values)
        .then((res) => {
          notify(t("saved successfully"), "success", 3000);
          setValues(res);
        })
        .catch((err) => {
          console.log(err);
          notify(
            t(err ? err : "Error in information. try again!"),
            "error",
            3000
          );
        })
        .finally(() => setLoading(false));
    },
    [values, t]
  );

  const handleChange = useCallback(({ name, value }) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);
  useEffect(() => {
    onNew();
  }, []);
  const onUpdateDelete = useCallback((title) => {
    setLoading(true);
    GET()
      .then((e) => {
        setEditDeleteStatus(title);
        setData(e);
        setPopUp(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const onNew = useCallback(() => {
    setValues({
      ...defaultData.current,
    });
  }, []);

  let ClosePopUp = useCallback((id) => {
    setPopUp(false);
  }, []);

  const removeElement = useCallback((id) => {
    setData((prev) => [...prev.filter((e) => e.Id != id)]);
  }, []);
  let handleGetImages = (event) => {
    let files = event.target.files;
    setData((prev) => ({ ...prev, Image: files[0], ImagePath: "" }));
  };

  let handleRemoveImage = useCallback(() => {
    setData((prev) => ({ ...prev, Image: "", ImagePath: "" }));
  }, []);
  const setElementData = useCallback(
    (e) => {
      console.log({
        ...defaultData.current,
      });
      setValues({
        ...defaultData.current,
      });
      if (GET_BY_ID) {
        setLoading(true);
        GET_BY_ID(e.Id)
          .then((res) => {
            setValues(res);
          })
          .catch((e) => {
            notify(
              {
                message: t("this item already in this category"),
                width: 600,
              },
              "error",
              3000
            );
          })
          .finally(() => setLoading(false));
      } else {
        setValues(e);
      }
    },
    [GET_BY_ID]
  );

  return (
    <PageLayout
      title={
        routes.filter((e) => "#" + e.route === window.location.hash)[0].name
      }
      loading={loading}
      submit={submit}
      onHiding={() => setLoading(false)}
    >
      <div className="row">
        <Form
          handleChange={handleChange}
          values={values}
          handleGetImages={handleGetImages}
          handleRemoveImage={handleRemoveImage}
          setLoading={setLoading}
        />
      </div>
      <ButtonsRow
        onNew={onNew}
        onCopy={null}
        onEdit={onUpdateDelete}
        onDelete={onUpdateDelete}
        isSimilar={false}
        onUndo={onUndo}
        isExit={false}
      />

      <EditDelete1
        data={data}
        columnAttributes={columnAttributes}
        deleteItem={DELETE}
        removeElement={removeElement}
        close={ClosePopUp}
        getEditData={setElementData}
        visible={popUp}
        editDeleteStatus={editDeleteStatus}
      />
    </PageLayout>
  );
};

export default memo(CrudComponent);
