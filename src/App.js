import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./responsive.css";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { createContext, useEffect, useState } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import ProductUpload from "./pages/ProductUpload";
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from "./_helpers";
import { useNavigate,Navigate  } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { ProtectedRoute, LoginLessRoute } from "./pages/ProtectedRoute"; // Import the ProtectedRoute component
import { ReactNotifications } from "react-notifications-component";
import 'react-notifications-component/dist/theme.css';
const MyContext = createContext();

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isHideSidebarAndHeader, setisHideSidebarAndHeader] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    const storedLoginStatus = localStorage.getItem("isLogin");
    if (storedLoginStatus === "true") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [localStorage.getItem("isLogin")]);

  const openNav = () => {
    setIsOpenNav(true);
  };

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setisHideSidebarAndHeader,
    theme,
    setTheme,
    windowWidth,
    openNav,
    isOpenNav,
    setIsOpenNav
  };

  return (
    <>
      <ReactNotifications />
      <React.Suspense>
        <HistoryRouter history={history}>
          <MyContext.Provider value={values}>
            {isHideSidebarAndHeader !== true && isLogin && <Header />}

            <div className="main d-flex">
              {isHideSidebarAndHeader !== true && isLogin && (
                <>
                  <div className={`sidebarOverlay d-none ${isOpenNav && 'show'}`} onClick={() => setIsOpenNav(false)}></div>
                  <div
                    className={`sidebarWrapper ${isToggleSidebar ? "toggle" : ""} ${isOpenNav ? "open" : ""}`}
                  >
                    <Sidebar />
                  </div>
                </>
              )}

              <div
                className={`content ${isHideSidebarAndHeader ? "full" : ""} ${isToggleSidebar ? "toggle" : ""}`}
              >
                <Routes>
                  <Route path="/" element={<ProtectedRoute name={<Dashboard />} />} />
                  <Route path="/login" element={<LoginLessRoute name={<Login />} />} />
                  <Route path="/signUp" element={<LoginLessRoute name={<SignUp />} />} />
                  <Route path="/dashboard" element={<ProtectedRoute name={<Dashboard />} />} />
                  <Route path="/products" element={<ProtectedRoute name={<Products />} />} />
                  <Route path="/product/details" element={<ProtectedRoute name={<ProductDetails />} />} />
                  <Route path="/product/upload" element={<ProtectedRoute name={<ProductUpload />} />} />
                  <Route path="*" element={<Navigate to={isLogin ? "/dashboard" : "/login"} replace />} />
                </Routes>
              </div>
            </div>
          </MyContext.Provider>
        </HistoryRouter>

      </React.Suspense>
    </>
  );
}

export default App;
export { MyContext };
