// --- Imports ---
import { Client } from "discord.js";
import { readdir, readdirSync } from "fs";
import { join } from "path";
import { color } from "../functions";
import { logger } from "../helpers/logger";
import { Button } from "../types";


// --- Handler ---
module.exports = (client: Client) => {
    let buttonDir: string = join(__dirname, "../buttons");

    // -- File Loader --
    readdirSync(buttonDir).forEach(dir => {
        let directory: string = join(__dirname, `../buttons/${dir}`);

        readdirSync(directory).forEach(file => {
            if(!file.endsWith("js")) return;
            let button: Button = require(`${directory}/${file}`).default

            client.buttons.set(button.id, button);
        })
    })

    logger.startup(`Successfully loaded ${client.buttons.size} buttons!`)
}