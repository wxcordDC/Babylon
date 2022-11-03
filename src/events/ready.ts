import { Client } from "discord.js";
import { BotEvent } from "../types";
import { color } from "../functions";
import { logger } from "../helpers/logger";

const event : BotEvent = {
    name: "ready",
    once: true,
    execute: (client : Client) => {
        logger.success(`Logged in as ${client.user?.username}`);
    }
}

export default event;