import React from "react";
import { SkillGroupProps } from "./types";
import SkillItem from "./SkillItem";

const SkillGroup: React.FC<SkillGroupProps> = ({ title, skills }) => {
    return (
      <div>
        <div className="text-sm md:text-xl font-light mb-2.5 border-b-2 border-gray-300 pb-1.5">
          {title}
        </div>
        {skills.map((skill, index) => (
          <SkillItem key={index} {...skill} />
        ))}
      </div>
    );
  };
  
  export default SkillGroup;