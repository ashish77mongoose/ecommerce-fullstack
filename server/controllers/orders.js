import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
export const getAllOrders = async (req,res) =>{
    const orderList = await Order.find().populate('user').sort({'createdAt': -1});
    if(!orderList) {
        res.status(500).json({success: false})
    } 
    res.status(200).json(orderList);

}
export const createOrder = async (req,res) =>{
    const user=req.user;
    const orderItems=await OrderItem.find({user:user.id}).populate('product', 'price')
    const orderItemsIds = orderItems.map((item) =>item._id);

    const totalPrices =orderItems.map((item)=>{
        const totalPrice = item.product.price * item.quantity;
        return totalPrice;
    })

    const totalPrice = totalPrices.reduce((a,b) => a +b , 0);

    let order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        totalPrice: totalPrice,
        user: user.id,
    })
    order = await order.save();
     await OrderItem.updateMany({user:user.id},{ isPlaced: true });
    if(!order)
    return res.status(400).send('the order cannot be created!')
    res.send(order);

}
export const getSingleOrder = async (req,res) =>{
    const order = await Order.findById(req.params.id)
    .populate('user')
    .populate({ 
        path: 'orderItems', populate: {
            path : 'product', populate: 'category'} 
        });

    if(!order) {
        res.status(500).json({success: false})
    } 
    res.status(200).json(order);

}
export const updateOrder = async (req,res) =>{
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true}
    )

    if(!order)
    return res.status(400).json({message:'the order cannot be update!'})

    res.status(200).json(order);

}
export const deleteOrder = async (req,res) =>{
    Order.findByIdAndRemove(req.params.id).then(async order =>{
        if(order) {
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndRemove(orderItem)
            })
            return res.status(200).json({success: true, message: 'the order is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "order not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })

}
export const getAllUserOrders = async (req,res) =>{
    const userOrderList = await Order.find({user: req.params.userid}).populate({ 
        path: 'orderItems', populate: {
            path : 'product', populate: 'category'} 
        }).sort({'createdAt': -1});

    if(!userOrderList) {
        res.status(500).json({success: false})
    } 
    res.send(userOrderList);

}
export const getTotalSales = async (req,res) =>{
    const totalSales= await Order.aggregate([
        { $group: { _id: null , totalsales : { $sum : '$totalPrice'}}}
    ])

    if(!totalSales) {
        return res.status(400).send('The order sales cannot be generated')
    }

    res.status(200).json({totalsales: totalSales.pop().totalsales})
}
export const getOrdersCount = async (req,res) =>{
    const orderCount = await Order.countDocuments({})
    if(!orderCount) {
        res.status(500).json({success: false})
    } 
    res.status(200).json({
        orderCount: orderCount
    });
}
export const addToCart = async (req,res) =>{
    const{product,quantity}=req.body;
    const user=req.user;
    const orderItem = await OrderItem.create({product,quantity,user:user.id});
    if(!orderItem) {
        res.status(500).json({success: false})
    } 
    res.status(200).json(orderItem);
}
export const getAllCartItem = async (req,res) =>{
    const user=req.user;
    const orderItems = await OrderItem.find({user:user.id,isPlaced:false}).populate('product');
    if(!orderItems) {
        res.status(500).json({success: false})
    } 
    res.status(200).json(orderItems);
}



