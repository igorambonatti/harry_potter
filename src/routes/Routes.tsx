import React from "react";
import { Route, Routes } from "react-router-dom";
import { CharacterDetails } from "../pages/CharacterDetails";
import { Characters } from "../pages/Characters";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Characters />} />
      <Route path="/characters/:id" element={<CharacterDetails />} />
    </Routes>
  );
};

export default AppRoutes;
