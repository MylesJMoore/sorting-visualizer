import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    if (isSorting) return;
    const newArr = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 5);
    setArray(newArr);
    setActiveIndices([]);
    setSortedIndices([]);
  };

  const bubbleSort = async () => {
  setIsSorting(true);
  const arr = [...array];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      setActiveIndices([j, j + 1]); // highlight the current indices being compared
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]);
      }
      await sleep(50);
    }
    setSortedIndices((prev) => [...prev, arr.length - 1 - i]); // mark last sorted index
  }
  setSortedIndices((prev) => [...prev, 0]);
  setActiveIndices([]);
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
        {array.map((val, idx) => {
          const isActive = activeIndices.includes(idx);
          const isSorted = sortedIndices.includes(idx);
          let color = 'teal';

          if (isSorted) color = '#22c55e'; // green
          else if (isActive) color = '#facc15'; // yellow

          return (
            <div
              key={idx}
              style={{
                height: `${val * 3}px`,
                width: '10px',
                margin: '0 2px',
                backgroundColor: color,
                transition: 'height 0.1s, background-color 0.2s',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
