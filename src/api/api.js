import { callApi } from "../config/configApi";

export const clientApi = {
    // Api Product
    productShow() {
        return callApi("http://localhost:8000/api/product/index");
    },
    productShowById(id) {
        return callApi(`http://localhost:8000/api/product/show/${id}`);
    },
    productShowByCategoryId(id) {
        return callApi(`http://localhost:8000/api/product/show/category/${id}`);
    },
    productEdit(id, data) {
        return callApi(
            `http://localhost:8000/api/product/update/${id}`,
            "POST",
            data
        );
    },
    productAdd(data) {
        return callApi("http://localhost:8000/api/product/store", "POST", data);
    },
    productDelete(id) {
        return callApi(
            `http://localhost:8000/api/product/delete/${id}`,
            "DELETE"
        );
    },
    productPagination(page, limit) {
        return callApi(`http://localhost:8000/api/product/paginate/${limit}?page=${page}`)
    },
    productPaginationByCategoryId(id, page, limit) {
        return callApi(`http://localhost:8000/api/product/category/${id}/paginate-${limit}?page=${page}`)
    },

    // End Api Product

    // Api Category
    categoryShow() {
        return callApi("http://localhost:8000/api/category/index");
    },
    categoryShowById(id) {
        return callApi(`http://localhost:8000/api/category/show/${id}`);
    },
    categoryEdit(id, data) {
        return callApi(
            `http://localhost:8000/api/category/update/${id}`,
            "POST",
            data
        );
    },
    categoryAdd(data) {
        return callApi(
            "http://localhost:8000/api/category/store",
            "POST",
            data
        );
    },
    categoryDelete(id) {
        return callApi(
            `http://localhost:8000/api/category/delete/${id}`,
            "DELETE"
        );
    },

    // End Api Category

    // Api Blog
    blogShow() {
        return callApi("http://localhost:8000/api/blog/index");
    },
    blogShowById(id) {
        return callApi(`http://localhost:8000/api/blog/show/${id}`);
    },
    blogShowByListBlogId(id) {
        return callApi(`http://localhost:8000/api/blog/show/listblog/${id}`);
    },
    blogEdit(id, data) {
        return callApi(
            `http://localhost:8000/api/blog/update/${id}`,
            "POST",
            data
        );
    },
    blogDisplay(id, display) {
        return callApi(
            `http://localhost:8000/api/blog/updateDisplay/${id}`,
            "POST",
            display
        );
    },
    blogAdd(data) {
        return callApi("http://localhost:8000/api/blog/store", "POST", data);
    },
    blogDelete(id) {
        return callApi(`http://localhost:8000/api/blog/delete/${id}`, "DELETE");
    },
    blogPagination(page, limit) {
        return callApi(`http://localhost:8000/api/blog/paginate/limit-${limit}?page=${page}`)
    },

    // End Api Blog

    // Api List Blog

    listBlogShow() {
        return callApi("http://localhost:8000/api/listblog/index");
    },
    listBlogShowById(id) {
        return callApi(`http://localhost:8000/api/listblog/show/${id}`);
    },
    listBlogEdit(id, data) {
        return callApi(
            `http://localhost:8000/api/listblog/update/${id}`,
            "POST",
            data
        );
    },
    listBlogDelete(id) {
        return callApi(
            `http://localhost:8000/api/listblog/delete/${id}`,
            "DELETE"
        );
    },

    // End Api List Blog

    // Api Menu

    menuShow() {
        return callApi("http://localhost:8000/api/menu/index");
    },
    menuShowId(id) {
        return callApi(`http://localhost:8000/api/menu/show/${id}`);
    },
    menuEdit(id, data) {
        return callApi(
            `http://localhost:8000/api/menu/update/${id}`,
            "POST",
            data
        );
    },
    menuShowAdd(data) {
        return callApi(`http://localhost:8000/api/menu/store`, data);
    },
    menuShowDelete(id) {
        return callApi(`http://localhost:8000/api/menu/delete/${id}`, "DELETE");
    },

    // End Api Menu

    // Api Message

    // Api Message

    messageShow() {
        return callApi(`http://localhost:8000/api/client-message`);
    },
    messageShowById(id) {
        return callApi(`http://localhost:8000/api/client-message/${id}`);
    },
    messageUpdateStatus(id, status) {
        return callApi(
            `http://localhost:8000/api/client-message/update/${id}`,
            "POST",
            status
        );
    },

    // End Api Message
};
