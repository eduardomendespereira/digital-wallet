export const getListExpenses = () => {
    if (!localStorage["expenses"]) {
        localStorage["expenses"] = "[]";
    }
    let expenses = localStorage["expenses"];
    expenses = JSON.parse(expenses);
    return expenses;
};

export const addExpense = (expense) => {
    const expenses = getListExpenses();
    expenses.push(expense);
    localStorage["expenses"] = JSON.stringify(expenses);
};

export const removeExpense = (id) => {
    let expenses = getListExpenses();
    expenses = expenses.filter((expense) => expense.id !== id);
    localStorage["expenses"] = JSON.stringify(expenses);
};

export const editExpense = (id, newExpense) => {
    let expenses = getListExpenses();
    expenses = expenses.filter((expense) => expense.id !== id);
    expenses.push(newExpense);
    localStorage["expenses"] = JSON.stringify(expenses);
};

export const getExpenseById = (id) => {
    const expenses = getListExpenses();
    const expense = expenses.find((expense) => expense.id === id);
    return expense;
}