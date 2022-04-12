import ClientHome from "../Container/Client/ClientHome/ClientHome"
import ClientProduct from "../Container/Client/ClientProduct/ClientProduct"

export const ClientRoutes = [
    {
        index: true,
        element: <ClientHome/>
    },
    {
        index:true,
        element: <ClientProduct />,
        path: '/product'
    }
]