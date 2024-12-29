// Write a script that:
// 1. Connects to Redis.
// 2. Saves the keys with their values.
// 3. Reads and outputs values for a given key.

// Use redis library

import Redis from 'ioredis';

async function manageRedis(): Promise<void> {

    const redis = new Redis(); // Connects to Redis running locally on the default port (6379)
    
    await redis.set('name', 'Miras');
    await redis.set('age', '24');
    await redis.set('city', 'Almaty');

    console.log('Keys have been saved to Redis.');

    const name = await redis.get('name');
    const age = await redis.get('age');
    const city = await redis.get('city');

    console.log(`Name: ${name}`);
    console.log(`Age: ${age}`);
    console.log(`City: ${city}`);

    redis.disconnect();
}

module.exports = { manageRedis };
