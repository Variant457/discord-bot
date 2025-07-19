# InfernoMind

InfernoMind is a multifuntional Discord bot designed to be the central control point for the InfernoMind Studios' Discord Server. There are three main functionalities this bot will provide for the server:
- Moderation Services
- Project Management
- Dune Awakening Integration

## Table of Contents
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Commands](#commands)
- [Technical Architecture](#technical-architecture)
- [License](#license)

## Key Features

### 🛡️ Moderation Services
For moderation, this bot must provide the necessary resources to provide moderators with the resources needed to keep the server safe. Most notably are mute and ban functionalities to remove or end any conflicts that arrive.

### 🛠️ Project Management
For project management, this bot will provide helpful tools to have the development team keep track and manage all projects the Studio creates, making it easier to communicate with one another on tasks we need to complete. It will also provide some tools that allow for public notifications for updates on project statuses, a ticket system for bug reports, and any additional tool that can help the Studio communicate either within the team or to the public.

### ⚔️ Dune Awakening Integration
One project for the Studio is to have a Dune Awakening Discord server to provide a third-party roleplaying experience within the game Dune: Awakening. The functionality of this experience will be provided by this Discord bot, which will include a custom quest log for players to create and accept custom-made bounties within the game. This would also require functionality to verify whether users are accepting quests within their game's server and a validation process that the quest poster pays the player the agreed upon amount after completion of the assignment.

## Getting Started

In the future we may have certain modules within the bot be usable for any server but for now we are only focused on building for our server. If we decide to build public modules, we will include the bot's invite link here.

For now, you can use the commands within our server:
[>> Join the InfernoMind Studio's Discord Server Here <<](https://www.discord.gg/UHkbvQWSRn)

## Commands

| Command | Module | Permission Lvl | Description |
|:-------:|:------:|:--------------:|:------------|
| `ping` | Utility | Everyone | Responds with the current server latency |

## Technical Architecture

This project is built using a full CI/CD pipeline:
- **Application:** *node.js, discord.js*
- **Configuration Management:** *Ansible*
- **Infrastructure as Code:** *Terraform*
- **Containerization:** *Docker*
- **Continuous Integration / Continuous Deployment (CI/CD) Automation:** *Jenkins*
- **Container Orchestration:** *Kubernetes*
- **Monitoring & Logging:** *Parmetheus, Grafana*
- **Networking & Infrastructure Services:** *Nginx*

## License

This project is licensed under the **GNU General Public License v3.0**. See the `LICENSE` file for details.
