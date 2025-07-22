import styled from "styled-components";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
`;

const FormBox = styled.div`
  width: 100%;
  max-width: 600px;
  background: #ffffff;
  padding: 40px 60px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h1`
  margin: 20px 0px;
  text-align: center;
  color: #5c5c5c;
  font-size: 32px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 30px;
`;

const Input = styled.input`
  height: 72px;
  width: 100%;
  box-sizing: border-box;
  padding-left: 20px;
  border: 1px solid #c9c9c9;
  outline: none;
  color: #5c5c5c;
  font-size: 18px;
  border-radius: 8px;
  background-color: #ffffff;

  &:focus {
    border-color: #019196;
    background-color: #f9f9f9;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

const SubmitButton = styled.button`
    
  width: 100%;
  height: 72px;
  color: white;
  background: #019196;
  border: none;
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #017c81;
  }
`;

const Agreement = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;
  gap: 20px;
  color: #5c5c5c;
  font-size: 18px;
  font-weight: 500;
`;

const LoginText = styled.div`
  margin-top: 20px;
  color: #5c5c5c;
  font-size: 18px;
  font-weight: 500;
  text-align: center;

  span {
    color: #019196;
    font-weight: 600;
    cursor: pointer;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 16px;
  text-align: center;
  margin-top: -10px;
`;

export {
  PageWrapper,
  FormBox,
  Title,
  Form,
  Input,
  PasswordWrapper,
  ToggleButton,
  SubmitButton,
  Agreement,
  LoginText,
  ErrorText
};
