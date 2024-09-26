import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import notify from "devextreme/ui/notify";
import { ApiBaseUrl } from "../services/config";

import {
  GetFromLocalStorage,
  RemoveFromLocalStorage,
  StoreToLocalStorage,
} from "../services/localStorageService";

// Calling API
export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (arg, { dispatch, getState }) => {
    return axios({
      url: `${ApiBaseUrl}api/auth/register`,
      method: "POST",
      data: arg,
    })
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        dispatch(userRegister.rejected(error.response?.data ?? error));
      });
  }
);

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (arg, { dispatch, getState }) => {
    return axios({
      url: `${ApiBaseUrl}api/auth/Login`,
      method: "POST",
      data: arg,
    })
      .then(({ data }) => {
        if (arg.rememberMe) {
          StoreToLocalStorage("user-auth", data.token, data.expiresOn);
        }

        return { ...data, rememberMe: arg.rememberMe };
      })
      .catch((error) => {
        dispatch(userLogin.rejected(error.response?.data ?? error));
      });
  }
);

export const userLoginLocalStorage = createAsyncThunk(
  "auth/userLogin",
  async (arg, { dispatch, getState }) => {
    return { ...arg };
  }
);
export const memberLogin = createAsyncThunk(
  "auth/memberLogin",
  async (arg, { dispatch, getState }) => {
    return axios({
      url: `${ApiBaseUrl}CustomerLogin`,
      method: "POST",
      data: { email: arg.Email, password: arg.Password },
    })
      .then(({ data }) => {
        return { ...data, rememberMe: arg.RememberMe };
      })
      .catch((error) => {
        dispatch(memberLogin.rejected(error.response?.data ?? error));
      });
  }
);

// Create Slice
const AuthReducer = createSlice({
  name: "auth",
  initialState: {
    user: GetFromLocalStorage("auth_user"),
    loading: false,
  },
  reducers: {
    // auth/signOut
    signOut(state, { payload }) {
      state.user = {};

      RemoveFromLocalStorage("auth_user");
    },
  },
  extraReducers: {
    // auth/register
    [userRegister.pending](state, action) {
      state.loading = true;
    },
    [userRegister.fulfilled](state, { payload }) {
      if (payload) {
        state.user = payload;

        notify(`${payload.email} registered successfully`, "success", 3000);
      }
      state.loading = false;
    },
    [userRegister.rejected](state, action) {
      notify(action.error?.message ?? "Error occured ..", "error", 3000);
      state.loading = false;
    },

    // auth/userLogin
    [userLogin.pending](state, action) {
      state.loading = true;
    },
    [userLogin.fulfilled](state, { payload }) {
      if (payload) {
        state.user = payload;

        if (payload.rememberMe)
          StoreToLocalStorage("auth_user", payload, payload.expiresOn);
        if (payload.email) {
          notify(`${payload.email} Logged in successfully`, "success", 3000);
        }
      }
      state.loading = false;
    },
    [userLogin.rejected](state, action) {
      notify(action.error?.message ?? "Error occured ..", "error", 3000);
      state.loading = false;
    },

    // auth/memberLogin
    [memberLogin.pending](state, action) {
      state.loading = true;
    },
    [memberLogin.fulfilled](state, { payload }) {
      if (payload) {
        state.user = payload;

        if (payload.rememberMe)
          StoreToLocalStorage("auth_user", payload, payload.expiresOn);

        notify(`${payload.email} Logged in successfully`, "success", 3000);
      }
      state.loading = false;
    },
    [memberLogin.rejected](state, action) {
      notify(action.error?.message ?? "Error occured ..", "error", 3000);
      state.loading = false;
    },
  },
});

// Export Selectors
export const auth = AuthReducer.reducer;

export const { signOut } = AuthReducer.actions;

export const user_selector = (state) => {
  return state.auth.user;
};

export const auth_loading = (state) => {
  return state.auth.loading;
};
