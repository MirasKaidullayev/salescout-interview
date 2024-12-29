// Create an API using Node.js and Express:
// 1. POST /user - adds a user.
// 2. GET /users - returns all users.

// Use Express library

import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

const users: { name: string }[] = [];

// downgrade to npm i -D @types/express@4 else no overload mayches this call
app.post('/user', (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    users.push({ name });
    res.status(201).json({ message: 'User added successfully', user: { name } });
});

app.get('/users', (req: Request, res: Response) => {
    res.status(200).json(users);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
