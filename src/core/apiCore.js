import {
    API
} from "../config";


/**
 * fetch all new product sort by sold
 */
export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error)
    })
}