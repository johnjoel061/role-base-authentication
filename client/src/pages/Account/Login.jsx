import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../../assets/images/logo.png"; // adjust path as needed
import BackgroundWrapper from "../Account/BackgroundWrapper"; // adjust path if needed

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      console.log("Logging in with:", values);
      // Handle login logic
    },
  });

  return (
    <BackgroundWrapper>
      <Container
        fluid
        className="min-vh-100 d-flex justify-content-center align-items-center px-3"
      >
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={10} md={8} lg={5}>
            <Card className="shadow">
              <Card.Body className="p-4">
                {/* Centered Logo with Background */}
                <div
                  className="d-flex justify-content-center align-items-center mb-4 mx-auto"
                  style={{
                    backgroundColor: "#f8f9fa", // light gray (or any color you prefer)
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
                <p className="text-center text-mted mb-4">
                  Enter your email and password to access the admin panel.
                </p>
                <Form onSubmit={formik.handleSubmit}>
                  {/* Email Field */}
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      {...formik.getFieldProps("email")}
                      isInvalid={formik.touched.email && formik.errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Password Field with Icons */}
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...formik.getFieldProps("password")}
                        isInvalid={
                          formik.touched.password && formik.errors.password
                        }
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
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                    <div className="text-end mt-2">
                      <a
                        href="#"
                        className="text-decoration-none text-primary small"
                      >
                        Forgot your password?
                      </a>
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
                  <a href="#" className="text-primary text-decoration-none">
                    Sign Up
                  </a>
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
