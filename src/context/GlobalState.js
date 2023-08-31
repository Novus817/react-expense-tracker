import React, { createContext, useReducer, useEffect } from 'react';
import { AppReducer } from './AppReducer';

// Initial state
const initialState = {
  transactions: JSON.parse(localStorage.getItem('transactions')) || [],
};

// Initial Initial State >>
// const getInitialState = () => {
//   const transactions = localStorage.getItem('transactions');
//   return transactions ? JSON.parse(transactions) : initialState;
// };

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id,
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction,
    });
  }

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state.transactions));
  }, [state.transactions]);

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
