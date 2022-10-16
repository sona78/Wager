import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, FloatingLabel, Button, Form } from "react-bootstrap";
//import { useLogin } from "./hooks/useLogin";
const Login = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (email, password) => {
    const response = await fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
      setError(false);
      setSuccess(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    login(email, password);
    success && navigate("/Dashboard");
  };
  return (
    <Container style={{ maxWidth: 800 }} className="mt-5">
      <h2 className="text-center display-4 fw-bold pb-2">Sign In</h2>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel
          controlId="floatingInput"
          label="Email Address"
          className="mt-3 text-secondary"
        >
          <Form.Control
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Password"
          className="mt-4 text-secondary"
        >
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FloatingLabel>
        <Button
          disabled={isLoading}
          size="lg"
          className="mt-2 w-100 btn-success"
          type="submit"
        >
          Sign In
        </Button>
      </Form>
      <p className="text-center text-muted pt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-decoration-none text-success">
          Create an Account
        </Link>
      </p>
      {error && <div className="text-center text-danger ">{error}</div>}
    </Container>
  );
};

export default Login;
