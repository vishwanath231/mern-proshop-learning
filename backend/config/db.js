import mongoose from 'mongoose';


const connectDB = async () => {

    try {
        
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB connected: ${conn.connection.host}`.bgGreen.white);

    } catch (error) {
        
        console.log(`MongoDB connection Error:  ${conn.connection.host}`);
        process.exit(1);
    }

}
export default connectDB;