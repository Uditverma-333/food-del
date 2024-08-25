import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://uditverma150:tcMCbwzpuN8dAF9w@cluster0.ocafp0g.mongodb.net/food-del').then(() => console.log("DB connected"))
}
