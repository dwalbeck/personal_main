import React from "react";
import ProjectItem from "./ProjectItem";

const ProjectList: React.FC = () => {
  return (
    <div id="projects" className="project-section bg-gray-100 rounded-lg py-4">
      <div className="container mx-auto">
        <div className="text-center mb-2">
          <h1 className="text-2xl font-light mb-0">Projects</h1>
        </div>
        {/* Add justify-center to center items when there's only one column */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto justify-center">

          {/* Blueroof360 Project */}
          <ProjectItem
            title="Blueroof360"
            description="Complete redesign of main real estate portal application and accompanying mobile app"
            websiteUrl="https://www.blueroof360.com/"
            listItems={[
                "Evaluated current product and architect of redesigned improved modular replacement with added features and capabilities, engineered to handle scalability and the growing demands using the best suited technologies.",
                "Integrated IoT devices for real-time data collection and analysis",
                "Designed main code structure and oversaw the development of the native mobile application.",
                "Removed third party paid dependency by switching to an open source mapping solution. This saved on recurring costs and functionally operated in a fraction of the time and had more features that we utilized, which enhanced our app.",
                "Restructured both the hardware, software, and overall architecture for improved stability, redundancy, and security, which includes a combination of cloud servers, load balancers, dedicated servers, CDN storage, and networking of all elements.",
                "Designed new schema and database, as well as wrote the migration script to move customers and all associated data from old system to new."
            ]}
          />

          {/* GlobalBased Project */}
          <ProjectItem
            title="GlobalBased Portal"
            description="Main company portal application, handling external user account, internal use, accounting, promotions, campaigns and more"
            websiteUrl="https://truenorthacademy.com/"
            githubUrl=""
            listItems={[
              "Full featured Lead Management Tracking system, complete with reporting, dynamic list generation, scoring and reminders",
              "Database schema design handling all clients, leads, employees, accounting, reporting, ad campaigns and more",
              "Designed and implemented completely dynamic accounting system for interaction with any number of accounts, merchants, gateways, and partners for custom mapping and translation of data.",
                "Deployed on prem Asterisk server and fully integrated call center into portal application with predictive dialing and call tracking, utilizing soft phones over VoIP on SIP channels and headsets",
                "Configured and deployed several in-house servers for email, website hosting, primary and secondary DNS, dynamic DHCP for remote access and the network PDC",
                "Generation of daily dynamic reports and trend recognition with graphic display and downloadable exports, essential of daily business operations",
                "Multi-tier user authentication and validation system with per user and group permission setting and built-in breadcrumb and state management per session"
            ]}
          />

          {/* Surepay Project */}
          <ProjectItem
            title="Surepay Portal"
            description="Multi-tier company application for loan management"
            websiteUrl="https://portal.surepaylg.com/"
            githubUrl=""
            listItems={[
              "Designed software and hardware architecture for project consisting of a PHP portal front end, NodeJS API back end, Redis server and PostgreSQL database server",
              "Implemented code base frameworks, OAuth2 authentication, multi-tier session management and security implementation and enforcement",
              "Designed and built underwriting logic engine which connects and uses data returned by DataX third party service",
                "Dynamic PDF contact generation with tagging for client and official copy and storage to S3",
                "Payment processing integration to multiple merchant gateways for ACH and CC transactions"
            ]}
          />
            {/* Clicksite Builder Project */}
            <ProjectItem
                title="ClickSiteBuilder"
                description="Business website creation and hosting service with ad campaign tracking"
                websiteUrl="https://clicksitebuilder.com/"
                githubUrl=""
                listItems={[
                    "Domain name availability searching and automated registration, configuration and name service activation",
                    "Graphic image generation using text, color selection and script-fu, replacing the Roxen server previously used",
                    "Complete redesign of the DB schema from MySQL to PostgreSQL with full foreign key enforcement, index optimization and triggers, as well as scripted migration process",
                    "Custom written bulk mailer capable of using dynamically populated content for dual HTML and text emails at a rate of 1 million / 5 mins",
                    "Turnkey ecommerce solution for store front and purchase transaction, all automatically created from a product Excel import",
                    "Email ad campaigns with full tracking and reporting, and list management and generation tools"
                ]}
            />

        </div>
      </div>
    </div>
  );
};

export default ProjectList;
