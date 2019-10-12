import {
    API
} from "../config";
/**
 * 
 * @param {*} userId 
 * @param {*} token 
 * @param {*} category 
 * Add a new category to the backend using the fetch APIs
 */
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        })
        .then(response => {
            return response.json();
        })

        .catch(error => {
            console.log(error);
        })
};
/**
 * 
 * @param {*} userId 
 * @param {*} token 
 * @param {*} product 
 * Add a new product to the backend using the fetch APIs
 */
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: product
        })
        .then(response => {
            return response.json();
        })

        .catch(error => {
            console.log(error);
        })
};
/**
 * fetch all the categories and use them to create an new product
 */
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error)
    })
}