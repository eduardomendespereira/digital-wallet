import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expense: {
        value: '',
        description: '',
        coin: '',
        paymentMethod: '',
        tag: ''
    }
    
};

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
        changeExpense: (state, action) => {
            state.expense = action.payload
        }
    }
});


export const { addExpense, deleteExpense, changeExpense} = expenseSlice.actions;
export default expenseSlice.reducer;