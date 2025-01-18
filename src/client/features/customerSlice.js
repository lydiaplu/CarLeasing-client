import { createSlice } from '@reduxjs/toolkit';

export const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        currentCustomer: null
    },
    reducers: {
        setCustomer: (state, action) => {
            state.currentCustomer = action.payload;
        },
        logoutCustomer: (state) => {
            state.currentCustomer = null;
        }
    }
});

export const { setCustomer, logoutCustomer } = customerSlice.actions;
export default customerSlice.reducer;