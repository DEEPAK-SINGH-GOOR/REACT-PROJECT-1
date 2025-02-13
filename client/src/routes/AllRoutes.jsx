import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Assign from "../pages/Assign";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Private from "./Private";
import PageNotFound from "../pages/PageNotFound";
import Ability from "../role/Ability";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={
            <Private>
              <Home />
            </Private>
          }
        />
        {Ability(["admin"]) && (
          <Route path="/assign" element={
              <Private>
                <Assign />
              </Private>
            }
          />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
