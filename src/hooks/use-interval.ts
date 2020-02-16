import React from 'react';

function useInterval(callback: () => void, delay: number) {
  const intervalRef = React.useRef<number>();

  React.useEffect(() => {
    callback();
    intervalRef.current = setInterval(callback, delay);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [delay, callback]);
}

export default useInterval;
