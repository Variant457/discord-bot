# Project Overview & Design Document: InfernoMind

- **Project Status:** Pre-Production
- **Document Last Updated:** 2025-07-15

## 1. Introduction

### 1.1 Project Overview

This project is designed to be a helpful tool for the InfernoMind Discord Server to automate some aspects of Server Moderation and Project Management while providing manual tools for administrators. The bot's features will be accessible via text commands and menu navigation to ensure the bot is easy to use and simple to understand. 

The primary goal is to provide additional tools to enhance Discord's server experience beyond the native tools provided by Discord. For moderation, this bot will address the need for persistent logging and an automated moderation system. Logging and automated warning systems can provide fair, evidence-based moderation actions by keeping track of all moderation activities and logging them for server members for future moderative actions by either increasing the strength of punishments on repeated offenses or removing a punishment if an action was incorrectly attributed to a user. There's also issues with moderation between different languages which could be improved through a planned a translation feature to break language barriers not just for moderation but also for the community as a whole. For project management, the bot will provide a centralized system for tracking tasks, providing status updates, and having a ticket system for reporting bugs to have a communication between the development team and the community. 

A secondary goal for this project is for me to learn and understand the basics of DevOps and getting used to writing documentation for my projects and gain an initial understanding for a more professional development experience. To learn DevOps, I am using the following tools:
- Ansible: To initially setup a server for the CI/CD pipeline
- Git / GitHub: GitHub is used to host the code with Git for managing Version Control
- Docker: For containerization of project files so each device uses the same tools and versions when running the code
- Jenkins: For CI/CD Pipeline automation, automating testing and deployment upon a git commit
- Terraform: To automatically deploy a cloud server when needed
- Kubernetes: Manages the containerization of the project while also automating the project's deployment
- Prometheus: For monitoring the project on the Kubernetes Cluster
- Grafana: For compiling the data from Prometheus and generating graphical data on a local domain
- Nginx: To allow my main PC to connect to the Kubernetes IP with a domain name to view Grafana's graphical data

### 1.2 Project Scope

To complete these goals, our objective is to design a Discord bot that can bridge the gap between developers and the community while ensuring a safe community in the process. This will be done in several phases, the first phase being to reach a Minimal Viable Product which will provide the essentials to reach this objective which is expected to be finished over the next two weeks. As we approach the end of this phase, we will plan the next phases, but in the future, we will improve the bot's functionality to further achieve this objective; For example, in the future we plan on developing a live translation feature to remove language barriers in the server, although the details will be planned later. Overall, we hope this will benefit the community by providing a tool that can allow for a more easier and straightforward development process while listening to and bringing their ideas into these projects. 

This project will need several resources to reach our goal. For our Jenkins Agent, we will be using a Raspberry Pi 5 with an NVMe SSD drive. This will allow for a device that can act as a home server that will always be on to listen for Jenkins commands when there is an update to the project. We will also need a cloud server to host the bot, which we have chosen Google Cloud as a provider. Since we will be hosting the bot in a Kubernetes Cluster, a Google Kubernetes Engine (GKE) would be great for this project. The SSD on the Jenkins Agent will greatly increase the processing speed to ensure quick communication between the Jenkins Controller (my main PC) and the GKE for a fast testing process and quick deployment. 

