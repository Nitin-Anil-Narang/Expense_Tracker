import React from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import axiosApi from '../../config/axiosApi'; 

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ReportButton = styled.button`
  background-color: #0d3c44;
  color: white;
  font-size: 1.5rem;
  padding: 20px 40px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #11525c;
  }
`;

const ReportCSV = () => {
  const downloadCSV = async (table) => {
    try {
      const response = await axiosApi.get(`/${table}-csv`, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${table}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error(`Error downloading ${table} CSV:`, err);
    }
  };

  return (
    <PageWrapper>
      <Sidebar />
      <ContentWrapper>
        <ButtonContainer>
          <ReportButton onClick={() => downloadCSV('log')}>
            Download Logs Report
          </ReportButton>
          <ReportButton onClick={() => downloadCSV('expense')}>
            Download Expense Report
          </ReportButton>
        </ButtonContainer>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default ReportCSV;
