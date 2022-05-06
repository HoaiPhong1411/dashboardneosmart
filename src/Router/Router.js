import ClientAddBlog from "../Container/Client/ClientBlogs/ClientAddBlog/ClientAddBlog";
import ClientAddProduct from "../Container/Client/ClientProducts/ClientAddProduct/ClientAddProduct";
import ClientBlog from "../Container/Client/ClientBlogs/ClientBlog/ClientBlog";
import ClientEditBlog from "../Container/Client/ClientBlogs/ClientEditBlog/ClientEditBlog";
import ClientEditProduct from "../Container/Client/ClientProducts/ClientEditProduct/ClientEditProduct";
import ClientHome from "../Container/Client/ClientHome/ClientHome";
import ClientProduct from "../Container/Client/ClientProducts/ClientProduct/ClientProduct";
import ClientCategory from "../Container/Client/ClientProducts/ClientCategory/ClientCategory";
import ClientUser from "../Container/Client/ClientUser/ClientUser";
import ClientMenu from "../Container/Client/ClientMenu/ClientMenu";
import ClientAddMenu from "../Container/Client/ClientMenu/ClientAddMenu";
import ClientBlogList from "../Container/Client/ClientBlogs/ClientBlogList/ClientBlogList";
import ClientMail from "../Container/Client/ClientMail/ClientMail";
import ClientShowCategory from "../Container/Client/ClientCategorys/ClientShowCategory/ClientShowCategory";
import ClientAddCategory from "../Container/Client/ClientCategorys/ClientAddCategory/ClientAddCategory";
import ClientEditCategory from "../Container/Client/ClientCategorys/ClientEditCategory/ClientEditCategory";

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
        element: <ClientCategory />,
        path: "/category/:id",
    },
    {
        index: true,
        element: <ClientShowCategory />,
        path: "/category",
    },
    {
        index: true,
        element: <ClientAddCategory />,
        path: "/category/add",
    },
    {
        index: true,
        element: <ClientEditCategory />,
        path: "/category/edit/:id",
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
        path: "/bloglist/:id",
    },
    {
        index: true,
        element: <ClientUser />,
        path: "/user",
    },
    {
        index: true,
        element: <ClientMenu />,
        path: "/menu",
    },
    
    {
        index: true,
        element: <ClientMail />,
        path: "/mail",
    },
];
