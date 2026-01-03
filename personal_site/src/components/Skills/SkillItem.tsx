import React from 'react';
import { SkillItemProps } from './types';

const SkillItem: React.FC<SkillItemProps> = ({ iconSrc, iconAlt, name }) => {
    return (
      <div className="flex items-center mb-4">
        <span className="inline-block w-6 h-6 md:w-8 md:h-8">
          <img src={iconSrc} alt={iconAlt} className="w-full h-full" />
        </span>
        <span className="ml-3 text-gray-500 text-xs md:text-base">{name}</span>
      </div>
    );
  };

export default SkillItem;