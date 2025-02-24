import React from "react";
import { Card } from "@/components/ui/card";

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps = {}) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Agora Win Admin</h1>
          <p className="text-sm text-gray-500 mt-2">
            Loyalty Program Management
          </p>
        </div>
        {children}
      </Card>
    </div>
  );
};

export default AuthLayout;
