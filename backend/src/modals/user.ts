import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {type: String, minLength: 3, required: true},
  name: String,
  email: String,
  address: String,
  admin: Boolean,
  passwordHash: String,
  inCart: [{
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    amount: Number
  }],
  createdAt: {type: Date, required: true},
  updatedAt: {type: Date, required: true}
})

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash
    delete returnedObject.admin
  },
});

export default mongoose.model("User", userSchema);