import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { getThemeColor } from "../functions";
import { Command } from "../types";

const command : Command = {
    name: "verifyembedsend",
    execute: (message, args) => {
        let verifyButton = new ButtonBuilder().setCustomId("verify").setLabel("Verify").setStyle(ButtonStyle.Danger);
        let verifyButtonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(verifyButton)

        let verifyEmbed = new EmbedBuilder().setTitle("Welcome to Lucent~").setDescription(`Here's a quick overview on how to verify:\n\n⤏ Click the button blow and enter the code you're given\n⤏ Hit submit, done!\n\n*Please note that by doing so you accept our server rules*`).setColor(getThemeColor("variable")).setThumbnail("https://cdn.discordapp.com/attachments/1020764310210879541/1021010368950177842/c15b11ebf091b621f978cc5143dc4c4a.jpg")

        message.channel.send({ embeds: [verifyEmbed], components: [verifyButtonRow]})
    },
    cooldown: 10,
    aliases: [],
    permissions: [PermissionFlagsBits.ManageEmojisAndStickers] // to test
}

export default command