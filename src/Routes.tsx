import React from "react";
import { Route, Routes } from "react-router-dom";

import RootLayout from "@/components/layout/root";
import { MainPage } from "@/views";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
