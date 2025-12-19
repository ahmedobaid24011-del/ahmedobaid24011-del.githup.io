# Telegram WebApp Auth

مشروع كامل: بوت تيليجرام + WebApp + API بايثون  
يشمل تسجيل دخول/تسجيل جديد/إعادة كلمة مرور ورفع/استعادة الملفات.

---

## البناء

```
telegram-webapp-auth/
│
├── telegram_bot.py
├── api_backend.py
├── README.md
│
└── client/
    ├── package.json
    ├── public/
    │     └── index.html
    └── src/
         ├── App.js
         ├── index.js
         └── index.css
```

---

## كيف تشغل المشروع؟

### 1. الباك-إند (API)
- تحتاج FastAPI وUvicorn:
  ```
  pip install fastapi uvicorn
  ```
- شغّل الباك-إند:
  ```
  uvicorn api_backend:app --host 0.0.0.0 --port 8000
  ```

### 2. واجهة الويب (React)
- تحتاج node.js وnpm ثم:
  ```
  cd client
  npm install
  npm run build
  ```
- ارفع بناء React على استضافة Static (netlify أو vercel أو سيرفرك).

### 3. البوت
- تحتاج python-telegram-bot:
  ```
  pip install python-telegram-bot
  ```
- غيّر BOT_TOKEN وWEBAPP_URL في telegram_bot.py

  ```
  python telegram_bot.py
  ```

---