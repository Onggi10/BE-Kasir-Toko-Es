import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, CssBaseline, Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Savings from "./pages/Savings";

export interface Transaction {
  id: number;
  type: "income" | "expense";
  amount: number;
}

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(0); // ✅ Saldo utama
  const [savingsBalance, setSavingsBalance] = useState<number>(0); // ✅ Saldo tabungan

  // Hitung total pemasukan dan pengeluaran
  const totalIncome = transactions
    .filter((trx) => trx.type === "income")
    .reduce((acc, trx) => acc + trx.amount, 0);

  const totalExpenses = transactions
    .filter((trx) => trx.type === "expense")
    .reduce((acc, trx) => acc + trx.amount, 0);

  // ✅ Total saldo yang bisa digunakan
  const totalBalance = balance; // ✅ Pastikan balance digunakan agar tidak dianggap "unused"

  return (
    <Router>
      <CssBaseline />
      <Box display="flex">
        <Sidebar />
        <Container sx={{ padding: "10px" }}>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  income={totalIncome}
                  expenses={totalExpenses}
                  savings={savingsBalance} // ✅ Pakai savingsBalance, bukan savings
                  balance={balance} // ✅ Pastikan tabungan tidak dihitung ganda
                />
              }
            />
            <Route
              path="/transactions"
              element={
                <Transactions
                  transactions={transactions}
                  setTransactions={setTransactions}
                  setBalance={setBalance}
                />
              }
            />
            <Route
  path="/savings"
  element={<Savings setSavings={setSavingsBalance} balance={balance - savingsBalance} />}
/>
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}
