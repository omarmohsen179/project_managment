import React, { useCallback, useEffect, useState } from "react";
import { Popup } from "devextreme-react/popup";
import ScrollView from "devextreme-react/scroll-view";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

function PopUpModel({
  maxWidth = 1000,
  minHeight = 200,
  setdialog,
  dailog,
  children,
  Submit,
}) {
  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <Popup
      maxWidth={maxWidth}
      title={""}
      minWidth={1400}
      height={600}
      minHeight={minHeight}
      showTitle={true}
      dragEnabled={false}
      visible={dailog}
      fullScreen={true}
      width={1400}
      onHiding={() => setdialog(false)}
    >
      <ScrollView showScrollbar="onHover">
        {children}
        {Submit ? (
          <div style={{ padding: "10px", width: "100%" }}>
            <ButtonComponent
              title={"Submit"}
              onClick={Submit}
              onEnter={dailog}
              pressOnEnter
            />
          </div>
        ) : null}
      </ScrollView>
    </Popup>
  );
}

export default React.memo(PopUpModel);
