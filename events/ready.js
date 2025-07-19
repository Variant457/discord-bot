import {Events} from "discord.js";

// Notifies the server when the bot is online and ready to use
export default {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Client is Ready and Logging In as ${client.user.tag}`);
    },
}