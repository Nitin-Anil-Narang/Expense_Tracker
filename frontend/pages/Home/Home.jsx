import React from 'react'
import { useUser } from '../../Context/UserAuth'
import Sidebar from '../../components/Sidebar';
import {Container,Content} from '../../styles/Home'



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
        
        <h1>Welcome to the home page!</h1>
      </Content>
      
    </Container>
  );
}

export default Home;
