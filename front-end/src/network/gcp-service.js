import axios from "axios";

export const PRODUCTS_URL = "http://products.zealsup.com/api/products";
export const URL_ORDERS = "http://orders.zealsup.com/api/orders";
export const ORDER_URL = "";
export const PRODUCT_URL = "http://products.zealsup.com/api/products/";

export const gcp_service_get = url => axios.get(url);
// create({
//   url,
//   headers: {
//     "Access-Control-Request-Method": method,
//     "Access-Control-Request-Headers": "http://test.zealsup.com",
//   },
// });
