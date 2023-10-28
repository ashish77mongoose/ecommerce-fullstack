import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isPlaced: {
        type: Boolean,
        required: true,
        default:false

    },
},{ timestamps: true })
export default mongoose.model("OrderItem", orderItemSchema);

