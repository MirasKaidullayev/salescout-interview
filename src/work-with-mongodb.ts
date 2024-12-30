// Write a script that:
// 1. Connects to MongoDB.
// 2. Creates the 'users' collection.
// 3. Adds new users.
// 4. Finds users with duplicate emails.

// Use Mongoose library

import mongoose, { Schema, model, Document } from 'mongoose';

type DuplicatedUsers = {
    email: string;
};

interface IUser extends Document {
    name: string;
    email: string;
}
// https://mongoosejs.com/docs/guide.html ??
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
});

const User = model<IUser>('User', userSchema);

export async function manageUsers(): Promise<DuplicatedUsers[]> {
    try {
        await User.deleteMany({});

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

        return duplicates as DuplicatedUsers[];
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

//module.exports = { manageUsers };
