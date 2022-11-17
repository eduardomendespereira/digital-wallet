import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
    description: '',
    coin: '',
    paymentMethod: '',
    tag: ''
};

const walletSlice = createSlice({
    name: 'walletReducer',
    initialState,
    reducers: {
        addExpense: (state = initialState, action) => {
            state.push(action.payload);
        },
    },
    deleteExpense: (state = initialState, action) => {
        const { id } = action.payload;
        const existingExpense = state.find(expense => expense.id === id);
        if(existingExpense) {
            return state.filter(user => user.id !== id);
        }
    }
});


export const { addExpense, deleteExpense} = walletSlice = walletSlice.actions;
export default walletSlice.reducer;