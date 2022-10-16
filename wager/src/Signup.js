import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  FloatingLabel,
  Button,
  Form,
} from "react-bootstrap";
//import { useSignup } from "./hooks/useSignup";
const Signup = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (firstname, lastname, email, password, institution) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname,
        lastname,
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
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //update the auth context
      //dispatch({ type: "LOGIN", payload: json });

      // update loading,error, success state
      setIsLoading(false);
      setError(false);
      setSuccess(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    signup(firstname, lastname, email, password);
    success && navigate("/Dashboard");
  };
  return (
    <Container style={{ maxWidth: 800 }} className="mt-5">
      <h2 className="text-center display-4 fw-bold pb-3">Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mt-3">
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="First Name"
              className="text-secondary"
            >
              <Form.Control
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="Last Name"
              className="text-secondary"
            >
              <Form.Control
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <FloatingLabel
          controlId="floatingInput"
          label="Email Address"
          className="mt-4 text-secondary"
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
          className="mt-4 w-100 btn-success"
          type="submit"
        >
          Sign Up
        </Button>
      </Form>
      <p class="text-center text-muted pt-3">
        Already have an account?{" "}
        <Link to="/login" className="text-decoration-none text-success">
          Sign In
        </Link>
      </p>
      {error && <div className="text-center text-danger ">{error}</div>}
    </Container>
  );
};

export default Signup;
