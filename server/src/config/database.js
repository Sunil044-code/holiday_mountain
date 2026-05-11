import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODBURI);

        console.log(`Connection Successful: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error(' Error while connecting to DB:', error);
        process.exit(1);
    }
};

export default connectDb;