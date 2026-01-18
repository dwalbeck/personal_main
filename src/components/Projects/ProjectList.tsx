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
                "Integrated IoT devices for real-time data collection and analysis and remote access to all portal features",
                "Designed main code structure and oversaw the development of the native mobile application, match feature for feature to the portal application",
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
              "Comprehensive lead management tracking system with reporting, dynamic list generation, lead scoring, and automated reminders",
              "Designed and maintained database schemas supporting clients, leads, employees, accounting, reporting, advertising campaigns, and related operational data",
              "Designed and implemented a fully dynamic accounting system enabling interaction with any number of accounts, merchants, gateways, and partners, supporting custom data mapping and translation.",
                "DDeployed an on-premises Asterisk server and fully integrated the call center into the portal application, enabling predictive dialing and call tracking using softphones over VoIP on SIP channels with headsets",
                "Configured and deployed multiple in-house servers to support email, web hosting, primary and secondary DNS, dynamic DHCP for remote access, and the network primary domain controller (PDC)",
                "Produce daily dynamic reports with graphical trend analysis and downloadable exports to support essential business operations",
                "Designed and implemented a multi-tier user authentication and validation system featuring per-user and group-level permissions, with built-in breadcrumb navigation and session-based state management"
            ]}
          />

          {/* Surepay Project */}
          <ProjectItem
            title="Surepay Portal"
            description="Multi-tier company application for loan management"
            websiteUrl="https://portal.surepaylg.com/"
            githubUrl=""
            listItems={[
              "Architected the software and hardware solution for a project featuring a PHP portal front end, a Node.js API back end, a Redis server, and a PostgreSQL database server",
              "Implemented application frameworks, OAuth2-based authentication, and multi-tier session management, including security implementation and enforcement",
              "Designed and built an underwriting logic engine that integrates and utilizes data returned by the DataX third-party service",
                "Implemented dynamic PDF contract generation with distinct tagging for client and official copies, including automated storage in Amazon S3",
                "Integrated payment processing with multiple merchant gateways to support ACH and credit card transactions"
            ]}
          />
            {/* Clicksite Builder Project */}
            <ProjectItem
                title="ClickSiteBuilder"
                description="Business website creation and hosting service with ad campaign tracking"
                websiteUrl="https://clicksitebuilder.com/"
                githubUrl=""
                listItems={[
                    "Domain name availability search, automated registration, configuration, and name service activation",
                    "Developed graphic image generation capabilities using text input, color selection, and Script-Fu, replacing the previously utilized Roxen server",
                    "Redesigned the database schema from MySQL to PostgreSQL, implementing full foreign key enforcement, index optimization, triggers, and a scripted migration process",
                    "Developed a custom bulk email system capable of sending dynamically populated dual-format (HTML and plain text) messages at a throughput of up to 1 million emails every 5 minutes",
                    "Delivered a turnkey e-commerce solution that automatically generates storefronts and processes purchase transactions directly from imported product Excel files",
                    "Email advertising campaigns with comprehensive tracking and reporting, supported by robust list management and generation tools"
                ]}
            />
            {/* Offerweb Project */}
            <ProjectItem
                title="Offerweb"
                description="Affiliate merchant tracking system for ads and campaigns"
                websiteUrl="https://offerweb.com/"
                githubUrl=""
                listItems={[
                    "Flexible, customizable payout structures spanning a wide range of targets, scopes, and calculation metrics, with dynamic scaling options",
                    "Searchable payout histories by date, merchant, revenue, or site, each displaying the complete transaction chain",
                    "Fully customizable commission, incentive, and rewards system with support for unlimited configurations",
                    "Suppression lists can be enforced by email address, domain, or MAC address",
                    "Provide real-time revenue reporting for marketing campaigns and affiliate partners",
                    "Affiliate and sub-affiliate tracking for networks, including comprehensive downloadable reports"
                ]}
            />
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
