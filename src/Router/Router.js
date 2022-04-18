import ClientAddProduct from "../Container/Client/ClientAddProduct/ClientAddProduct"
import ClientCategory from "../Container/Client/ClientCategory/ClientCategory"
import ClientEditProduct from "../Container/Client/ClientEditProduct/ClientEditProduct"
import ClientHome from "../Container/Client/ClientHome/ClientHome"
import ClientProduct from "../Container/Client/ClientProduct/ClientProduct"

export const ClientRoutes = [
    {
        index: true,
        element: <ClientHome />,
        path: "/",
    },
    {
        index: true,
        element: <ClientProduct />,
        path: '/product'
    },
    {
        index:true,
        element: <ClientEditProduct />,
        path: '/product/edit'
    },
    {
        index:true,
        element: <ClientAddProduct />,
        path: '/product/add'
    },
    {
        index:true,
        element: <ClientCategory />,
        path: '/category'
    },
]
