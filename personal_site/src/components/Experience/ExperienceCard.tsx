import React from "react";
import { ExperienceCardProps } from "./types";

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  location,
  dateRange,
  description,
  logoUrl,
  websiteUrl,
  first,
  last,
}) => {
  return (
    <div className="relative flex items-start pb-4 w-full">
      {/* Timeline Dot */}
      <div className="ml-1 md:mr-2 absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border-2 border-gray-600 rounded-full z-10"></div>

      {/* Vertical line connecting dots */}
      <div className={`absolute w-0.5 bg-gray-600 z-0 ${first ? "top-1/2" : "top-0"} ${
          last ? "bottom-1/2" : "bottom-0"
        }`}
        style={{ left: "0.56rem" }}
      ></div>

      {/* Job Details Section */}
      <div className="ml-4 w-full bg-white p-4 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center mb-4">
          <a href={websiteUrl} target="_blank"
                rel="noopener noreferrer"
                className="mb-3 sm:mb-0 sm:mr-4 flex-shrink-0 flex justify-center items-center">
            <img src={logoUrl} alt={`${company} Logo`} className="h-8 md:h-12 w-120 max-w-150" />
          </a>

          <div>
            <h5 className="text-sm sm:text-base md:text-xl font-light">{title}</h5>
            <h6 className="text-xs md:text-sm text-gray-500">{company}</h6>
            <p className="text-xs md:text-sm text-gray-400">
              {dateRange} · {location}
            </p>
          </div>
        </div>

        {/* Job Description List */}
        <ul className="list-disc ml-6 text-gray-600">
          {description.map((item, index) => (
            <li key={index} className="text-xs md:text-sm mt-2">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceCard;
