import React from "react";
import AuthLayout from "./auth/AuthLayout";
import LoginForm from "./auth/LoginForm";

const Home = () => {
  const handleLogin = (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    // Handle login logic here
    console.log("Login attempt:", data);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AuthLayout>
        <LoginForm onSubmit={handleLogin} />
      </AuthLayout>
    </div>
  );
};

export default Home;
