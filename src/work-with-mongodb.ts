// Write a script that:
// 1. Connects to MongoDB.
// 2. Creates the 'users' collection.
// 3. Adds new users.
// 4. Finds users with duplicate emails.

// Use Mongoose library

import mongoose from 'mongoose';

type DuplicatedUsers = {
    email: string;
};
// https://mongoosejs.com/docs/guide.html ??
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

// Create the model
const User = mongoose.model('User', userSchema);

async function manageUsers(): Promise<DuplicatedUsers[]> {
    try {
        // Connect to MongoDB 
        await mongoose.connect('mongodb://localhost:27017/mydatabase');

        console.log('Connected to MongoDB');

        //Add new users (example)
        const users = [
            { name: 'Miras', email: 'miras@gmail.com' },
            { name: 'Almas', email: 'almas@gmail.com' },
            { name: 'Ayan', email: 'miras@gmail.com' }, // Duplicate email
        ];

        await User.insertMany(users);
        console.log('Users added');

        //Find users with duplicate emails
        const duplicates = await User.aggregate([
            { $group: { _id: "$email", count: { $sum: 1 }, users: { $push: "$name" } } },
            { $match: { count: { $gt: 1 } } },
            { $project: { email: "$_id", _id: 0, users: 1 } }
        ]);

        return duplicates.map((duplicate: any) => ({
            email: duplicate.email
        }));
    } catch (error) {
        console.error('Error managing users:', error);
        return [];
    } finally {
        // Close the connection to MongoDB
        await mongoose.disconnect();
    }
}

module.exports = { manageUsers };
