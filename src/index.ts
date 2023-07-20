import { check_daily_event } from './specialevents';

const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-schedule');

let env = process.env['telegram_bot'];
const bot = new TelegramBot(env, { polling: false });

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
