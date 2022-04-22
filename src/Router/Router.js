import ClientAddBlog from "../Container/Client/ClientAddBlog/ClientAddBlog";
import ClientAddProduct from "../Container/Client/ClientAddProduct/ClientAddProduct";
import ClientBlog from "../Container/Client/ClientBlog/ClientBlog";
import ClientEditBlog from "../Container/Client/ClientEditBlog/ClientEditBlog";
import ClientEditProduct from "../Container/Client/ClientEditProduct/ClientEditProduct";
import ClientHome from "../Container/Client/ClientHome/ClientHome";
import ClientProduct from "../Container/Client/ClientProduct/ClientProduct";
import ClientCategory from "../Container/Client/ClientCategory/ClientCategory"
import ClientBlogList from "../Container/Client/ClientBlogList/ClientBlogList";
import ClientMail from "../Container/Client/ClientMail/ClientMail";

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
    {
        index: true,
        element: <ClientEditProduct />,
        path: "/product/edit",
    },
    {
        index: true,
        element: <ClientAddProduct />,
        path: "/product/add",
    },
    {
        index: true,
        element: <ClientCategory/>,
        path: "/category",
    },
    {
        index: true,
        element: <ClientBlog />,
        path: "/blog",
    },
    {
        index: true,
        element: <ClientAddBlog />,
        path: "/blog/add",
    },
    {
        index: true,
        element: <ClientEditBlog />,
        path: "/blog/edit",
    },
    {
        index: true,
        element: <ClientBlogList />,
        path: "/bloglist",
    },
    {
        index: true,
        element: <ClientMail />,
        path: "/mail",
    },
];
