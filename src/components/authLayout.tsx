import React from "react";

import "@/styles/authlayout.css";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-screen w-screen">
      <img
        src="/images/authbg.png"
        alt="Background Image"
        className="background-image"
      />
      <div className="grid h-screen grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <img src="/images/logo.svg" className="w-40" />
        </div>
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
