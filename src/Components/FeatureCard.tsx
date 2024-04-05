import React from 'react';

// Optional: If you plan to use icons or images, you might want to import them or use a library like React Icons
interface FeatureCardProps {
    title : any,
    description : any,
    icon? : any
}
const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg border-2 border-amber-100 dark:border-gray-600 m-2">
            {/* Conditional rendering if you decide to pass an icon */}
            {icon && <div className="text-center mb-4">{icon}</div>}

            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-sm">{description}</p>
        </div>
    );
};

export default FeatureCard;
