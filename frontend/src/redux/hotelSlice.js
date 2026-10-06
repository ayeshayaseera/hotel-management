import { createSlice } from "@reduxjs/toolkit";

const savedHotels = localStorage.getItem("hotels");

const initialState = {
  hotels: savedHotels ? JSON.parse(savedHotels) : []
};

const hotelSlice = createSlice({
  name: "hotels",

  initialState,

  reducers: {

    setHotels: (state, action) => {
      state.hotels = action.payload;

      localStorage.setItem(
        "hotels",
        JSON.stringify(state.hotels)
      );
    },

    addHotel: (state, action) => {
      state.hotels.push(action.payload);

      localStorage.setItem(
        "hotels",
        JSON.stringify(state.hotels)
      );
    },

    updateHotel: (state, action) => {
      const index = state.hotels.findIndex(
        (hotel) => hotel.id === action.payload.id
      );

      if (index !== -1) {
        state.hotels[index] = action.payload;
      }

      localStorage.setItem(
        "hotels",
        JSON.stringify(state.hotels)
      );
    },

    deleteHotel: (state, action) => {
      state.hotels = state.hotels.filter(
        (hotel) => hotel.id !== action.payload
      );

      localStorage.setItem(
        "hotels",
        JSON.stringify(state.hotels)
      );
    }

  }
});

export const {
  setHotels,
  addHotel,
  updateHotel,
  deleteHotel
} = hotelSlice.actions;

export default hotelSlice.reducer;