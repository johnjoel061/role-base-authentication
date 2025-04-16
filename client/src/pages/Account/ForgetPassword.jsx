import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png"; // Adjust path as needed
import BackgroundWrapper from "../Account/BackgroundWrapper"; // Adjust path as needed
import UserRequest from "../../APIRequest/UserRequest";

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),
});

const ForgetPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: async (values) => {
      const res = await UserRequest.SendRecoveryOtp(values.email);
      if (res) {
        navigate("/account/verify-otp");
      }
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
                {/* Logo Section */}
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

                {/* Header */}
                <h4 className="text-center mb-3">Forgot Password</h4>
                <p className="text-center text-muted mb-4">
                  Enter your email address to receive a recovery OTP.
                </p>

                {/* Form */}
                <Form onSubmit={formik.handleSubmit}>
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

                  <div className="d-grid mb-3">
                    <Button type="submit" variant="primary">
                      Send OTP
                    </Button>
                  </div>
                </Form>

                {/* Bottom Link */}
                <div className="text-center text-muted small">
                  Remember your password?{" "}
                  <a href="/account/login" className="text-primary text-decoration-none">
                    Sign In
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

export default ForgetPassword;
