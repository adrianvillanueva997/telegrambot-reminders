import { check_daily_event } from './specialevents';

const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-schedule');

let env = process.env['telegram_bot'];
if (env == undefined) {
  console.log("Error: Environment variable 'telegram_bot' not found.");
  process.exit(1);
}

const bot = new TelegramBot(env, { polling: false });

console.log('Bot has been started ...');

const chatId = -1001063900471;

cron.scheduleJob('0 0 * * *', function () {
  const event = check_daily_event();
  if (event != '') {
    bot.sendMessage(chatId, event);
  }
});

cron.scheduleJob('0 0 * * 4', function () {
  bot.sendMessage(chatId, 'Feliz jueves!');
});
