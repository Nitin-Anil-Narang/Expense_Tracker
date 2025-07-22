import React, { useState,useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../config/axiosApi";
import { useUser } from "../../Context/UserAuth";
import {
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
  ErrorText,
} from "../../styles/Signup"; 

export default function LoginForm() {
  const { login, user, loading } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must contain uppercase, lowercase, number, and 8+ characters.");
      return;
    }

   
    
    try {
      
      const Login_request = await axiosApi.post('/login',formData)
      
      login(Login_request.data.token)
      navigate('/home')
      
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.response?.data?.message || "Login Failed");
    }
    
  };

  if (loading) {
    return (
      <PageWrapper>
        <FormBox>
          <Title>Loading...</Title>
        </FormBox>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <FormBox>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          <PasswordWrapper>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <ToggleButton
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </ToggleButton>
          </PasswordWrapper>

          {error && <ErrorText>{error}</ErrorText>}

          <SubmitButton type="submit">Login</SubmitButton>

          <LoginText>
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              style={{ color: "#019196", cursor: "pointer" }}
            >
              Sign up here
            </span>
          </LoginText>
        </Form>
      </FormBox>
    </PageWrapper>
  );
}
