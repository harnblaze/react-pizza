import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {
    sortName: "популярности",
    sortProperty: "rating",
  },
  order: true,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.categoryId = action.payload;
    },
    changeSort: (state, action) => {
      state.sort = action.payload;
    },
    changeOrder: (state) => {
      state.order = !state.order;
    },
  },
});

export const { changeCategory, changeSort, changeOrder } = filterSlice.actions;

export default filterSlice.reducer;
