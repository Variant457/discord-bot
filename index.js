import fs from "node:fs";
import path from "node:path";
import {Client, Collection, GatewayIntentBits} from "discord.js";
import config from "./config.json" with {type: "json"};
import {fileURLToPath, pathToFileURL} from "node:url";

const bot = new Client({intents: [GatewayIntentBits.Guilds]});  // Creates Discord Client
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Grabs the project directory

bot.commands = new Collection(); // Adds new commands property for easy command access

// Loads all commands to the client.commands property
/**
 * @param {Client} client 
 */
async function importCommands(client) {
    const commandPromises = [];
    
    // Loads all commands to the Promise array
    const foldersPath = path.join(__dirname, "commands");
    const commandFolders = fs.readdirSync(foldersPath);
    for(const folder of commandFolders) {
        const commandPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandPath).filter((file) => file.endsWith('.js'));
        for(const file of commandFiles) {
            const filePath = path.join(commandPath, file);
            const fileURL = pathToFileURL(filePath);
            commandPromises.push(import(fileURL).then((module) => ({module, filePath})));
        }
    }

    const loadedCommands = await Promise.all(commandPromises);   // Wait for all Promises to resolve

    // Loads all the pulled commands into the client's commands property
    for(const {module, filePath} of loadedCommands) {
        const command = module.default;
        if(command && "data" in command && "execute" in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required 'data' or 'execute' property`);
        }
    }
}

// Loads all events
/**
 * @param {Client} client 
 */
async function importEvents(client) {
    const eventPromises = [];

    // Loads all events to the Promise array
    const eventsPath = path.join(__dirname, "events");
    const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));
    for(const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const fileURL = pathToFileURL(filePath);
        eventPromises.push(import(fileURL));
    }

    const loadedEvents = await Promise.all(eventPromises);  // Wait for all Promises to resolve

    // Loads all the pulled events to the client
    for(const module of loadedEvents) {
        const event = module.default;
        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else client.on(event.name, (...args) => event.execute(...args));
    }
}

// Logs into Discord
await importCommands(bot);
await importEvents(bot);
bot.login(config.token);