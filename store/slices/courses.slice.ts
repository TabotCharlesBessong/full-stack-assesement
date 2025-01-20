import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const response = await fetch("/api/courses");
    return response.json();
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCourses.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default coursesSlice.reducer;
