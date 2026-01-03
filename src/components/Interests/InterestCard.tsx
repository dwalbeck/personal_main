import React, { useState, useEffect, useRef } from "react";
import { InterestCardProps } from "./types";

const InterestCard: React.FC<InterestCardProps> = ({
    label,
    baseImg,
    extraImg,
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isClickedActive, setIsClickedActive] = useState(false);
    const intervalRef = useRef<number | null>(null);

    // Create array of all images (base + extra)
    const allImages = [baseImg, ...extraImg.filter(img => img !== "")];
    const hasMultipleImages = allImages.length > 1;

    useEffect(() => {
        // Start slideshow if hovered or clicked active
        if ((isHovered || isClickedActive) && hasMultipleImages) {
            intervalRef.current = window.setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
            }, 2000);
        } else {
            // Clear interval and reset to base image when not active
            if (intervalRef.current !== null) {
                window.clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            if (!isClickedActive) {
                setCurrentImageIndex(0);
            }
        }

        return () => {
            if (intervalRef.current !== null) {
                window.clearInterval(intervalRef.current);
            }
        };
    }, [isHovered, isClickedActive, hasMultipleImages, allImages.length]);

    const handleMouseEnter = () => {
        if (hasMultipleImages && !isClickedActive) {
            // Immediately advance to next image
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClick = () => {
        if (hasMultipleImages) {
            if (!isClickedActive) {
                // Immediately advance to next image when activating
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
            }
            setIsClickedActive(!isClickedActive);
            setIsHovered(false);
        }
    };

    return (
        <div
            className="flex flex-col cursor-pointer flex-1 min-w-[calc(50%-9px)] max-w-[calc(50%-9px)]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-300">
                {allImages.map((img, index) => (
                    <img
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                        src={img}
                        alt={`${label} ${index === 0 ? '' : index}`}
                    />
                ))}
            </div>
            <div className="w-full bg-white py-4 px-6 text-center">
                <span className="text-lg font-semibold text-gray-900">{label}</span>
            </div>
        </div>
    );
};

export default InterestCard;