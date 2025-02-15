import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    co2_emissions: { type: Number, required: true },
    water_consumption: { type: Number, required: true },
    waste_generated: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

export default mongoose.model("Data", DataSchema);