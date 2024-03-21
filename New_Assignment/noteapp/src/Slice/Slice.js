import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screenToggle: false,
  selectedStatus: "Active",
  categoryData: [],
  isModalOpen: false,
  categoryValue : "Milk"
};

export const counterSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    setToggle: (state, action) => {
      state.screenToggle = action.payload;
    },
    setSelectedDropdownValue: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setCategoryData: (state, action) => {
      state.categoryData = action.payload;
    },
    setIsModelOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    SetCategoryValue: (state, action) => {
      state.categoryValue = action.payload;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { setToggle, setSelectedDropdownValue, setCategoryData,setIsModelOpen,SetCategoryValue } =
  counterSlice.actions;

export default counterSlice.reducer;
