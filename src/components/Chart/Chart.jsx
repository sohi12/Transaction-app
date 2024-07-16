import React, { useContext, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { customersContext } from "../../Contexts/CustomersContext";
import { transactionsContext } from "../../Contexts/TransactionContext";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const [selectedName, setSelectedName] = useState("");
  const { customers } = useContext(customersContext);
  const { transactions } = useContext(transactionsContext);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Transactions",
        data: [],
        borderColor: "#2d6a4f",
        backgroundColor: "rgba(45, 106, 79, 0.2)"
      },
    ],
  });

  useEffect(() => {
    if (selectedName && transactions) {
      const selectedCustomer = customers.find(
        (customer) => customer.name.toLowerCase() == selectedName.toLowerCase()
      );

      if (selectedCustomer) {
        const filteredTransactions = transactions.filter(
          (transaction) => transaction.customer_id == selectedCustomer.id
        );

        const labels = filteredTransactions.map((transaction) => transaction.date);
        const data = filteredTransactions.map((transaction) => transaction.amount);

        setChartData({
          labels,
          datasets: [
            {
              label: "Transactions",
              data,
              borderColor: "#2d6a4f",
              backgroundColor: "rgba(45, 106, 79, 0.2)"
            },
          ],
        });
      }
    }
  }, [selectedName, transactions, customers]);

  const handleSelectOptions = (e) => {
    setSelectedName(e.target.value);
  };

  return (
    <>
      <select className="form-select w-50 m-auto mt-5" name="customers" onChange={handleSelectOptions}>
        <option value="">Please Select a customer</option>
        {customers?.map((customer) => (
          <option key={customer.id} value={customer.name}>
            {customer.name}
          </option>
        ))}
      </select>
      <div className="chart-container">
        <Line className="chart" data={chartData}></Line>
      </div>
    </>
  );
};

export default Chart;