Currently, this is a solo project but in a future phase I will investigate making the project into an open-sourced project with the community. This will be done once I understand the DevOps for the project (a goal of Phase 1) and can focus on how I can change the setup to support open-sourced development. The work required for this phase is listed in [Section 4](#4-project-plan--timeline) with any associated risks listed in [Section 5](#6-risk-management)

## 2. Technical Requirements

### 2.1 Functional Requirements

The following functional requirements define specific features needed to reach our goals for this project. They are organized by the release version in which these features will be launched to outline a developmental path towards the Minimum Viable Product. The initial pre-production release is designed to establish a testable product for our CI/CD pipeline without focusing on the specifics of the bot yet to ensure the pipeline is set up correctly. The alpha release will introduce the essential moderation tools the server will need to enhance administration and server saftey. The v1.0 release is designed to introduce basic project management features to allow for more transparency with projects as well as allow for effective communication between the development team and the community. Each requirement listed below are the bare essential features that are needed to meet the project's primary objective of improving server moderation and community engagement. 

#### Version 0.1.0-pre-production

- [x] Implement a Latency Command for debugging

#### Version 0.2.0-alpha

- [ ] Implement a Warn system for moderation
- [ ] Implement a Mute system for moderation
- [ ] Implement a Ban system for moderation
- [ ] Implement a Logging system for moderation
- [ ] Implement a Ticket system for moderation

#### Version 1.0.0

- [ ] Implement a Ticket system for bug reports and suggestions
- [ ] Implement an announcement system for project updates

### 2.2 Non-Functional Requirements

The following non-functional requirements define the qualities necessary for this project. Performance and Usability are necessary requirements to ensure quality responses for users, Avaliability is necessary for the longivity of the project, and Security is neccessary to ensure the right users have access to the commands they need.  

**Performance**
- *Low Latency*: Must ensure fast responses for users
- *Minimal Resources*: Needs to be able to run with minimal resources for hosting purposes

**Avaliability**
- *24/7 Access*: Must be running 99.9% of the time to ensure features are active at any time of the day
  - *Self-Healing*: Must have self-healing capabilities to attempt to automatically bring the bot online if a crash occurs

**Security**
- *Access Control*: Needs to have access control within certain commands, specifically moderation commands

**Usability**
- *Command Clarity*: All command names need to be self-descriptive to ensure clear understanding of what the command will do
- *Error Handling*: Any errors that occur must be communicated to the user to tell them that their command didn't work as expected

## 3. Architecture & Processes

### 3.1 Software Product Development

Phase 1 of this project is entirely built with JavaScript integrated with Node.js and using the discord.js library. For version control we will be using GitHub. The project will be ran on a Google Kubernetes Engine for self-deployment and self-healing capabilities. Jenkins is used to run updates to the project through the automated testing and deployment process; the Jenkins Controller will be ran on my main PC while the Jenkins Agent will be ran on a Raspberry Pi 5 with a Debian Linux operating system. All commits to the GitHub signal Jenkins to run the Jenkinsfile on the Jenkins Agent for the CI/CD pipeline. Upon sucessful testing, Jenkins will signal the Kubernetes Cluster to deploy the updated project. 

### 3.2 High-Level Architecture

This project has three main environments:
- **Control Node (Main PC):** A computer using Windows 11 OS which will be running the Jenkins Controller, Ansible, and Terraform
- **Jenkins Agent (Home Server):** A Raspberry Pi 5 running Raspberry Pi Lite OS (Bookworm, a Debian Linux based OS) which will be acting as the Jenkins Agent to build Docker images for testing and using kubectl to deploy updates
- **Production Cluster (GKE):** A Google Kubernetes Engine which will be running the Discord Bot application and Prometheus and Grafana for monitoring within a Kubernetes Cluster

### 3.3 Version Control

This project utilizes Git for version control with the repository hosted on GitHub. Our approach to version control is to maintain a stable main branch for the project while allowing for agile development and leaving it open for community contributions. 

Our ***branching strategy*** consists of having a `main` branch that should always remain stable and carry the current production release for the project. During development, we will have seperate branches for each feature in development, organized by the purpose of the feature in production. Some example branches consist of `moderation/mute-command`, `moderation/logging`, and `project-mgt/ticket-system`. All commits are made to these feature branches during development. Once a feature is completed, it will be merged with the archetype containing the feature (ex: `moderation` & `project-mgt`). Once all the features are completed for the next release, all updated archetypes are merged with the main branch for deployment. For ***integration***, we will rely on GitHub Pull Requests to activate Jenkins. When a Pull Request is opened for a feature to its archetype, Jenkins is triggered to automatically run tests on the feature. Jenkins is also triggered when a Pull Request is opened for the `main` branch after the project is feature-complete which will automatically run tests for the entire update release. Afterwards, a code review is performed to ensure the features are ready to be merged.

For ***version naming***, we will follow Semantic Versioning (ex: `v1.2.4`). Official releases are marked with a corresponding Git tag, which then triggers Jenkins to deploy the update. 

### 3.4 CI/CD Process Flow

<!-----
This project's CI/CD process is built around the branching strategy defined above with two primary automation flows triggered by actions in GitHub:

1. Pull Request Validation Flow (CI):
  This flow acts as a quality gate before any code is integrated.
  - Trigger: A Pull Request is opened to merge a feature branch into an archetype branch, or an archetype branch into the `main` branch
  - Action: Jenkins automatically checks out the proposed code changes
  - Process: The pipeline executes the initial stages, including installing dependencies and running all unit tests
  - Outcome: Jenkins reports a "pass" or "fail" status back to the GitHub Pull Request. No deployment occurs. This provides immediate feedback to the developer and ensures that only tested code is approved for merging

2. Deployment Flow (CD):
  This flow automates the release of the application to the production environment.
  - Trigger: A commit is successfully merged into the main branch
  - Action: Jenkins starts the full deployment pipeline on the agent server
  - Process:
    1. Test: Runs all unit tests again to ensure integrity
    2. Build: Builds a new, version-tagged Docker image of the bot application
    3. Publish: Pushes the new Docker image to a central container registry (ex: Docker Hub)
    4. Deploy: Uses kubectl to trigger a zero-downtime rolling update on the GKE cluster, deploying the new version.-------->

TBD - After Task 3 for Verification

## 4. Project Plan & Timeline

Our project will be separated into different tasks within different phases; Phase 1 is designed to develop the essentials within Moderation and Project Management for a Minimal Viable Product which is expected to be release on `August 8th, 2025`. The tasks for Phase 1 are listed below with their respected deadlines and deliverables:

#### Phase 1

- [x] **Task 1:** Project Documentation
  - Details: Conceptualize the project within documentation
  - Deliverables: *`README.md`*, *`PROJECT_OVERVIEW.md`*
  - Deadline: `2025-07-15`
  - Benefits: Having centralized documentation for complete project understanding
- [x] **Task 2:** Initial Bot Setup - `v0.1.0-pre-development`
  - Details: Getting the initial project setup with a latency command to have a hostable product
  - Deliverables: *`package.json`*, *`main.js`*
  - Deadline: `2025-07-19`
  - Benefits: Gives an initial project that we can use to test each step of the CI/CD pipeline process
- [ ] **Task 3:** CI/CD Pipeline Setup
  - Details: Using Ansible, Docker, Jenkins, Kubernetes, Terraform, Prometheus, Grafana, and Nginx to setup the servers in use and create an automated pipeline through these applications
  - Deliverables: *`Dockerfile`*, *`Jenkinsfile`*
  - Deadline: `2025-07-28`
  - Benefits: This pipeline will allow us to automate testing processes and deployment when there are commits to the GitHub repository
- [ ] **Task 4:** Initial Moderation Release - `v0.2.0-alpha`
  - Details: Adds moderation features to the Discord bot, consisting of a warn system, a mute system, a ban system, moderation tickets, and moderation logging
  - Deliverables: *`moderation.js`*
  - Deadline: `2025-08-01`
  - Benefits: Enhances the InfernoMind Discord Server by allowing for automated moderation systems to help protect the server
- [ ] **Task 5:** Minimal Viable Product: Initial Project Management - `v0.1.0`
  - Details: Adds bug report and suggestion tickets and project status update systems to allow for communication from the community to the developers. This would mark the first main release for the Discord bot with all the core functionality for the Discord server but future updates are planned
  - Deliverables: *`project_management.js`*
  - Deadline: `2025-08-08`
  - Benefits: This will allow for a more direct communication between the community and developers to ensure issues are being reported and any suggestions can be considered. Will also allow for updating announcement messages to be transparent with any changes (ex. deadlines) or any new updates or projects are planned

## 5. Budget

TBD - After Task 3

## 6. Risk Management

There are several risks that are involved that can be organized in the following categories: Technical, Security, Financial, and External. Technical Risks can be defined as risks that can inhibit the project, either the code itself or the processes to update the code. Security Risks can be defined as risks that has the possibility of mallicious actors interupting the systems. Financial Risks can be defined as risks that can place the project outside of the designated budget. External Risks can be defined as risks that are outside factors that can interrupt the project. The risks for this project are listed in the table below:

| Risk ID | Risk Description | Category | Risk Likelihood | Risk Impact | Mitigation & Monitoring Plan |
|:-------:|:-----------------|:--------:|:---------------:|:-----------:|:-----------------------------|
| **R-01** | The Home Server going offline either from a power outage or moving locations | ***Technical*** | **Medium** | **Medium** | **Plan:** Notify community of any development delays and immediately turn the server back on when power becomes avalible again |
| **R-02** | A critical Hardware failure occuring on the Home Server | ***Technical*** | **Low** | **Medium** | **Plan:** View server logs to see why the error occured to attempt to fix it. As a last resort we can reset the server by reinitializing it with our Ansible playbook |
| **R-03** | A software bug gets past the testing process | ***Technical*** | **Low** | **Low** | **Plan:** Investigate the issue and determine it's severity. Afterwards come up with a plan to patch the bug. <br> <br> **Monitor:** View tickets from bug reports in the Discord Server |
| **R-04** | Google's Cloud Free Trial ends while running a Google Kubernetes Engine | ***Financial*** | **High** | **High** | **Plan:** Mitigate a plan to either review the bot's budget or move the project to a different engine. Notify the community of any possible shutdowns. <br> <br> **Monitor:** Review monthly Google Cloud Engine usage and trial end date |
| **R-05** | A change in Discord's REST API or a change in discord.js interrupts certain features for the project | ***External*** | **Low** | **High** | **Plan:** Determine what the issue is and notify the community of any broken features. Then determine a plan to fix the features based on the severity of the problem |

## 6. Testing Strategy

TBD - After Task 3

## 7. Contributions

### 7.1 Contributor Guidelines

TBD - After Phase 1

### 7.2 Contributors

TBD - After Phase 1
