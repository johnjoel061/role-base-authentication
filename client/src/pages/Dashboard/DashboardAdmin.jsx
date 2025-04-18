import React from "react";
import { Card, Typography, Avatar, Spin } from "antd";
import { Box } from "@mui/material";
import {
  UserOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

import { useAuth } from "../../contexts/AuthContext";

const { Title, Text } = Typography;

const DashboardAdmin = () => {
  const { userData } = useAuth();

  if (!userData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Spin size="large" />
      </Box>
    );
  }

  const { firstName, middleName, lastName, email, profile, role } = userData;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      minHeight="80vh"
      bgcolor="#f0f2f5"
      p={2}
      mt={4} // Adds top margin
    >
      <Card
        style={{
          width: 400,
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          paddingTop: 24,
        }}
      >
        <Avatar
          size={100}
          src={profile || null}
          icon={!profile && <UserOutlined />}
          style={{ marginBottom: 16 }}
        />
        <Title level={3}>
          {firstName} {middleName || ""} {lastName}
        </Title>
        <Text type="secondary">
          <MailOutlined /> {email}
        </Text>
        <br />
        <Text type="secondary">
          <SafetyCertificateOutlined /> Role: {role}
        </Text>
      </Card>
    </Box>
  );
};

export default DashboardAdmin;
