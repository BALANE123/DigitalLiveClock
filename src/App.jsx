import React, { useState, useEffect } from 'react';
import LiveClock from './component/LiveDigitalClock';

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [isRunning, setIsRunning] = useState(false);
  const [is12HourFormat, setIs12HourFormat] = useState(true);

  // Start/Stop the clock
  const toggleClock = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  // Toggle between 12-hour and 24-hour format
  const toggleTimeFormat = () => {
    setIs12HourFormat((prevFormat) => {
      const newFormat = !prevFormat;
      const time = new Date();
      // Update time when switching formats
      setCurrentTime(
        newFormat
          ? time.toLocaleTimeString('en-US', { hour12: true })
          : time.toLocaleTimeString('en-US', { hour12: false })
      );
      return newFormat;
    });
  };

  // Effect hook to update time every second if the clock is running
  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      const time = new Date();
      const formattedTime = is12HourFormat
        ? time.toLocaleTimeString('en-US', { hour12: true })
        : time.toLocaleTimeString('en-US', { hour12: false });
      setCurrentTime(formattedTime);
    }, 1000);

    // Clear interval when clock is stopped
    return () => clearInterval(intervalId);
  }, [isRunning, is12HourFormat]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      {/* Bigger title */}
      <h1 className="text-6xl font-bold text-white mb-6">Live Digital Clock</h1>

      {/* Time display with border */}
      <div className="text-8xl font-extrabold text-white mb-8 px-10 py-6 border-4 border-white rounded-lg shadow-lg">
        {currentTime}
      </div>

      <div className="text-center mt-8">
        {/* Centered Start/Stop Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={toggleClock}
            className={`px-6 py-3 rounded-lg text-white ${
              isRunning
                ? 'bg-red-600 hover:bg-red-700 transition-all duration-300'
                : 'bg-green-600 hover:bg-green-700 transition-all duration-300'
            }`}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
        </div>
        
        <div className="mt-6">
          <button
            onClick={toggleTimeFormat}
            className="px-6 py-3 rounded-lg text-black bg-yellow-500 hover:bg-yellow-600 transition-all duration-300"
          >
            Switch to {is12HourFormat ? '24-hour' : '12-hour'} format
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;