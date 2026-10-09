# SANO-STANDART — sayt va kitoblar katalogi

Bu ZIP mustaqil, ishga tushadigan sayt loyihasidir. Eski sano.uz sayti o‘zgartirilmagan.

## Tez ishga tushirish

1. Kompyuterga **Node.js 24 yoki undan yangi** versiyani o‘rnating: https://nodejs.org/
2. ZIP faylni oching. Terminalni `sano-standart` papkasida oching.
3. Admin yarating: `npm run admin`. Login va kamida 12 belgili yangi parol kiriting. Terminalda parol ko‘rinadi — uni boshqalar ko‘rmaydigan joyda kiriting. ZIP ichida tayyor admin paroli yo‘q.
4. Saytni ishga tushiring: `npm start`.
5. Brauzerda **http://localhost:3000** ni oching.
6. Admin panel: **http://localhost:3000/admin**.

Tashqi npm paketlari talab qilinmaydi; `npm install` zarur emas. Python faqat eski saytdan kontentni qayta olish uchun kerak; oddiy ishlatishda talab qilinmaydi.

## Ichida nima bor?

- O‘zbek, rus, ingliz tillaridagi menyu, sahifalar va buyurtma jarayoni.
- Barcha sahifalarda oq/qora rejim; tanlov eslab qolinadi.
- Eski saytdan 111 ta kitob va ularning mavjud muqovalari.
- Qidiruv, kategoriya, til, narx va qoldiq filtrlari; saralash, sahifalash.
- Kitob sahifasi, savat, menejer tasdiqlaydigan buyurtma.
- Chop etish uchun alohida so‘rov formasi.
- Admin: kitob qo‘shish, tahrirlash, yashirish, arxivlash, qayta faollashtirish, narx va qoldiq, rasm yuklash, uch tilli matnlar.
- Sahifalar, xizmatlar, uskunalar, sertifikatlar, hamkorlar va sayt sozlamalarini boshqarish.
- Qoralama, CSV import/eksport, ommaviy holat almashtirish, media fayllar, buyurtma holatlari va amallar tarixi.
- SQLite bazasi: ma’lumotlar server qayta ishga tushganda yo‘qolmaydi.

## Muhim ishlash tartibi

### Kitoblar
`published` — ko‘rinadi; `hidden` — yashiriladi; `draft` — qoralama; `archived` — arxiv.

Arxivdagi kitobni tahrirlab `published` holatiga qaytarish mumkin. Narx bo‘sh bo‘lsa “Narx so‘rov asosida” ko‘rinadi. Qoldiq bo‘sh bo‘lsa mavjudlik menejer tomonidan tasdiqlanadi; 0 bo‘lsa buyurtma tugmasi o‘chadi. Saytda ko‘rinish va buyurtma berishga ruxsat alohida boshqariladi.

Kitobni arxivlash eski buyurtmalardagi nom/narxni o‘zgartirmaydi. Buyurtma avtomatik zaxira ajratmaydi va qoldiqni kamaytirmaydi: menejer tasdiqlash paytida qoldiqni moslashtiradi. Buni to‘lovsiz, menejer bilan kelishiladigan savdo jarayoni sifatida ishlating.

### Barcha kontentni o‘zgartirish
Oddiy kitob maydonlari tahrirlash formasida. Qo‘shimcha maydonlar va sayt sozlamalari “Barcha maydonlar (JSON)” bo‘limida. O‘zgartirgach “JSON ni qo‘llash”, so‘ng “Saytga saqlash” tugmasini bosing.

- `navigation` — menyu bo‘limlari tartibi; yangi sahifaning ID sini ham kiritish mumkin.
- `settings.main.sections` — bosh sahifa bo‘limlarining tartibi.
- `hiddenSections` — yashiriladigan bo‘limlar kalitlari.
- `hero`, `subtitle`, `heroLabel`, `seo` — `uz`, `ru`, `en` matnlari.
- `phone`, `address`, `orderPhones`, `requisites` — aloqa va rekvizitlar.
- `logo` — media bo‘limidan olingan rasm manzili.

Qoralama saqlanganda eski nashr qilingan matn joyida qoladi. Yangi yozuv qoralamasi avtomatik yashiriladi. Uni ochib “Saytga saqlash” orqali e’lon qiling.

