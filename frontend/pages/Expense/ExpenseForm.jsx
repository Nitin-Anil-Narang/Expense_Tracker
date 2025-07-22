import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { logAppEvent } from '../../service/logService';
import { useUser } from '../../Context/UserAuth';
import {
  PageWrapper,
  Container,
  Form,
  Title,
  Label,
  NotesInput,
  Input,
  Select,
  Button,
  SuccessBox,
  ExpenseCard,
  ExpenseLabel,
  ExpenseListContainer,
  ExpenseValue,
  SectionTitle
} from '../../styles/ExpenseForm';
import axiosApi from '../../config/axiosApi';

const ExpenseForm = () => {
  const { user } = useUser();
  const [form, setForm] = useState({
    notes: '',
    category: '',
    amount: '',
    date: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [pastExpenses, setPastExpenses] = useState([]);


  useEffect(() => {
    const fetchExpenses = async () => {
      try {

        const allExpense = await axiosApi.get('/all-expense');


        setPastExpenses(allExpense.data.data);

      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExpense = {
      ...form,
      amount: Number(form.amount),
    };

    try {



      const createExp = await axiosApi.post('/expense-create', newExpense)


      logAppEvent({
        event: 'EXPENSE_CREATED"',
        actor_id: user.id,
        actor_role: user.role,
        target_table: 'Expense',
        target_id: createExp.data.data.expense_id,
        action_result: "Expense Created Successful",
        description: `${user.names} Created Expense and the id for expense is ${createExp.data.data.expense_id}`
      });




      if (createExp.status === 201) {
        setSubmitted(true);
        const created = createExp.data.data;
        setPastExpenses((prev) => [created, ...prev]);
      } else {
        console.error("Failed to submit expense");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleNewExpense = () => {
    setForm({ notes: '', category: '', amount: '', date: '' });
    setSubmitted(false);
  };

  return (
    <PageWrapper>
      <Sidebar />
      <Container>
        {!submitted ? (
          <Form onSubmit={handleSubmit}>
            <Title>Create Expense</Title>

            <Label htmlFor="notes">Notes (max 128 chars)</Label>
            <NotesInput
              name="notes"
              maxLength="128"
              value={form.notes}
              onChange={handleChange}
              required
            />

            <Label htmlFor="category">Category</Label>
            <Select
              id='category'
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Category --</option>
              <option value="Travel">Travel</option>
              <option value="Supplies">Supplies</option>
              <option value="Food">Food</option>
              <option value="Client">Client</option>
              <option value="Misc">Misc</option>
            </Select>

            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
            />

            <Label htmlFor="date">Date of Expense</Label>
            <Input
              id="date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />

            <Button type="submit">Submit Expense</Button>
          </Form>
        ) : (
          <SuccessBox>
            <h2>Expense Submitted!</h2>
            <Button onClick={handleNewExpense} style={{ marginTop: '1rem' }}>
              Add Another Expense
            </Button>
          </SuccessBox>
        )}

        {pastExpenses.length > 0 && (
          <>
            <SectionTitle>Past Expenses</SectionTitle>
            <ExpenseListContainer style={{ maxHeight: '450px', overflowY: 'auto' }}>
              {pastExpenses.map((expense) => {
                const formattedDate = new Date(expense.date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });

                return (
                  <ExpenseCard key={expense.expense_id}>
                    <ExpenseLabel>
                      <strong>Note:</strong>
                      <ExpenseValue>
                        {expense.notes.length > 40
                          ? `${expense.notes.slice(0, 40)}...`
                          : expense.notes}
                      </ExpenseValue>
                    </ExpenseLabel>

                    <ExpenseLabel>
                      <strong>Category:</strong>
                      <ExpenseValue>{expense.category}</ExpenseValue>
                    </ExpenseLabel>

                    <ExpenseLabel>
                      <strong>Amount:</strong>
                      <ExpenseValue>₹{Number(expense.amount).toFixed(2)}</ExpenseValue>
                    </ExpenseLabel>

                    <ExpenseLabel>
                      <strong>Status:</strong>
                      <ExpenseValue>{expense.status}</ExpenseValue>
                    </ExpenseLabel>

                    <ExpenseLabel>
                      <strong>Date:</strong>
                      <ExpenseValue>{formattedDate}</ExpenseValue>
                    </ExpenseLabel>
                  </ExpenseCard>
                );
              })}
            </ExpenseListContainer>
          </>
        )}

      </Container>
    </PageWrapper>
  );
};

export default ExpenseForm;
