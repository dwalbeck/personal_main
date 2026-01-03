import React from 'react';
import config from '../../config/env';

const Landing: React.FC = () => {
  return (
    <div>
      <div id="home" className="container mx-auto first-section py-5 xl:px-40">
        <div className="flex flex-col md:flex-row justify-start items-start pt-5 xl:space-x-16 flex-nowrap">

          {/* Profile Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0 text-center profile-section mb-10 sm:mb-0 mr-4">
            <img
              src="/headshot.jpg"
              alt="Davey Walbeck"
              className="w-64 h-94 object-cover mx-auto"
            />
            <h1 className="mt-2 text-3xl font-light">Davey Walbeck</h1>
            <p className="text-gray-500 text-lg font-light">
              Senior Software Engineer / Software Architect
              <br />
              Draper, UT
            </p>
            <div className="mt-4">
              <a href={config.social.github} className="text-2xl mx-2 text-gray-600 hover:text-gray-600">
                <i className="fab fa-github hover:scale-110"></i>
              </a>
              <a
                href={config.social.linkedin}
                className="text-2xl mx-2 text-gray-600 hover:text-gray-600"
              >
                <i className="fab fa-linkedin hover:scale-110"></i>
              </a>
              <a
                href={config.files.resume} // add your CV file to the public folder
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl mx-2 text-gray-600 hover:text-gray-600"
              >
                <i className="ai ai-cv hover:scale-110"></i>
              </a>
              <a
                href="mailto:{config.contact.email}"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl mx-2 text-gray-600 hover:text-gray-600"
              >
                <i className="fas fa-envelope hover:scale-110"></i>
              </a>
            </div>
          </div>

          {/* Biography Section */}
          <div className="w-full md:w-2/3 lg:w-3/4 flex-grow">
            <h2 className="text-xl text-center italic text-purple-800 pb-8">Scaling Systems, Solving Complex Problems & Elevating Engineering Excellence</h2>
            <p className="text-sm sm:text-base md:text-lg mt-2 font-light">
                My work has always centered around improving reliability, optimizing performance, and making systems more resilient. Whether I am designing modular APIs, mentoring junior engineers, or
                replacing costly third-party dependencies with faster, open-source alternatives, I look for practical ways to bring stability and efficiency to your stack. I thrive in environments that
                reward clear communication, thoughtful engineering, and a bit of creative problem-solving. I am ready to dive in if your team seeks a strong technical leader who does not shy away from
                messy challenges and will work until the code runs right.</p>

            {/* Sections for Education and Accomplishments */}
            <div className="flex flex-wrap mt-8 space-y-8 md:space-y-0">
              {/* Education Section */}
              <div className="w-full md:w-1/2 pr-5 mb-4">
                <h3 className="text-lg md:text-xl font-light">Education</h3>
                <hr className="my-2" />
                <ul className="list-none mt-2 space-y-2">
                  <li className="text-xs md:text-sm">
                    <i className="fas fa-graduation-cap text-gray-600"></i> Psychology, 1991 - 1993
                    <p className="text-xs md:text-sm text-gray-600 pl-7 font-light">Salt Lake Community College</p>
                    <p className="text-xs md:text-sm text-gray-600 pl-7 font-light">GPA: 3.9</p>
                  </li>
                  <li className="text-xs md:text-sm">
                    <i className="fas fa-graduation-cap text-gray-600"></i> Architectural Design and Drafting, 1995 - 1997
                    <p className="text-xs md:text-sm text-gray-600 pl-7 font-light">Sevier Valley Applied Technical College, UT</p>
                    <p className="text-xs md:text-sm text-gray-600 pl-7 font-light">GPA: 4.0</p>
                  </li>
                </ul>
              </div>

              {/* Accomplishments Section */}
              <div className="w-full md:w-1/2 pr-5 mb-4">
                <h3 className="text-lg md:text-xl font-light">Accomplishments</h3>
                <hr className="my-2" />
                <ul className="list-none mt-2 space-y-2">
                  <li className="text-xs md:text-sm">
                    <i className="fas fa-trophy text-gray-600"></i> AWS Certified Cloud Architect (2021)
                  </li>
                  <li className="text-xs md:text-sm">
                    <i className="fas fa-trophy text-gray-600"></i> Google Cloud Provider - Developer Cerfication (2024)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
