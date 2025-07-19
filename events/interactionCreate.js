import {Events, MessageFlags} from "discord.js";

// Listens for commands and executes them
export default {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if(!interaction.isChatInputCommand()) return;   // Ignores all non-Slash commands
    
        // Gets the requested command from our commands
        const command = interaction.client.commands.get(interaction.commandName);
        
        // Ensures the requested command exists
        if(!command) {
            console.error(`No command matching ${interaction.commandName} was found`);
            await interaction.reply({content: `The command ${interaction.commandName} does not exist`, flags: MessageFlags.Ephemeral})
            return;
        }

        // Tries to execute the command and returns an error message if it fails
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);

            if(interaction.replied || interaction.deferred) {
                await interaction.followUp({content: "There was an error while activating this command!", flags: MessageFlags.Ephemeral});
            } else {
                await interaction.reply({content: "There was an error while activating this command!", flags: MessageFlags.Ephemeral});
            }
        }
    },
}