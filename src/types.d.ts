// --- Imports ---
import { SlashCommandBuilder, CommandInteraction, Collection, PermissionResolvable, Message, Client, ChatInputCommandInteraction, Interaction, ButtonInteraction, GuildMember } from "discord.js"



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



// --- Event Types ---
export type loggingEvent = "ban" | "kick" | "change" | "join"
type changedSetting = "inviteManager" | "welcomer" | "verify" | "logging" | "staff"

interface banEventOptions {
    user: GuildMember,
    bannedBy: GuildMember,
    reason: String,
}

interface kickEventOptions {
    user: GuildMember,
    bannedBy: GuildMember,
    reason: String,
}

interface changeEventOptions {
    user: GuildMember,
    changed: changedSetting,
}

interface joinEventOptions {
    member: GuildMember,
}

export interface loggingEventOptions {
    trigger: loggingEvent,
    data: banEventOptions | kickEventOptions | changeEventOptions | joinEventOptions
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