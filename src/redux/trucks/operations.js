import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CAMPERS_URL } from "../../constants/axios.js";

const getTrucks = createAsyncThunk("trucks/getTrucks", async (_, thunkAPI) => {
  try {
    const getResponse = await axios.get(CAMPERS_URL, {
      headers: { "Content-Type": "application/json" },
    });

    const data = getResponse.data;
    // If the API returns paginated data { total, items: [] }
    if (data && Array.isArray(data.items)) {
      return data.items;
    }

    // Otherwise assume the response itself is an array
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.getResponse.data);
  }
});

export { getTrucks };
