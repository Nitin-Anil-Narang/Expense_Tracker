import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  color: white;
`;

const ExpenseCard = styled.div`
  background: #123c44;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const Label = styled.div`
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  margin-right: 1rem;
`;

const Button = styled.button`
  background-color: #0b8a8f;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export {
    Container,Content,ExpenseCard,Label,Select,Button
}