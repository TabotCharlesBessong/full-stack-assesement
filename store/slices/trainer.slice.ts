import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTrainers = createAsyncThunk(
  "trainers/fetchTrainers",
  async () => {
    const response = await fetch("/api/trainers");
    return response.json();
  }
);

const trainersSlice = createSlice({
  name: "trainers",
  initialState: {
    trainers: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrainers.fulfilled, (state, action) => {
        state.trainers = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchTrainers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default trainersSlice.reducer;
