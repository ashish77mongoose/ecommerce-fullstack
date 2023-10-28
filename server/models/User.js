import mongoose from "mongoose";

export const userSchema = mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: false },
        googleId: { type: String, required: false },
        coverImage: { type: String, required: false },
        profileImage: { type: String, required: false },
        description: { type: String, required: false },
        mobile: { type: String, required: false },
        city: { type: String, required: false },
        country: { type: String, required: false },
        state: { type: String, required: false },
        pincode: { type: String, required: false },
        role: {
            type: String,
            enum: ["Admin", "User", "Vendor"],
            default: "User",
        },
        
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
userSchema.virtual("carts", {
    ref: "OrderItem",
    localField: "_id",
    foreignField: "user",
  });
export default mongoose.model("User", userSchema);
