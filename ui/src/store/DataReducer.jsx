import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl } from "../services/config";

import {
  ApproachCoronaryAngiography,
  CoronaryAngiographyRecommendation,
  ETF,
  EducationLevel,
  Gender,
  IfAbnormal,
  IfLesion70,
  Infarction,
  InfarctionType,
  NumberOfStents,
  ResidencyArea,
  Result,
  ResultCoronaryAngiography,
  SmokerHistory,
  elements,
  pos_neg,
  seasonData,
} from "../services/SharedData";

// Calling API
export const getData = createAsyncThunk(
  "data/getData",
  async (arg, { dispatch, getState }) => {
    return axios({
      url: `${ApiBaseUrl}/api/auth/data`,
      method: "GET",
    })
      .then(({ data }) => {
        return {
          ...data,
          Gender: Gender,
          InfarctionType: InfarctionType,
          Result: Result,
          ETF: ETF,
          ResidencyArea: ResidencyArea,
          EducationLevel: EducationLevel,
          SmokerHistory: SmokerHistory,
          ApproachCoronaryAngiography: ApproachCoronaryAngiography,
          ResultCoronaryAngiography: ResultCoronaryAngiography,
          IfLesion70: IfLesion70,
          IfAbnormal: IfAbnormal,
          CoronaryAngiographyRecommendation: CoronaryAngiographyRecommendation,
          NumberOfStents: NumberOfStents,
          Infarction: Infarction,
          pos_neg: pos_neg,
        };
      })
      .catch((error) => {
        // notify("Error in information. try again!", "error", 3000);
        dispatch(getData.rejected(error.response?.data ?? error));
      });
  }
);

// Create Slice
const DataReducer = createSlice({
  name: "data",
  initialState: {
    lookups: null,
    //  date: new date(),
  },
  reducers: {},
  extraReducers: {
    // auth/register
    [getData.pending](state, action) {
      state.lookups = null;
    },
    [getData.fulfilled](state, { payload }) {
      state.lookups = payload;
      // state.date = new date();
    },
    [getData.rejected](state, action) {
      state.lookups = null;
    },
  },
});

// Export Selectors
export const data = DataReducer.reducer;

export const data_selector = (state) => {
  return state.data.lookups;
};
export const get_name = (data, args, i18n) => {
  try {
    const res = data?.find((e) => e.Id == args);
    if (i18n) {
      return i18n?.language === "ar"
        ? res[Object.keys(res).find((e) => e.includes("Name"))]
        : res[Object.keys(res).find((e) => e.includes("NameEn"))];
    }

    return res != null
      ? res[Object.keys(res).find((e) => e.includes("Name"))]
      : "";
  } catch (err) {
    return "";
  }
};
export const get_element_name = (data, type, Id) => {
  try {
    const res =
      type == 0
        ? data.Accessories?.find((e) => e.Id == Id)
        : type == 1
        ? data.Items?.find((e) => e.Id == Id)
        : data.Models?.find((e) => e.Id == Id);

    return res != null ? res.ElementName : "";
  } catch (err) {
    return "";
  }
};
