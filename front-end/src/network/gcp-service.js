import axios from "axios";

export const PRODUCTS_URL = "http://products.zealsup.com/api/products";
export const URL_ORDERS = "http://35.223.134.247/api/orders";
export const ORDER_URL = "";
export const CREATE_ORDER_URL = "http://35.223.134.247/api/createorder";
export const PRODUCT_URL = "http://products.zealsup.com/api/products/";

export const gcp_service_get = url => axios.get(url);
export const gcp_service_post = (url, payload) => axios.post(url, payload);
// create({
//   url,
//   headers: {
//     "Access-Control-Request-Method": method,
//     "Access-Control-Request-Headers": "http://test.zealsup.com",
//   },
// });
