// --- Imports ---
import { SlashCommandBuilder, CommandInteraction, Collection, PermissionResolvable, Message, Client, ChatInputCommandInteraction, Interaction, ButtonInteraction } from "discord.js"



// --- Bot Types ---
export interface SlashCommand {
    command: SlashCommandBuilder | any,
    execute: (interaction : ChatInputCommandInteraction, client: Client) => void,
    cooldown?: number // in seconds
}

export interface Command {
    name: string,
    execute: (message: Message, args: Array<string>, client: Client) => void,
    permissions: Array<PermissionResolvable>,
    aliases: Array<string>,
    cooldown?: number,
}

export interface Button {
    id: string,
    execute: (Interaction: ButtonInteraction, client: Client) => void,
    cooldown?: number
}

export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (...args?) => void
}



// --- Other Types ---
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string,
            CLIENT_ID: string,
            PREFIX: string,
        }
    }
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
        commands: Collection<string, Command>,
        buttons: Collection<string, Button>,
        cooldowns: Collection<string, number>,
        tempwarns: Collection<string, number>,
    }
}