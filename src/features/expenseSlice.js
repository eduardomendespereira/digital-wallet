import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
const initialState = [];

const expenseSlice = createSlice({
    name: 'expensesReducer',
    initialState,
    reducers: {
        addExpense: (state, action) => {
            state.push(action.payload);
        },
        deleteExpense: (state = initialState, action) => {
            const { id } = action.payload;
            const existingExpense = state.find(expense => expense.id === id);
            if(existingExpense) {
                return state.filter(user => user.id !== id);
            }
        },
    }
});


export const { addExpense, deleteExpense} = expenseSlice.actions;
export default expenseSlice.reducer;