### Buyurtmalar
Buyurtma haqiqiy bazaga yozilgandan so‘ng raqam chiqadi. Online to‘lov yoki Telegram bildirishnomasi ulanmagan; buyurtmalar admin panelda ko‘rinadi. Narx/mahsulot mavjudligi va yetkazish shartlarini menejer telefon orqali kelishadi. Yetkazish narxi hisobga avtomatik kiritilmaydi.

## Kontent holati

`data/migration-report.json` — import sonlari va yuklash xatolari.
`data/legacy.json` — eski sahifalardan olingan asl matn va manbalar.
`data/books.json`, `data/content.json` — birinchi ishga tushish uchun boshlang‘ich ma’lumotlar.

Eski saytda yo‘q narx, muallif, ISBN, qoldiq va ishlab chiqarish raqamlari o‘ylab topilmagan. Asl kitob nomlari va matnlari saqlangan. Asl kitob tavsiflari to‘liq tarjima qilinmagan: admin orqali tekshirib tahrirlang. Eski saytdagi telefonlar, rekvizitlar, hamkorlikning dolzarbligi va sertifikat amal qilish muddatini nashrdan oldin tekshiring. Figma skrinshotining uslubidan foydalanilgan; uning to‘liq loyiha fayliga kirish bo‘lmagan.

## Hostingga joylash

Node.js 24 ishlatadigan VPS yoki persistent diskli Node hosting kerak. Bu loyiha oddiy HTML hosting yoki PHP-only hostingda server qismini ishlata olmaydi.

- `HOST=0.0.0.0`, `PORT=3000`.
- `PUBLIC_ORIGIN=https://your-domain.uz` — haqiqiy domen, oxirida `/` bo‘lmasin.
- `COOKIE_SECURE=1` — HTTPS orqali ishlatilganda.
- `DATA_DIR=/absolute/persistent/sano-data` — doimiy diskdagi baza/media.
- Server oldida HTTPS reverse proxy (masalan Nginx) va process manager sozlang.
- `var/` yoki tanlangan `DATA_DIR` papkasini ochiq web papkaga ko‘chirmang.
- `.env.example` namuna; qiymatlarni hosting environment sozlamalariga kiriting. `.env` avtomatik o‘qilmaydi; Node 24 da `node --env-file=.env server.mjs` ishlatish mumkin.
- Kontaktlar va narxlarni tekshirgach, haqiqiy domenga bog‘lang.

Docker uchun: `docker compose run --rm sano node scripts/create-admin.mjs`, keyin `docker compose up -d`. Birinchi buyruq uchun terminal interaktiv bo‘lishi kerak.

## Zaxiralash

Serverni to‘xtating, `var/` papkasini (yoki `DATA_DIR`) to‘liq nusxalang. SQLite baza, yuklangan rasmlar, admin hisoblari va buyurtmalar shu yerda. Serverni yana yoqing. Zaxirani ommaviy ZIP yoki Git omboriga qo‘ymang. Tiklashda serverni to‘xtatib zaxirani qaytaring.

## Tekshirish

`npm test` — vaqtinchalik alohida bazada autentifikatsiya, CSRF, buyurtma, takroriy yuborish, qoldiq, yashirilgan kitob, qoralama va qayta ishga tushgandan keyingi saqlanishni tekshiradi.

## Eski saytdan qayta import

`python -m pip install beautifulsoup4 pillow`

`python scripts/import_legacy.py`

`python scripts/seed_content.py`

Bu buyruqlar boshlang‘ich JSON fayllarni yangilaydi. Ishlayotgan bazani avtomatik ustidan yozmaydi. Amaldagi saytni yangilash uchun admin CSV importdan foydalaning. Ishlayotgan bazani o‘chirib qayta seed qilish buyurtmalarni yo‘qotadi — bunday qilmang.

## Tuzilishi

- `server.mjs` — HTTP API, admin sessiyalar, fayllar va buyurtma tekshiruvlari.
- `db.mjs` — SQLite, jadval yaratish va boshlang‘ich ma’lumotlar.
- `public/` — responsive interfeys, dizayn, 3 til va media.
- `scripts/` — admin yaratish va eski sayt importer.
- `tests/` — asosiy funksional tekshiruvlar.

Loyiha Node.js va oddiy JavaScript bilan yozilgan; Node SQLite moduli ishlatiladi. Tashqi frontend framework yo‘qligi ZIPni oson ishga tushirishga yordam beradi. Antigravity’da papkani ochib rivojlantirish mumkin.
