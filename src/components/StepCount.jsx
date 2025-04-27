import React, { useEffect, useState } from 'react';

const StepCount = () => {
  const [captures, setCaptures] = useState([]);

  useEffect(() => {
    const storedCaptures = localStorage.getItem('tempCaptures');
    if (storedCaptures) {
      setCaptures(JSON.parse(storedCaptures));
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl">Step Count</h1>
      <p>This page will display your step count statistics.</p>
      <ul className="mt-4">
        {captures.length > 0 ? (
          captures.map((capture, index) => (
            <li key={index} className="text-lg">{capture}</li>
          ))
        ) : (
          <li className="text-lg">No captures recorded yet.</li>
        )}
      </ul>
    </div>
  );
};

export default StepCount;