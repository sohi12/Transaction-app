import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const transactionsContext = createContext();

export default function TransactionsContextProvider({children}) {
  let [transactions, setTransactions] = useState();
  async function getTransactions() {
    let {data} = await axios.get("http://localhost:5001/transactions");
    setTransactions(data);
  }
  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <transactionsContext.Provider
      value={{ transactions }}
    >
        {children}
    </transactionsContext.Provider>
  );
}
