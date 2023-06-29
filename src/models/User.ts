import { Schema, model } from "mongoose";

const { String, Number } = Schema.Types;

const purchaseSchema = new Schema<PurchaseI>({
  productId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const userSchema = new Schema<UserI>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  purchase: [purchaseSchema],
  id: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema);

export default User;
