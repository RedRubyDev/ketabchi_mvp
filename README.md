# Ketabchi MVP 📚

شبکه اجتماعی کتاب‌خوان‌های ایرانی (MVP)

## نحوه اجرا
1. کپی فایل env:
   `cp .env.example .env`
2. اجرای دیتابیس با داکر:
   `docker-compose up -d postgres`
3. نصب پکیج‌ها:
   `npm install`
4. ایجاد دیتابیس:
   `npx prisma db push`
5. اجرای پروژه:
   `npm run dev`
