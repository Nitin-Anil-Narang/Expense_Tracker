import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import axiosApi from "../../config/axiosApi";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f9f9f9;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #0d3c44;
`;

const LogTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.05);
  border-radius: 8px;
  overflow: hidden;
`;

const Thead = styled.thead`
  background-color: #0d3c44;
  color: white;
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.95rem;
`;

const Td = styled.td`
  padding: 0.75rem 1rem;
  border-top: 1px solid #eee;
  font-size: 0.9rem;
  color: #333;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f0f4f5;
  }
`;

const AduitLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axiosApi.get('/all-logs')
        
        
        
        if (res.data.success === true) {
          setLogs(res.data.data);
        } else {
          console.error("Error fetching logs");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchLogs();
  }, []);
  

  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>Audit Logs</Title>
        <LogTable>
          <Thead>
            <tr>
              <Th>ID</Th>
              <Th>Event</Th>
              <Th>Actor Role</Th>
              <Th>Target Table</Th>
              <Th>Description</Th>
              <Th>Timestamp</Th>
            </tr>
          </Thead>
          <tbody>
            {logs.map((log) => (
              <Tr key={log.id}>
                <Td>{log.id}</Td>
                <Td>{log.event}</Td>
                <Td>{log.actor_role}</Td>
                <Td>{log.target_table}</Td>
                <Td>{log.description}</Td>
                <Td>{new Date(log.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</Td>
              </Tr>
            ))}
          </tbody>
        </LogTable>
      </Content>
    </Container>
  );
};

export default AduitLog;
