import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClientRoutes } from "./Router/Router";
import ClientLayout from "./Layout/ClientLayout";
import SignUp from "./Container/Auth/SignUp";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import Login from "./Container/Auth/SignIn";
function App() {
    // const user = useSelector((state) => state.auth.login?.currentUser);
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (!user) {
    //         navigate("/signin");
    //     }
    // }, []);
    const renderLayout = (routes) => {
        return routes?.map((route) => {
            const { path, element, index } = route;
            return (
                <Route
                    key={index}
                    element={element}
                    path={path}
                    index={index}
                />
            );
        });
    };
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<ClientLayout />}>
                        {renderLayout(ClientRoutes)}
                    </Route>
                    <Route path="/signin" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                        path="*"
                        element={
                            <img
                                src="https://www.totolink.vn/public/uploads/img_post/truy-tim-nguyen-nhan-va-cach-sua-chua-loi-tra-cuu-404-not-found-1.jpg"
                                className="dt:w-[100vw] dt:h-[100vh]"
                            />
                        }
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
