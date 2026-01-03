import React, { useState, useEffect, useRef } from 'react';

interface TalkingHeadProps {
  isAnimating: boolean;
  duration?: number;
}

const TalkingHead: React.FC<TalkingHeadProps> = ({ isAnimating, duration = 0 }) => {
  const [jawPosition, setJawPosition] = useState(0);
  const [transitionSpeed, setTransitionSpeed] = useState(300);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const getRandomInterval = () => 50 + Math.random() * 50; // 50-100ms between movements
  const getRandomSpeed = () => 30 + Math.random() * 120; // 30-150ms for transition
  const MAX_JAW_MOVEMENT = 9;

  const animateJaw = (isOpen: boolean) => {
    const currentTime = Date.now();

    // Check if animation duration has expired
    if (duration > 0 && currentTime - startTimeRef.current >= duration) {
      setJawPosition(0);
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      return;
    }

    // Set the new position
    const targetPosition = isOpen ? MAX_JAW_MOVEMENT : 0;
    const speed = getRandomSpeed();

    setTransitionSpeed(speed);
    setJawPosition(targetPosition);

    // Schedule next movement after transition completes + random pause
    const nextInterval = getRandomInterval();
    animationRef.current = setTimeout(() => animateJaw(!isOpen), speed + nextInterval);
  };

  useEffect(() => {
    if (isAnimating) {
      startTimeRef.current = Date.now();
      setJawPosition(0);
      // Start the animation after a brief delay
      animationRef.current = setTimeout(() => animateJaw(false), 100);
    } else {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      setJawPosition(0);
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isAnimating, duration]);

  return (
    <div className="absolute -top-24 -left-16 w-32 h-32 pointer-events-none z-50">
      <div className="relative w-full h-full">
        <img
          src="/head-1.png"
          alt="Head base"
          className="absolute top-0 left-0 w-full h-full object-contain"
          style={{ zIndex: 1 }}
        />
        <img
          src="/head-2.png"
          alt="Jaw"
          className="absolute top-0 left-0 w-full h-full object-contain"
          style={{
            zIndex: 2,
            transform: `translateY(${jawPosition}px)`,
            transition: `transform ${transitionSpeed}ms linear`,
          }}
        />
      </div>
    </div>
  );
};

export default TalkingHead;
