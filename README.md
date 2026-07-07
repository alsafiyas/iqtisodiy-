# Do'kon Hisob-kitob

Do'kon uchun mobil brauzerda ishlaydigan hisob-kitob ilovasi: Xarajat, Foyda,
Qarzdorlar, Ish haqi, Reviziya bo'limlari, umumiy dollar hisoboti, avtomatik
valyuta kursi va xodimlar uchun login/parol tizimi.

Ma'lumotlar **sizning shaxsiy Google Sheets jadvalingizda** saqlanadi — hech
qanday uchinchi tomon serveriga bog'liq emassiz, hammasi sizning Google
hisobingiz nazoratida.

## 1-qadam: Google Sheets backendini sozlash

1. https://sheets.google.com da yangi bo'sh jadval yarating (masalan:
   "Do'kon ma'lumotlari").
2. Yuqori menyudan **Extensions (Kengaytmalar) → Apps Script** ni oching.
3. Ochilgan oynadagi barcha kodni o'chirib, shu papkadagi **`Code.gs`**
   faylining ichidagi kodni to'liq nusxalab joylashtiring.
4. Yuqori o'ngdagi **Deploy → New deployment** tugmasini bosing.
5. Type qismida **Web app** ni tanlang:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. **Deploy** ni bosing, Google ruxsat so'raydi — ruxsat bering (bu sizning
   o'zingizning skriptingiz, xavfsiz).
7. Chiqqan **Web app URL** manzilini nusxalab oling — u shunga o'xshaydi:
   `https://script.google.com/macros/s/AKfycb.../exec`

## 2-qadam: URL'ni ilova koduga joylashtirish

1. `index.html` faylini matn muharriri (Notepad, VS Code va h.k.) bilan oching.
2. Faylning boshida shu qatorni toping:
   ```js
   const SCRIPT_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
3. Tirnoq ichiga 1-qadamda olgan Web app URL'ni joylashtiring va saqlang.

## 3-qadam: GitHub Pages'ga joylash

1. GitHub'da yangi repository yarating (masalan: `dokon-hisobot`).
2. `index.html` faylini (2-qadamda tahrirlangan holda) repository'ga
   yuklang: **Add file → Upload files** → drag & drop → **Commit changes**.
3. Repository ichida **Settings → Pages** bo'limiga o'ting.
4. **Branch**: `main`, papka: `/ (root)` → **Save**.
5. Bir necha daqiqadan so'ng havola paydo bo'ladi:
   ```
   https://<username>.github.io/<repository-nomi>/
   ```
6. Shu havolani xodimlarga yuboring — telefon brauzerida ochib, "Bosh
   ekranga qo'shish" orqali xuddi ilova kabi ishlatishlari mumkin.

## Muhim eslatmalar

- **Kodni yangilasangiz** (masalan, men keyingi safar yangi versiya
  bersam), Apps Script tomonini o'zgartirmasangiz ham bo'ladi — faqat
  `index.html`'ni qayta yuklang, `SCRIPT_URL`'ni saqlab qolishni unutmang.
- Apps Script kodini o'zgartirsangiz, har safar **Deploy → Manage
  deployments → qalam belgisi → New version → Deploy** qilish kerak,
  aks holda eski versiya ishlab turadi.
- Login/parol — bu oddiy himoya (parollar shifrlangan holda saqlanadi),
  lekin bank darajasidagi xavfsizlik emas: manba kodi ochiq bo'lgani
  uchun texnik bilimi bor odam uni chetlab o'tishi mumkin. Kichik do'kon
  jamoasi uchun yetarli, juda maxfiy ma'lumotlar uchun mo'ljallanmagan.
- Google Sheet jadvalini ochib, "Data" varag'ida barcha xom ma'lumotlarni
  (JSON ko'rinishida) ko'rishingiz mumkin — bu sizning zaxira nusxangiz
  hamdir.
