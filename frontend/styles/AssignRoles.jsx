import styled from "styled-components";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Main = styled.div`
  flex-grow: 1;
  padding: 2rem;
  color: #f0f9ff;
`;

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  color: #f0f9ff;
`;

const Heading = styled.h2`
  font-size: 2rem;
  text-align: center;
  color: #ffffff;
  margin-bottom: 1.5rem;
`;

const TableWrapper = styled.div`
  background-color: #0d3c44;
  border-radius: 8px;
  overflow-x: auto;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 1rem;
  text-align: ${({ center }) => (center ? "center" : "left")};
  font-size: 0.9rem;
  text-transform: uppercase;
  background-color: #0a2f35;
  color: #e6f5f8;
`;

const Td = styled.td`
  padding: 0.9rem;
  text-align: ${({ center }) => (center ? "center" : "left")};
  color: #e6f5f8;
`;

const Select = styled.select`
  background-color: #14454f;
  color: #e0f4f6;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #1f5d66;
  font-size: 0.9rem;
`;

const Button = styled.button`
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  margin: 0 0.2rem;
  transition: 0.2s ease-in-out;
  background-color: ${({ delete: isDelete, save, active }) =>
    isDelete ? "#c0392b" :
    save && active ? "#27ae60" :
    "#7f8c8d"};
  color: white;
  cursor: ${({ active }) => (active ? "pointer" : "not-allowed")};
  opacity: ${({ active }) => (active === false ? 0.6 : 1)};

  &:hover {
    background-color: ${({ delete: isDelete, save, active }) =>
      isDelete ? "#e74c3c" :
      save && active ? "#2ecc71" :
      "#95a5a6"};
  }
`;

const Message = styled.p`
  text-align: center;
  margin-top: 2rem;
  font-size: 1.1rem;
  color: #ddd;
`;

export {
    Container,Main,Wrapper,Heading,TableWrapper,StyledTable,Th,Td,Select,Button,Message
}