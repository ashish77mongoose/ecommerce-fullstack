
import express from "express";
import { addToCart, createOrder, deleteOrder, getAllCartItem, getAllOrders, getAllUserOrders, getOrdersCount, getSingleOrder, getTotalSales, updateOrder } from "../controllers/orders.js";
import { authenticateJWT } from "../middleware/auth.js";
const router = express.Router();
router.post(`/add-to-cart`, authenticateJWT, addToCart)
router.get(`/cart-items`, authenticateJWT, getAllCartItem)
router.get(`/`,authenticateJWT, getAllOrders)
router.get('/get/totalsales',authenticateJWT, getTotalSales)
router.get(`/get/count`,authenticateJWT, getOrdersCount)
router.get(`/get/userorders/:userid`,authenticateJWT, getAllUserOrders)
router.post('/',authenticateJWT, createOrder)
router.get(`/:id`, getSingleOrder)
router.put('/:id',authenticateJWT,updateOrder)
router.delete('/:id',authenticateJWT, deleteOrder)



export default router;