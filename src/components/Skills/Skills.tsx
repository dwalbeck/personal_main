import React from "react";
import SkillGroup from "./SkillGroup";

const Skills: React.FC = () => {
  return (
    <section id="skills" className="">
      <div className="container mx-auto py-4">
        <div className="text-center">
          <h1 className="text-2xl font-light pb-4">Skills</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <SkillGroup
            title="Languages"
            skills={[
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
                    iconAlt: "PHP Logo",
                    name: "PHP",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
                    iconAlt: "Node.js Logo",
                    name: "Node.js",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
                    iconAlt: "Javascript Logo",
                    name: "Javascript",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
                    iconAlt: "Python Logo",
                    name: "Python",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
                    iconAlt: "Go Logo",
                    name: "Go",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg",
                    iconAlt: "Ruby Logo",
                    name: "Ruby on Rails",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
                    iconAlt: "Java Logo",
                    name: "Java",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/perl/perl-original.svg",
                    iconAlt: "Perl Logo",
                    name: "Perl",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
                    iconAlt: "React Logo",
                    name: "React",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
                    iconAlt: "NestJS Logo",
                    name: "NestJS",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
                    iconAlt: "HTML Logo",
                    name: "HTML",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
                    iconAlt: "CSS Logo",
                    name: "CSS",
                }
            ]}
          />

          <SkillGroup
            title="Databases"
            skills={[
              {
                iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
                iconAlt: "PostgreSQL Logo",
                name: "PostgreSQL",
              },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
                    iconAlt: "MySQL Logo",
                    name: "MySQL",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg",
                    iconAlt: "SQL Database Logo",
                    name: "MS SQL",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg",
                    iconAlt: "SQLite Logo",
                    name: "SQLite",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg",
                    iconAlt: "Oracle Logo",
                    name: "Oracle",
                },
                {
                    iconSrc: "/max_db.jpg",
                    iconAlt: "MaxDB Logo",
                    name: "MaxDB",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
                    iconAlt: "Redis Logo",
                    name: "Redis",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/memcached/memcached-original.svg",
                    iconAlt: "Memcached Logo",
                    name: "Memcached",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dynamodb/dynamodb-original.svg",
                    iconAlt: "DynamoDB Logo",
                    name: "DynamoDB",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
                    iconAlt: "MongoDB Logo",
                    name: "MongoDB",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cassandra/cassandra-original.svg",
                    iconAlt: "Cassandra Logo",
                    name: "Cassandra",
                },
                {
                    iconSrc: "/athena.svg",
                    iconAlt: "AWS Athena Logo",
                    name: "AWS Athena",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hadoop/hadoop-original.svg",
                    iconAlt: "Hadoop Logo",
                    name: "Hadoop",
                },
            ]}
          />
          <SkillGroup
            title="DevOps"
            skills={[
              {
                iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
                iconAlt: "Docker Logo",
                name: "Docker",
              },
              {
                iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
                iconAlt: "Git Logo",
                name: "Git",
              },
              {
                iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
                iconAlt: "GitHub Logo",
                name: "GitHub",
              },
              {
                iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg",
                iconAlt: "Github Actions Logo",
                name: "Github Actions",
              },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
                    iconAlt: "Kubernetes Logo",
                    name: "Kubernetes",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/helm/helm-original.svg",
                    iconAlt: "Helm Logo",
                    name: "Helm",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg",
                    iconAlt: "Jenkins Logo",
                    name: "Jenkins",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg",
                    iconAlt: "Terraform Logo",
                    name: "Terraform",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg",
                    iconAlt: "Selenium Logo",
                    name: "Selenium",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/k6/k6-original.svg",
                    iconAlt: "K6 Logo",
                    name: "K6",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
                    iconAlt: "Google Cloud Logo",
                    name: "GCP",
                },
                {
                    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
                    iconAlt: "AWS Logo",
                    name: "AWS",
                }
            ]}
          />
            <SkillGroup
                title="Metrics/Logging"
                skills={[
                    {
                        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/splunk/splunk-original-wordmark.svg",
                        iconAlt: "Splunk Logo",
                        name: "Splunk",
                    },
                    {
                        iconSrc: "/datadog.svg",
                        iconAlt: "DataDog Logo",
                        name: "DataDog",
                    },
                    {
                        iconSrc: "/new_relic.svg",
                        iconAlt: "New Relic Logo",
                        name: "New Relic",
                    },
                    {
                        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opentelemetry/opentelemetry-original.svg",
                        iconAlt: "OpenTelemetry Logo",
                        name: "OpenTelemetry",
                    },
                    {
                        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg",
                        iconAlt: "Prometheus Logo",
                        name: "Prometheus",
                    },
                    {
                        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg",
                        iconAlt: "Grafana Logo",
                        name: "Grafana",
                    },
                    {
                        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jaegertracing/jaegertracing-original.svg",
                        iconAlt: "Jaeger Tracing Logo",
                        name: "Jaeger Tracing",
                    },
                    {
                        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg",
                        iconAlt: "Apache Spark Logo",
                        name: "Apache Spark",
                    }
                ]}
            />
          <SkillGroup
            title="DevTools"
            skills={[
              {
                iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jetbrains/jetbrains-original.svg",
                iconAlt: "JetBrains Logo",
                name: "JetBrains",
              },
              {
                iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
                iconAlt: "Postman Logo",
                name: "Postman",
              },
              {
                iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg",
                iconAlt: "Jira Logo",
                name: "Jira",
              },
              {
                iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/confluence/confluence-original.svg",
                iconAlt: "Confluence Logo",
                name: "Confluence",
              },
              {
                iconSrc: "/teams.svg",
                iconAlt: "Teams Logo",
                name: "Teams",
              },
              {
                iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg",
                iconAlt: "Slack Logo",
                name: "Slack",
              },
              {
                iconSrc: "/basecamp.svg",
                iconAlt: "Basecamp Logo",
                name: "Basecamp",
              },
              {
                iconSrc: "/hangout.svg",
                iconAlt: "Google Hangout Logo",
                name: "Hangout",
              },
              {
                iconSrc: "/zoom.svg",
                iconAlt: "Zoom Logo",
                name: "Zoom",
              },
            ]}
          />
            {/* Machine Learning
            <SkillGroup
                title="ML/DL"
                skills={[
                    {
                        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
                        iconAlt: "PyTorch Logo",
                        name: "PyTorch",
                    },
                    {
                        iconSrc: "/lightning.png",
                        iconAlt: "Lightning Logo",
                        name: "Lightning",
                    },
                    {
                        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
                        iconAlt: "ScikitLearn Logo",
                        name: "SciKit Learn",
                    },
                    {
                        iconSrc: "/polars.png",
                        iconAlt: "Polars Logo",
                        name: "Polars",
                    },
                    {
                        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
                        iconAlt: "NumPy Logo",
                        name: "NumPy",
                    },
                    {
                        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
                        iconAlt: "Pandas Logo",
                        name: "Pandas",
                    }
                ]}
            />
            */}
        </div>
      </div>
    </section>
  );
};

export default Skills;
