import React, { useContext, useState } from "react";
import { customersContext } from "../../Contexts/CustomersContext.jsx";
import { transactionsContext } from "../../Contexts/TransactionContext.jsx";

const Table = () => {
  const { customers } = useContext(customersContext);
  const { transactions } = useContext(transactionsContext);

  const [inputNameValue, setInputNameValue] = useState("");
  const [inputTransactionValue, setInputTransactionValue] = useState("");

  const handleNameInputChange = (e) => {
    setInputNameValue(e.target.value);
  };

  const handleTransactionInputChange = (e) => {
    setInputTransactionValue(e.target.value);
  };

  const filterCustomers = inputNameValue
    ? customers?.filter((customer) =>
        customer.name.toLowerCase().includes(inputNameValue.toLowerCase())
      )
    : customers;

  const filterTransactions = (customerId) =>
    inputTransactionValue
      ? transactions?.filter(
          (transaction) =>
            transaction.customer_id == customerId &&
            transaction.amount == inputTransactionValue
        )
      : transactions?.filter(
          (transaction) => transaction.customer_id == customerId
        );

  return (
   
  <>
   <h1 className="Route">Route Task</h1>
  <div className="container">
      <div className="search-bar">
        <input
          onChange={handleNameInputChange}
          className="form-control"
          type="text"
          placeholder="Filter by name"
        />
        <input
          onBlur={handleTransactionInputChange}
          className="form-control"
          type="text"
          placeholder="Filter by transaction"
        />
      </div>
      {filterCustomers?.length > 0 ? (
        <table className="table text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th colSpan={transactions.length}>Transactions</th>
            </tr>
          </thead>
          <tbody>
            {filterCustomers?.map((customer) => {
              const customerTransactions = filterTransactions(customer.id);
              return (
                <tr key={customer.id}>
                  <th>{customer.id}</th>
                  <td>{customer.name}</td>
                  {customerTransactions?.length > 0 ? (
                    customerTransactions.map((transaction) => (
                      <td key={transaction.id}>{transaction.amount}</td>
                    ))
                  ) : (
                    <td colSpan={transactions.length}>No match found</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="no-match">No match found</div>
      )}
    </div>
  
  
  </>
  );
};

export default Table;
