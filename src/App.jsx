import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    if (isSorting) return;
    const newArr = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 5);
    setArray(newArr);
  };

  const bubbleSort = async () => {
  setIsSorting(true);
  const arr = [...array];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // Optional: highlight these indices later
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]);
      }
      await sleep(50);  // Now we pause on every comparison
    }
  }
  setIsSorting(false);
};

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="App" style={{ padding: '2rem' }}>
      <button onClick={generateRandomArray} disabled={isSorting}>
        Generate New Array
      </button>

      <button onClick={bubbleSort} disabled={isSorting} style={{ marginLeft: '1rem' }}>
        Bubble Sort
      </button>
      
      <div style={{ display: 'flex', alignItems: 'flex-end', height: '300px', marginTop: '1rem' }}>
        {array.map((val, idx) => (
          <div
            key={idx}
            style={{
              height: `${val * 3}px`,
              width: '10px',
              margin: '0 2px',
              backgroundColor: 'teal',
              transition: 'height 0.1s',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
