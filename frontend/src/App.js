//import logo from './logo.svg';
//import './App.css';
import React from "react";
import { useRoutes } from "hookrouter";
import LandingPage from "./components/LandingPage";
import LoginForm from "./components/LoginForm";

const routes = {
  "/": () => <LandingPage />,
  "/login": () => <LoginForm />
};


const App = () => {
  const pages = useRoutes(routes);
  return (
    <div className="container">
      {pages}
      {!pages && (
        <div className="flex justify-center py-16">
          Error 404: Page not found
        </div>
      )}
    </div>
  );
};

export default App;
