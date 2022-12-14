import { Client, Guild } from "discord.js";
import { BotEvent } from "../types";
import { logger } from "../helpers/logger";
import { dbClient } from "../helpers/Database";

const event : BotEvent = {
    name: "guildCreate",
    once: true,
    execute: async (guild: Guild, client : Client) => {
        logger.info(`Joined guild ${guild.name} (${guild.id})`);

        await dbClient.guild.create({ data: {
            guildID: guild.id,
            logging: {
                create: {
                    enabled: false,
                }
            },
            staff: {
                create: {
                    enabled: false,
                }
            },
            verify: {
                create: {
                    enabled: false,
                }
            },
            welcomer: {
                create: {
                    enabled: false,
                }
            }
        }})
    }
}

export default event;