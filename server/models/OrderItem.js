import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
},{ timestamps: true })
export default mongoose.model("OrderItem", orderItemSchema);

