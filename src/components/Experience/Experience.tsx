import React from "react";
import ExperienceCard from "./ExperienceCard";

const Experience: React.FC = () => {
  return (
    <div
      id="experience"
      className="bg-gray-400 sm:px-1 md:px-5 xl:px-20 rounded-lg"
    >
      <div className="container py-4">
        <div className="flex flex-col lg:flex-row first-letter">
          <div className="w-3/4 max-w-3/4 ml-auto mr-auto">
            <div className="text-center mb-2">
              <h2 className="text-2xl font-light ml-5 pb-4 text-white bold">Experience</h2>
            </div>

            <div className="w-full relative">
              <ExperienceCard
                  first
                  title="Sr. Software Engineer"
                  company="Equifax"
                  location="American Fork, UT"
                  dateRange="04/2023 - 01/2025"
                  description={[
                      "Achieved 99% uptime by enforcing 80 %+ test coverage, comprehensive integration testing, and automated verification using Fortify, Nexus IQ, and SonarQube.",
                      "Increased system visibility by implementing real-time performance monitoring with OpenTelemetry, Prometheus, Grafana, and DataDog across all active services.",
                      "Enhanced legacy PHP application and Python backend services by implementing new features and resolving critical bugs, improving system stability and user satisfaction.",
                      "Improved deployment reliability by configuring Docker-based test environments and CI/CD pipelines in Kubernetes using Helm, ensuring services passed automated tests pre-release.",
                      "Enhanced system performance by redesigning architecture and database schemas, optimizing efficiency and reliability following the migration from AWS to GCP."
                  ]}
                  logoUrl="/equifax.png"
                  websiteUrl="https://www.equifax.com/"
              />

              {/* SnapOne Experience */}
              <ExperienceCard
                  title="Staff Software Engineer"
                  company="SnapOne"
                  location="Draper, UT"
                  dateRange="03/2019 - 10/2022"
                  description={[
                      "Cut response time from over 12 seconds to under 20 milliseconds and reduced upstream API calls by 40%, saving $40K monthly through weather service refactor tune-up.",
                      "Reduced ticket routing and cross-team confusion by building an internal API that empowered support staff to self-resolve common account tasks, decreasing workload by 12%.",
                      "Enhanced performance and user experience by improving highly-trafficked services, correcting execution delays, and increasing system responsiveness across critical functions.",
                      "Engineered secure infrastructure solutions including OAuth2, SAML and SSO integrations with automated scanning using Fortify and SonarQube.",
                      "Developed a comprehensive scalable hospitality suite utilizing Nest.js and React, facilitating bulk configuration management utilizing templates, which enabled a multi-million dollar revenue stream for the company.",
                      "Integrated comprehensive logging and metric collection systems using Splunk, DataDog, and New Relic, enhancing the debugging process for complex distributed services."
                  ]}
                  logoUrl="https://cdn.prod.website-files.com/6268666585dfeb4f752059d2/67e6e3270301f57042b16815_ADI-SnapOne-Lockup.png"
                  websiteUrl="https://www.snapone.com/"
              />

              {/* Career Step Experience */}
              <ExperienceCard
                  title="Sr. Software Engineer"
                  company="Career Step"
                  location="Lehi, UT"
                  dateRange="12/2017 - 03/2019"
                  description={[
                      "Configured a local development stack using Docker Compose, saving engineers 20% daily and reducing deployment issues by 85% through accurate local testing that mirrored production.",
                      "Developed and integrated new functionalities into existing services, enhancing system performance and user experience for over 10,000 users.",
                      "Conducted in-depth analysis of time-intensive processes, successfully identifying and resolving bottlenecks, resulting in a 50% reduction in execution time.",
                      "Implemented unique header fields for distributed tracing, reducing debugging time by 75% and enhancing process issue resolution efficiency."
                  ]}
                  logoUrl="/careerstep.png"
                  websiteUrl="https://www.careerstep.com/"
              />

              {/* InContact Experience */}
              <ExperienceCard
                  title="Principal Software Engineer"
                  company="InContact"
                  location="Sandy, UT"
                  dateRange="03/2017 - 12/2017"
                  description={[
                      "Diagnosed and resolved a critical architecture flaw in resize management, leading to a comprehensive rewrite that successfully eliminated over 40 open bugs and tasks, enhancing application stability.",
                      "Implemented Docker-based personal developer environments, enhancing consistency with production settings and streamlining the development process.",
                      "Engineered a modular architecture for a previously static application, achieving customization with less than 2% code modification, which facilitated client-specific feature development and generated new revenue streams."
                  ]}
                  logoUrl="https://www.nice.com//_next/image?url=https%3A%2F%2Fresources.nice.com%2Fwp-content%2Fuploads%2F2024%2F04%2Fnice-web-logo.webp&w=828&q=80"
                  websiteUrl="https://www.nice.com/"
              />

              {/* Convirza Experience */}
              <ExperienceCard
                  title="Sr. Software Engineer / Architect"
                  company="Convirza"
                  location="Draper, UT"
                  dateRange="11/2014 - 12/2016"
                  description={[
                      "Optimized AngularJS app load time from 47 seconds to two seconds by applying lazy loading, background execution, code minification, and caching strategies.",
                      "Improved platform reliability by resolving persistent bugs in core services and stabilizing functionality across customer-facing application components.",
                      "Enhanced integration capacity by embedding third-party systems into application workflows, including Zuora and DoubleClick.",
                      "Engineered an automated system to redact Personally Identifiable Information (PII) from call log recordings, leveraging custom Natural Language Processing (NLP) and Machine Learning (ML) models to enhance data privacy.",
                      "Developed and implemented automated cron jobs to collect and process data from multiple storage systems, delivering tailored summary reports for enhanced client insights.",
                      "Engineered a multi-tier Node.js API with public and private endpoints, enhancing documentation through Swagger and securing access with OAuth2."
                  ]}
                  logoUrl="https://www.convirza.com/wp-content/uploads/elementor/thumbs/Main-Convirza-Logo-Grey-and-Orange-r446xe6v4wemqsh2vg1u5x2nsglslbjp4ghp6zvjdo.png"
                  websiteUrl="https://www.convirza.com/"
              />

              {/* Blueroof360 Experience */}
              <ExperienceCard
                  last
                  title="Chief Technology Officer"
                  company="BlueRoof360"
                  location="Draper, UT"
                  dateRange="07/2012 - 10/2013"
                  description={[
                      "Delivered a modular, scalable redesign by evaluating limitations of the existing system and architecting a replacement using technologies suited to long-term growth.",
                      "Met aggressive launch deadline by creating a phased roadmap that enabled incremental releases and task prioritization based on functional dependencies.",
                      "Increased system stability and security by restructuring cloud and server infrastructure using load balancers, dedicated servers, content delivery networks (CDNs), and redundant architecture hosted in AWS.",
                      "Engineered a PostgreSQL schema with advanced indexing and foreign key strategies, enabling efficient data syncing to MySQL via Foreign Data Wrapper, facilitating a incremental transition to the new database system.",
                      "Spearheaded simultaneous development of web and mobile applications, facilitating synchronized feature rollouts and enhancing user experience."
                  ]}
                  logoUrl="/blueroof.png"
                  websiteUrl="https://www.blueroof360.com/"
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
