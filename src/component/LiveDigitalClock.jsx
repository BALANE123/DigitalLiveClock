import React, { useEffect } from 'react';

const LiveClock = ({ isRunning, setCurrentTime, is12HourFormat }) => {
  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      const time = new Date();
      const formattedTime = is12HourFormat
        ? time.toLocaleTimeString('en-US', { hour12: true })
        : time.toLocaleTimeString('en-US', { hour12: false });
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, is12HourFormat, setCurrentTime]);

  return null;
};

export default LiveClock;