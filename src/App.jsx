import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [array, setArray] = useState([]);

  // Generate array on first render
  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    const newArr = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 5);
    setArray(newArr);
  };

  return (
    <div className="App" style={{ padding: '2rem' }}>
      <button onClick={generateRandomArray}>Generate New Array</button>
      <div style={{ display: 'flex', alignItems: 'flex-end', height: '300px', marginTop: '1rem' }}>
        {array.map((val, idx) => (
          <div
            key={idx}
            style={{
              height: `${val * 3}px`,
              width: '10px',
              margin: '0 2px',
              backgroundColor: 'teal',
              transition: 'height 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
