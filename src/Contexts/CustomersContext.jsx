import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const customersContext = createContext();

export default function CustomersContextProvider({children}) {
  let [customers, setCustomers] = useState();
  async function getCustomers() {
    let { data } = await axios.get("http://localhost:5001/customers");
    setCustomers(data);
  }
  useEffect(() => {
    getCustomers();
  }, []);

  return <customersContext.Provider value={{customers}}>
    {children}
  </customersContext.Provider>
}
