import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
});

const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor;
