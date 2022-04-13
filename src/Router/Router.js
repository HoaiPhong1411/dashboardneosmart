import Signin from "../Container/Auth/SignIn";
import ClientHome from "../Container/Client/ClientHome/ClientHome";
import ClientProduct from "../Container/Client/ClientProduct/ClientProduct";

export const ClientRoutes = [
    {
        index: true,
        element: <ClientHome />,
        path: "/",
    },
    {
        index: true,
        element: <ClientProduct />,
        path: "/product",
    },
];
