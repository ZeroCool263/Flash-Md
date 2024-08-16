const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1BhT2ZmNWV6WnpkOFdUeW54OXk0TnJQcXVpY01IT1BOZG1IOExNRDJsUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRGtmQnJqSkRLZEw3U2NQbFF0NzI5TTVYeHl5T0RleC95VDhJdlptTGFRQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFQjFONW9BRVY4dnc0UE5uY2s2dmo2eGVEdEFBZ3R6NngySXFKN0tZNDNvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvYXFvalVNR1JCVzVwdzVLcE9UWnFxSWtobVNXVUV2T3V0SnFMY2NUZUg0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1PNFZHbXZBUi8vVjVyT0ZjMFN6cWF1OThoM3JJTGtSZzJ2ZzcwOXpJV0k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImU4RzAxVUcwTzhHSmF6OE9hWk1Xb3VQUlJXc3ViODZ2NllJb1FxaHpXeUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0N0Und1ZVdOdUpUaVozc2swZllieFlZenU3MnZMOEF2RmtDT1QrR2RGdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUJjOTBUZDhZK1BkMHdpMkQ4WEFyQjEzd0tXQ2ZDZldKd0cxZHdYTFBTZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFOdlUxRHdibWJ5VWcvNjBwTVpUZ3ZpcnBOWnVsTC9XNlR3WHpaWVN3aFdDVmZJOFRibEQwTHpCSVJLTmx4QWQ2aUlKTi9LUDZwd3VYVzFrdFVyekFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc5LCJhZHZTZWNyZXRLZXkiOiJWT3hqd2RWaUttclVwYTB2ZDY3QTBZR3NObkVrcVZFVHpSTW1PSUQ1bnFNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJEQjlJWF82WlE2eXdNRTEzemVOdW13IiwicGhvbmVJZCI6IjEzNDAxYWMzLTUxN2EtNGFiMC04YzE5LTliODNiNTYyNjNlOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1Z1FuWmtkYTNmaHdxdnJuR3VZTklYcXIrdUE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZDBVZXRwQTkxc3B5dmUwS2dWNnhIbHgycVNBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjVONThGWUhEIiwibWUiOnsiaWQiOiIyMzM1OTk2NjI4ODk6NDFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSkFZIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKZVhndVlGRUxiQytyVUdHQVVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ5SXJKTnhQd0l2M0Z2V3RWV3p0RDAxdlRLemNnZFJpSDZHS0t0Z3dDOVVvPSIsImFjY291bnRTaWduYXR1cmUiOiJWYmpROEcwdVc1RXBjRjY1YVFDOWorbDBWNHBVQ29BbEJ4cDZHRTNKZTYzTGZadHlPWnlsY2ZOWUx4Smt0RG5WR2RLd2NTQVJxSWZmUXFEMFlnRHVBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiYzRKbUlkeEFPeC82SjVuWG5zbWtzelFSeHF6ckJNZXB6eS9mWFo0YnJ5RThhTklhQTlPNEdhNENiNXc2c0xSRVpBTDNGam56aDd5dWlzWEUxaW9tQlE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzM1OTk2NjI4ODk6NDFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY2lLeVRjVDhDTDl4YjFyVlZzN1E5TmIweXMzSUhVWWgraGlpcllNQXZWSyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzc2OTE1NCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGS1MifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Zero Cool",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "263712473551", 
    A_REACT : process.env.AUTO_REACTION || 'off',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
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
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
