import {REST, Routes} from "discord.js";
import config from "./config.json" with {type: "json"};
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath, pathToFileURL} from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Grabs all the commands from our folders
const commandPromises = [];
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);
for(const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
    for(const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const fileURL = pathToFileURL(filePath);
        commandPromises.push(import(fileURL).then((module) => ({module, filePath})));
    }
}

const loadedCommands = await Promise.all(commandPromises);  // Wait for commands to resolve

// Loads all the commands to an array
const commands = [];
for(const {module, filePath} of loadedCommands) {
    const command = module.default;
    if(command && "data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
    }
}

// Constructs a REST instance
const rest = new REST().setToken(config.token);

// Deploys our commands
(async () => {
    try {
        console.log(`Starting refreshing ${commands.length} application commands`);

        // Refreshes all global commands
        const data = await rest.put(
            Routes.applicationCommands(config.clientID),
            {body: commands},
        );

        console.log(`Successfully reloaded ${data.length} application commands`)
    } catch (err) {
        console.error(err);
    }
})();