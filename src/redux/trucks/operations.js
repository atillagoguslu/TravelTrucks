import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CAMPERS_URL } from "../../constants/axios.js";

const getTrucks = createAsyncThunk("trucks/getTrucks", async (_, thunkAPI) => {
  try {
    const getResponse = await axios.get(CAMPERS_URL, {
      headers: { "Content-Type": "application/json" },
    });
    return getResponse.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.getResponse.data);
  }
});

export { getTrucks };
