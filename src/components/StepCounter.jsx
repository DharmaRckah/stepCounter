import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);

const StepCounter = () => {
  const [stepCount, setStepCount] = useState(() => {
    const savedCount = localStorage.getItem('stepCount');
    return savedCount ? JSON.parse(savedCount) : 0;
  });
  const [tempCount, setTempCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [data, setData] = useState([]);
  const [captures, setCaptures] = useState([]);

  useEffect(() => {
    // Background step counting
    const interval = setInterval(() => {
      setStepCount(prev => {
        const newCount = prev + 1;
        localStorage.setItem('stepCount', JSON.stringify(newCount));
        return newCount;
      });
      setData(prev => [...prev, stepCount + 1]);
    }, 1000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        clearInterval(interval);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [stepCount]);

  const startTempCapture = () => {
    setTempCount(0);
    setIsCounting(true);
    const tempInterval = setInterval(() => {
      setTempCount(prev => prev + 1);
    }, 1000);

    // Store the interval ID to clear it later
    return () => clearInterval(tempInterval);
  };

  const captureTempCount = () => {
    if (tempCount > 0) {
      const newCapture = `Capture ${captures.length + 1}: ${tempCount} steps`;
      const updatedCaptures = [...captures, newCapture];
      setCaptures(updatedCaptures);
      localStorage.setItem('tempCaptures', JSON.stringify(updatedCaptures));
      setTempCount(0); // Reset temporary count after capturing
    }
  };

  const stopTempCapture = () => {
    setIsCounting(false);
    console.log(`Temporary Count Recorded: ${tempCount}`);
  };

  const chartData = {
    labels: data.map((_, index) => index + 1),
    datasets: [
      {
        label: 'Step Count Over Time',
        data: data,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-xl">Total Steps: {stepCount}</h1>
      <h2 className="text-lg">Temporary Steps: {tempCount}</h2>
      <div className="my-4" style={{ width: '100%', height: '150px' }}>
        <CircularProgressbar 
          value={isCounting ? tempCount : 0} 
          maxValue={100} 
          text={isCounting ? `${tempCount}` : `Captured: ${tempCount}`} 
        />
      </div>
      <div className="flex justify-between">
        <button onClick={startTempCapture} className="bg-blue-500 text-white p-2 rounded text-sm">
          Start 
        </button>
        <button onClick={captureTempCount} className="bg-green-500 text-white p-2 rounded text-sm">
          Capture
        </button>
        <button onClick={stopTempCapture} className="bg-red-500 text-white p-2 rounded text-sm">
          Stop 
        </button>
      </div>
      <div className="my-4">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default StepCounter;