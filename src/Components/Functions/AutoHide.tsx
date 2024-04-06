import { useState, useEffect } from 'react';

function useAutoHide(timeout: number = 3000) {
    const [isVisible, setIsVisible] = useState(false);
    let timer: NodeJS.Timeout;

    const show = () => {
        clearTimeout(timer); // Clear any existing timers
        setIsVisible(true); // Show the element
        // Set a new timer
        timer = setTimeout(() => {
            setIsVisible(false); // Hide the element after the timeout
        }, timeout);
    };

    const hide = () => {
        clearTimeout(timer); // Clear the timer if the element is manually hidden
        setIsVisible(false);
    };

    // Clean up the timer when the component unmounts
    useEffect(() => {
        return () => clearTimeout(timer);
    }, []);

    return { isVisible, show, hide };
}

export default useAutoHide;
