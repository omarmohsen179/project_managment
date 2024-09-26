import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PageLayout from "../../components/PageLayout/PageLayout";
import { data_selector, get_name } from "../../store/DataReducer";
import { useSelector } from "react-redux";
const Home = () => {
  return (
    <PageLayout title={"Home"}>
      <h1>good Morning</h1>
    </PageLayout>
  );
};

export default Home;
