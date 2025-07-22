import React, { useEffect, useState } from "react";
import axiosApi from "../../config/axiosApi";
import Sidebar from "../../components/Sidebar";
import { logAppEvent } from "../../service/logService";
import { useUser } from "../../Context/UserAuth";
import { 
    Container,
    Content,
    ExpenseCard,
    Label,
    Select,
    Button
} from "../../styles/AdminExpense"


 

const AdminExpenses = () => {
  const {user} = useUser();
  const [expenses, setExpenses] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axiosApi.get("/all-expense");
        setExpenses(res.data.data);
        const defaultStatuses = {};
        res.data.data.forEach((e) => {
          defaultStatuses[e.expense_id] = e.status;
        });
        setStatusMap(defaultStatuses);
      } catch (err) {
        console.error("Failed to fetch expenses", err);
      }
    };

    fetchExpenses();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setStatusMap((prev) => ({ ...prev, [id]: newStatus }));
  };

  const updateStatus = async (expenseId) => {
    const status = statusMap[expenseId];
    try {
      await axiosApi.put(`/expense/${expenseId}/status`, { status });

      logAppEvent({
                event: 'EXPENSE_UPDATE',
                actor_id: user.id,
                actor_role: user.role,
                target_table: 'Expense',
                target_id: expenseId,
                action_result: "Expense Created Successful",
                description: `${user.names} Expense updated and the id for expense is ${expenseId} and the new status ${status}`
            });

      alert("Status updated!");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update status");
    }
  };

  const formatDateToUTC = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <Container>
      <Sidebar /> 
      <Content>
        <h2>Admin Expense Dashboard</h2>
        {expenses.map((expense) => (
          <ExpenseCard key={expense.expense_id}>
            <Label><strong>Note:</strong> {expense.notes}</Label>
            <Label><strong>Category:</strong> {expense.category}</Label>
            <Label><strong>Amount:</strong> ₹{expense.amount}</Label>
            <Label><strong>Date:</strong> {formatDateToUTC(expense.date)}</Label>
            <Label><strong>Status:</strong></Label>
            <Select
              value={statusMap[expense.expense_id]}
              onChange={(e) => handleStatusChange(expense.expense_id, e.target.value)}
            >
              <option value="under review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </Select>
            <Button onClick={() => updateStatus(expense.expense_id)}>Update</Button>
          </ExpenseCard>
        ))}
      </Content>
    </Container>
  );
};

export default AdminExpenses;
