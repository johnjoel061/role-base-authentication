import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../../assets/images/logo.png";
import BackgroundWrapper from "../Account/BackgroundWrapper";
import { Link, useNavigate } from "react-router-dom";
import AuthRequest from "../../APIRequest/AuthRequest";

// Validation schema
const validationSchema = Yup.object().shape({
  Email: Yup.string().email("Invalid email").required("Please enter your email"),
  Password: Yup.string().required("Please enter your password"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { Email: "", Password: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await AuthRequest.LoginUser(values);
        if (!result) {
          setError("Invalid credentials or server error.");
        } else {
          // Store user data in localStorage
          localStorage.setItem('user_data', JSON.stringify(result.data));

          // Redirect to the dashboard after login
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Error during login:", err);
        setError("An error occurred during login.");
      }
    },
  });

  return (
    <BackgroundWrapper>
      <Container fluid className="min-vh-100 d-flex justify-content-center align-items-center px-3">
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={10} md={8} lg={5}>
            <Card className="shadow">
              <Card.Body className="p-4">
                {/* Logo */}
                <div
                  className="d-flex justify-content-center align-items-center mb-4 mx-auto"
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderRadius: "10px",
                    padding: "15px",
                    width: "fit-content",
                  }}
                >
                  <img
                    src={Logo}
                    alt="Logo"
                    className="img-fluid"
                    style={{ maxWidth: "120px" }}
                  />
                </div>

                <h4 className="text-center mb-3">Sign In</h4>
                <p className="text-center text-muted mb-4">
                  Enter your email and password to access the admin panel.
                </p>

                {error && <div className="alert alert-danger">{error}</div>}

                <Form onSubmit={formik.handleSubmit}>
                  {/* Email */}
                  <Form.Group className="mb-3" controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      {...formik.getFieldProps("Email")}
                      isInvalid={formik.touched.Email && formik.errors.Email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.Email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-3" controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...formik.getFieldProps("Password")}
                        isInvalid={formik.touched.Password && formik.errors.Password}
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                        className="rounded-end"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.Password}
                      </Form.Control.Feedback>
                    </InputGroup>
                    <div className="text-end mt-2">
                      <Link
                        to="/account/forget-password"
                        className="text-decoration-none text-primary small"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </Form.Group>

                  <div className="d-grid mb-3">
                    <Button variant="primary" type="submit">
                      Log In
                    </Button>
                  </div>
                </Form>

                <div className="text-center text-muted small">
                  Don't have an account?{" "}
                  <span className="text-primary text-decoration-none" style={{ cursor: "pointer" }}>
                    Sign Up
                  </span>
                </div>
              </Card.Body>
            </Card>
            <div className="text-center mt-4 text-muted small">
              2010 - 2022 © Swon. swon.app
            </div>
          </Col>
        </Row>
      </Container>
    </BackgroundWrapper>
  );
};

export default Login;
