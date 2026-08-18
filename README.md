# Salt & Stem — restaurant/cafe website template

Статический сайт: `index.html` + `css/style.css` + `js/script.js`.
Без сборщиков, без зависимостей.

## Локальный запуск
```
python3 -m http.server 5500
```
Открыть http://localhost:5500

## Что заменить перед продажей клиенту
- Название, тексты, позиции и цены меню в `index.html` (`#menu`)
- Фотографии — сейчас временные, с Unsplash
- Адрес и часы работы в `#hours`
- Цвета — токены в начале `css/style.css` (`:root`)
- Форма бронирования не подключена к бэкенду — см. ниже

## Подключение формы бронирования
- **Formspree** (formspree.io) — добавить `action="https://formspree.io/f/ВАШ_ID"` и `method="POST"` в `<form id="reserveForm">`
- **Netlify Forms** — атрибут `data-netlify="true"` в `<form>` при хостинге на Netlify
