import { ChannelType, Client, Message } from "discord.js";
import { checkPermissions, sendTimedMessage } from "../functions";
import { BotEvent } from "../types";

const event: BotEvent = {
    name: "messageCreate",
    execute: async (message: Message, client: Client) => {
        if (!message.member || message.member.user.bot) return;
        if (!message.guild) return;
        let PREFIX = process.env.PREFIX;

        if (!message.content.startsWith(PREFIX)) return;
        if (message.channel.type !== ChannelType.GuildText) return;

        let args = message.content.substring(PREFIX.length).split(" ")
        let command = message.client.commands.get(args[0])

        if (!command) {
            let commandFromAlias = message.client.commands.find((command) => command.aliases.includes(args[0]))
            if (commandFromAlias) command = commandFromAlias
            else return;
        }

        let cooldown = message.client.cooldowns.get(`msg-${command.name}-${message.member.user.username}`)
        let neededPermissions = checkPermissions(message.member, command.permissions)
        if (neededPermissions !== null)
            return sendTimedMessage(
                `
            You don't have enough permissions to use this command. 
            \n Needed permissions: ${neededPermissions.join(", ")}
            `,
                message.channel,
                5000
            )


        if (command.cooldown && cooldown) {
            if (Date.now() < cooldown) {
                sendTimedMessage(
                    `You have to wait ${Math.floor(Math.abs(Date.now() - cooldown) / 1000)} second(s) to use this command again.`,
                    message.channel,
                    5000
                )
                return
            }
            message.client.cooldowns.set(`msg-${command.name}-${message.member.user.username}`, Date.now() + command.cooldown * 1000)
            setTimeout(() => {
                message.client.cooldowns.delete(`msg-${command?.name}-${message.member?.user.username}`)
            }, command.cooldown * 1000)
        } else if (command.cooldown && !cooldown) {
            message.client.cooldowns.set(`msg-${command.name}-${message.member.user.username}`, Date.now() + command.cooldown * 1000)
        }

        command.execute(message, args, client)
    }
}

export default event