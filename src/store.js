import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import expenseSlice from './features/expenseSlice.js';


export const store = configureStore({
    reducer:{
        expenses: expenseSlice
    },
})