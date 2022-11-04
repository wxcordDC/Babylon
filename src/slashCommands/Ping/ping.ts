import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { getThemeColor } from "../../functions";
import { SlashCommand } from "../../types";

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Shows the bot's ping")
    ,
    execute: (interaction, client) => {
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setAuthor({name: "Lucent - Ping"})
                .setDescription(`🏓 Pong! \n 📡 Ping: ${interaction.client.ws.ping} for ${client.user?.username}`)
                .setColor(getThemeColor("text"))
            ]
        })
    },
    cooldown: 10
}

export default command