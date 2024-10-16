const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUxWT3RPWjQxRHJFVmJURWs4bUVzNlAzVnhWcUhIVjBxNmdxZXp5cU9Fbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTFpqYzVvVVBoZXVFYWd5V25NWElCaU9oSXJuKytJbk5IK0UvdEdiRDl3RT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRQTZkMlJtMHhZSEs0RE5Gc2E4SmU1OWgvTi9NVnpKRG52TGU5RGl2bzFjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkU3Q2R3lFbGQxZU55b21OUGl1QityTGxFQjd4K3kyUHNSczhCNkczRjFJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklHeVlnTkNvblRiZ0U5SkRlWTBaQmUyL3RBNEtsV2JySzBNcGFYeEhSRjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNCVk1hdDRYbDFrcEN1QVp5eHBpdzJYVk91VmdONmhRZXdnclozNWI4VHM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0R5ZjZVQVhJODRVWjNEVVZQUVBvWXRoYWsyYTBLc1FaWTAxc1pRTUpHWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaEE3eTdTSmlxS2NEamc2Z1lBam5GWDIxS3MvVUVkdGxoUStsWkFocURuWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFuNTk0VUZzZzljaTcycHFYUkVpODRsOTNBTXF6RkVYRWFiM0toWXIwV0VuTTJIQWlwWU1FTkhJUFlCcGJvcVJUU1crNVFkaENZVkdFZi9PTFBvbEJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTUxLCJhZHZTZWNyZXRLZXkiOiJBV1ZrNW4vSVZpK3ZKRi9YYWtCcmgrZEswWFAzeXE5UWlNaWpRWmFqcmpjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJCdHVjdjg5R1FiRzl6QVIzcFJqWE9nIiwicGhvbmVJZCI6IjA5MjZiZmQ3LTNkMjQtNGZlZC04MWIwLTYwMWYzODc0NTBlOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0VWVqNzVPU1BrK3orbVFXeVJzKzVhaWdEaTQ9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVkNGNCQUxjZ1IvbnFWRmo3MHFGc0V2MW5sST0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0txcXpac0hFTUxOd0xnR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImcycWl0N3MydkVSdVdRVXpTWFlzcnlpZnJNekFZZ0RzWWpvdWpQZWRtVWM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlpNRDVtODdTVkpLMmRZeXF2Z2xaa2JUY0NBTDVpS00wdGxqdkJzaGhnbWxjK3FiZkI5L1NoVXRRR3R1ellIQzVKV1lMNUo2MFZRbCtLZ1hOYkt5akNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ0OHFDYlZraHJVWDY5SW9PVVd3c2ZxVU5vNVpVMG9lUTNTRjQrdGJGUEFMRngvQ3A3QUlLMk5PajZkM0pFL21LVURaT3UvSXh4ZHNmNkhyMVZGVWtEUT09In0sIm1lIjp7ImlkIjoiMjM0NzAzNTg1NTI4Mzo1MEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJPbGEifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0NzAzNTg1NTI4Mzo1MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZTnFvcmU3TnJ4RWJsa0ZNMGwyTEs4b242ek13R0lBN0dJNkxvejNuWmxIIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI5MTExNzQ5fQ==',
    PREFIXES: (process.env.PREFIX || '!').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "𝕆𝕝𝕒😈🦍 MD",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2347035855283",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Lagos',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
