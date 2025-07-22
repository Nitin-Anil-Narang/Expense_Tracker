import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom"
import axiosApi from "../../config/axiosApi";

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
  ErrorText
} from '../../styles/Signup';



export default function SignUpForm() {


  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters, include uppercase, lowercase, and a number.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    


    try {

      const Signup_request = await axiosApi.post('/sign-up', formData)
      navigate("/");
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.response?.data?.message || "Signup failed");
    }


  };

  return (
    <PageWrapper>
      <FormBox>
        <Title>Create Your Account</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          {/* Password Field */}
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

          {/* Confirm Password Field */}
          <PasswordWrapper>
            <Input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
            <ToggleButton
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </ToggleButton>
          </PasswordWrapper>

          {error && <ErrorText>{error}</ErrorText>}

          <Agreement>
            <input type="checkbox" required />
            <span>I agree to the terms and conditions</span>
          </Agreement>

          <SubmitButton type="submit">Register</SubmitButton>

          <LoginText>
            Already have an account?{" "}
            <span onClick={() => navigate("/")} style={{ color: "#019196", cursor: "pointer" }}>
              Login here
            </span>
          </LoginText>
        </Form>
      </FormBox>
    </PageWrapper>
  );
}
