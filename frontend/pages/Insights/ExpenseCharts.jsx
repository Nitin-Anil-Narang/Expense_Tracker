import React, { useEffect, useState } from "react";
import axiosApi from "../../config/axiosApi";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "../../components/Sidebar"; 
import styled from "styled-components";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 24px;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 24px;
  color: #1f2937;
`;

const ChartsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const ChartTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 12px;
`;

const ChartContainer = styled.div`
  height: 400px;
`;

const ExpenseChart = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axiosApi.get("/all-expense");
        setExpenses(res.data.data);
      } catch (err) {
        console.error("Error fetching expenses", err);
      }
    };

    fetchExpenses();
  }, []);

  const categoryTotals = {};
  expenses.forEach((exp) => {
    const cat = exp.category;
    const amt = parseFloat(exp.amount);
    categoryTotals[cat] = (categoryTotals[cat] || 0) + amt;
  });

  const categoryChartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Total by Category",
        data: Object.values(categoryTotals),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const monthlyTotals = {};
  expenses.forEach((exp) => {
    const month = new Date(exp.date).toLocaleString("default", {
      year: "numeric",
      month: "short",
    });
    const amt = parseFloat(exp.amount);
    monthlyTotals[month] = (monthlyTotals[month] || 0) + amt;
  });

  const sortedMonths = Object.keys(monthlyTotals).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const monthlyChartData = {
    labels: sortedMonths,
    datasets: [
      {
        label: "Monthly Expenses",
        data: sortedMonths.map((m) => monthlyTotals[m]),
        borderColor: "#4bc0c0",
        backgroundColor: "#4bc0c0",
        tension: 0.3,
        fill: false,
      },
    ],
  };

  return (
    <Layout>
      <Sidebar />
      <ContentWrapper>
        <Heading>All Expenses Overview</Heading>
        <ChartsGrid>
          <ChartCard>
            <ChartTitle>Expenses by Category</ChartTitle>
            <ChartContainer>
              <Bar data={categoryChartData} options={{ maintainAspectRatio: false }} />
            </ChartContainer>
          </ChartCard>
          <ChartCard>
            <ChartTitle>Monthly Expense Trend</ChartTitle>
            <ChartContainer>
              <Line data={monthlyChartData} options={{ maintainAspectRatio: false }} />
            </ChartContainer>
          </ChartCard>
        </ChartsGrid>
      </ContentWrapper>
    </Layout>
  );
};

export default ExpenseChart;
