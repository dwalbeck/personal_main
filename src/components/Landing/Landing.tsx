import React from 'react';
import config from '../../config/env';

const Landing: React.FC = () => {
  // @ts-ignore
    // @ts-ignore
    return (
    <div>
      <div id="home" className="container mx-auto first-section py-5 xl:px-40">
        <div className="flex flex-col md:flex-row justify-start items-start pt-5 xl:space-x-16 flex-nowrap">

          {/* Profile Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0 text-center profile-section mb-10 sm:mb-0 mr-4">
            <img src="/headshot.jpg" alt="Davey Walbeck" className="w-64 h-94 object-cover mx-auto" />
            <h1 className="mt-2 text-3xl font-bold text-purple-800">Davey Walbeck</h1>
            <p className="text-gray-500 text-lg font-light">
              Senior Software Engineer / Software Architect
              <br />
              Draper, UT
            </p>
              <div className="justify-center">
                <div className="mt-4 flex flex-row gap-8 content-between">
                  <a href={config.social.github} target="_blank">
                      <img src="/github.png" width="38" height="38" alt="GitHub" className="hover:scale-125 transition-transform duration-300 ease-in-out focus:outline-none" />
                  </a>
                  <a href={config.social.linkedin} target="_blank">
                      <img src="/linkedin.png" width="38" height="38" alt="LinkedIn" className="hover:scale-125 transition-transform duration-300 ease-in-out focus:outline-none" />
                  </a>
                  <a href={config.files.resume} target="_blank" rel="noopener noreferrer">
                      <img src="/cv.png" width="38" height="38" alt="Rsume" className="hover:scale-125 transition-transform duration-300 ease-in-out focus:outline-none" />
                  </a>
                  <a href="mailto:{config.contact.email}" target="_blank" rel="noopener noreferrer">
                      <img src="/email.png" alt="Email" width="38" height="38" className="hover:scale-125 transition-transform duration-300 ease-in-out focus:outline-none" />
                  </a>
                  <a href="/davey_walbeck-executive_bio.pdf" target="_blank" rel="noopener noreferrer">
                      <img src="/report.png" alt="Executive Bio Report" width="38" height="38" className="hover:scale-125 transition-transform duration-300 ease-in-out focus:outline-none" />
                  </a>
                </div>
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
            <div className="flex mt-8 justify-center">
                <img src="/my_skills_cloud.png" width="460" className="aspect-91/40 self-center" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
