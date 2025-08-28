import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axiosConfig";
import { userExample } from "../tempObjects/user";

export const getUserInfo = createAsyncThunk("user/getUserInfo", async () => {
  // const response = await api.get("/users/");
  // return response.data.data;
  console.log(api.e);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return userExample;
});
