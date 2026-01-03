import React from "react";
import { ProjectItemProps } from "./types";

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  description,
  websiteUrl,
  githubUrl,
  reportUrl,
  listItems,
}) => {
  return (
    <div className="col-12 card mt-2 rounded-xl max-w-lg mx-auto">
      <div className="col-lg-12 view-showcase card-body  p-3 md:p-[20px]">
        {/* Reduce padding around content */}
        <div className="flex flex-col items-start">
          <div className="w-full p-1">
            <div className="section-subheading font-light text-lg md:text-xl mb-0 mt-0">
              <a rel="noopener noreferrer">{title}</a>
            </div>
            <div className="article-style mb-1 text-xs md:text-sm">{description}</div>
            <div className="flex space-x-2 mt-2">
              {websiteUrl && (
                <a
                  className="text-gray-600 border border-gray-600 text-xs px-1 py-1 rounded hover:no-underline hover:text-gray-600 hover:scale-110"
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener"
                >
                  <i className="fa fa-globe mr-1"></i>Website
                </a>
              )}
              {githubUrl && (
                <a
                  className="text-gray-600 border border-gray-600 text-xs px-1 py-1 rounded hover:no-underline hover:text-gray-600 hover:scale-110"
                  href={githubUrl}
                  target="_blank"
                  rel="noopener"
                >
                  <i className="fab fa-github mr-1"></i>Github
                </a>
              )}
              {reportUrl && (
                <a
                  className="text-gray-600 border border-gray-600 text-xs px-1 py-1 rounded hover:no-underline hover:text-gray-600 hover:scale-110"
                  href={reportUrl}
                  target="_blank"
                  rel="noopener"
                >
                  <i className="fa fa-file mr-1"></i>Report
                </a>
              )}
            </div>
            <div className="card-text mt-1">
              <ul className="list-disc ml-3">
                {listItems.map((item, index) => (
                  <li key={index} className="pt-1 text-xs md:text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
