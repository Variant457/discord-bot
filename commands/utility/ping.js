// eslint-disable-next-line no-unused-vars
import { SlashCommandBuilder, ChatInputCommandInteraction} from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Sends current server latency."),
        
    /**
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const sent = await interaction.reply({content: "Pinging", withResponse: true});
        await interaction.editReply({content: "Pinging.", withResponse: true});
        await interaction.editReply({content: "Pinging..", withResponse: true});
        await interaction.editReply({content: "Pinging...", withResponse: true});
        await interaction.editReply({content: `**Websocket Heartbeat:** ${interaction.client.ws.ping}ms\n**Roundtrip Latency:** ${sent.resource.message.createdTimestamp - interaction.createdTimestamp}ms`})
    },
};
