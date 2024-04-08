import React, { useState } from 'react';
import {TooltipProps} from "@/Components/InterFaces/TooltipProps";


const Tooltip: React.FC<TooltipProps> = ({ message, children }) => {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    return (
        <div style={{ position: 'relative', display: 'inline-block' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {children}
            {isHovering && (
                <div style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '8px',
                    padding: '8px',
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    zIndex: 1000, // Ensure it's above most other elements
                }}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
