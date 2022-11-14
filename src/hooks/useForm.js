import { useState } from "react";

export const useForm = (initialState = {}) => {
    const [inputValues, setInputValues] = useState({});

    const resetForm = () => {
        setInputValues(initialState);
    };

    const setForm = (newValues) => {
        setInputValues(newValues);
    };

    const handleInputChange = ({ target: {name, value} }) => {
        setInputValues((oldExpense) => ({
            ...oldExpense,
            [name]: value
        }));
    };

    return { inputValues, handleInputChange, resetForm, setForm };
};