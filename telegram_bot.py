import logging
from telegram import Update, ReplyKeyboardMarkup, KeyboardButton, WebAppInfo
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

BOT_TOKEN = "8577883674:AAHdl9x4VIg1pzarV-YkgtoBZEaIa_yWEfM"  # استبدلها بتوكن بوتك
WEBAPP_URL = "https://telegram-webapp-auth.vercel.app/"  # غيّرها لرابط استضافة React

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO
)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    kb = [
        [KeyboardButton("افتح التطبيق", web_app=WebAppInfo(url=WEBAPP_URL))]
    ]
    await update.message.reply_text(
        "اضغط على الزر في الأسفل لفتح التطبيق 👇",
        reply_markup=ReplyKeyboardMarkup(kb, resize_keyboard=True)
    )

def main():
    app = ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    print("Bot Running ...")
    app.run_polling()

if __name__ == "__main__":
    main()