// Implement a Counter component with two buttons:
// “Increase” and “Decrease”, which displays the current counter value.
import React, { useState } from 'react';

function Counter() {
    // State to hold the counter value
    const [count, setCount] = useState(0);

    // Handlers for increasing and decreasing the counter
    const handleIncrease = () => setCount(prevCount => prevCount + 1);
    const handleDecrease = () => setCount(prevCount => prevCount - 1);

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Counter: {count}</h1>
            <button onClick={handleIncrease}>Increase</button>
            <button onClick={handleDecrease}>Decrease</button>
        </div>
    );
}

export default Counter