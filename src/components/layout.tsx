import React from "react";
import { Link, useLocation } from "react-router-dom";

import Navbar from "./Navbar";

import "@/styles/layout.css";

import Tab from "./Tab";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <Navbar />
      <Tab />

      <div className="flex-1 overflow-y-scroll">{children}</div>
    </div>
  );
};

export default RootLayout;
