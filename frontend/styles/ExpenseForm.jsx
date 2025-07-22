import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  
`;

const Container = styled.div`
  flex: 1;
  padding: 2rem;
  color: white;
`;

const Form = styled.form`
  background-color: #112e34;
  padding: 2rem;
  border-radius: 12px;
  max-width: 600px;
  margin: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const NotesInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  border: none;
  resize: vertical;
  background-color: #1b4d57;
  color: white;

  &:focus {
    outline: 2px solid #1fa2af;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  border: none;
  background-color: #1b4d57;
  color: white;

  &:focus {
    outline: 2px solid #1fa2af;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  border: none;
  background-color: #1b4d57;
  color: white;

  &:focus {
    outline: 2px solid #1fa2af;
  }
`;

const Button = styled.button`
  background-color: #1fa2af;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #13868f;
  }
`;

const SuccessBox = styled.div`
  text-align: center;
  background-color: #1b4d57;
  padding: 2rem;
  border-radius: 12px;
  margin-top: 3rem;
`;

const ExpenseCard = styled.div`
  background-color: #143f47;
  padding: 1.25rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ExpenseLabel = styled.div`
  flex: 1;
  min-width: 120px;
  font-size: 0.95rem;
`;

const ExpenseValue = styled.div`
  font-weight: bold;
  color: #ffffffcc;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  margin: 2rem 0 1rem;
  border-bottom: 1px solid #1fa2af;
  padding-bottom: 0.5rem;
  color:#000000
`;

const ExpenseListContainer = styled.div`
  max-height: 480px;
  overflow-y: auto;
  margin-top: 1rem;
  padding-right: 8px;

  /* Scrollbar style for better UX */
  scrollbar-width: thin;
  scrollbar-color: #1fa2af #0d3c44;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #0d3c44;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #1fa2af;
    border-radius: 6px;
  }
`;

export {
    PageWrapper,Container,Form,Title,Label,NotesInput,Input,Select,Button,SuccessBox,ExpenseCard,ExpenseLabel,ExpenseListContainer,ExpenseValue,SectionTitle
}