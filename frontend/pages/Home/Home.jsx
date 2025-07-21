import React from 'react'
import { useUser } from '../../Context/UserAuth'
import Sidebar from '../../components/Sidebar';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const Content = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #f4f4f4; 
`;

const Home = () => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div>
        <h2>Loading user data...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <h2>User not logged in</h2>
      </div>
    );
  }

  return (
    <Container>
      <Sidebar />

      <Content>
        <h1>Pocketrocket Labs</h1>
        <p>Welcome to the home page!</p>
      </Content>
      
    </Container>
  );
}

export default Home;
