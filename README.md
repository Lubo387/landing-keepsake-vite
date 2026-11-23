# Keepsake — Digital & Branding Agency (Vite + Pug + SCSS)

Лабораторна робота №9: Препроцесори Pug і SCSS. Автоматизація верстки: Vite, PostCSS, оптимізація зображень, контроль якості коду.

## Демо

- **GitHub Pages:** [https://lubo387.github.io/landing-keepsake-vite/](https://lubo387.github.io/landing-keepsake-vite/)
- **Репозиторій:** [https://github.com/Lubo387/landing-keepsake-vite](https://github.com/Lubo387/landing-keepsake-vite)

## Вимоги до середовища

- **Node.js:** версія >= 20 LTS (перевірено на Node v26)
- **npm:** версія >= 10

## Команди проєкту

- `npm install` — встановлення залежностей проєкту
- `npm run dev` — запуск локального сервера розробки Vite
- `npm run build` — збирання оптимізованого продакшн-білду в директорію `dist`
- `npm run preview` — локальний перегляд зібраного продакшн-білду
- `npm run images` — автоматична генерація та оптимізація зображень (AVIF, WebP, JPEG у ширинах 150w/300w та 400w/800w) за допомогою Sharp
- `npm run format` — автоматичне форматування коду за допомогою Prettier
- `npm run lint` — комплексна перевірка якості коду (Stylelint + Prettier check)
- `npm run lint:styles` — лінтинг SCSS за допомогою Stylelint
- `npm run lint:format` — перевірка форматування через Prettier

## Структура проєкту та архітектура

```
landing-keepsake-vite/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .husky/
│   └── pre-commit
├── public/
│   └── assets/
│       └── images/
├── scripts/
│   └── generate-images.js
├── sources/
│   └── images/
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── sections/
│   │   │   ├── clients.pug
│   │   │   ├── cta.pug
│   │   │   ├── hero.pug
│   │   │   ├── journal.pug
│   │   │   ├── services.pug
│   │   │   ├── stats.pug
│   │   │   ├── testimonial.pug
│   │   │   └── works.pug
│   │   ├── footer.pug
│   │   └── header.pug
│   ├── data/
│   │   └── data.pug
│   ├── includes/
│   │   ├── fonts.pug
│   │   ├── head.pug
│   │   └── meta.pug
│   ├── layouts/
│   │   └── main.pug
│   ├── mixins/
│   │   ├── btn.pug
│   │   ├── icon.pug
│   │   ├── index.pug
│   │   ├── picture.pug
│   │   └── work-card.pug
│   ├── pages/
│   │   └── index.pug
│   └── styles/
│       ├── abstracts/
│       │   ├── _breakpoints.scss
│       │   ├── _functions.scss
│       │   ├── _index.scss
│       │   ├── _mixins.scss
│       │   └── _variables.scss
│       ├── base/
│       │   ├── _index.scss
│       │   ├── _reset.scss
│       │   └── _typography.scss
│       ├── components/
│       │   ├── _art.scss
│       │   ├── _btn.scss
│       │   ├── _burger.scss
│       │   ├── _card.scss
│       │   ├── _chips.scss
│       │   ├── _clients.scss
│       │   ├── _cta.scss
│       │   ├── _fav.scss
│       │   ├── _form.scss
│       │   ├── _hero.scss
│       │   ├── _index.scss
│       │   ├── _journal.scss
│       │   ├── _logo.scss
│       │   ├── _menu.scss
│       │   ├── _more.scss
│       │   ├── _nav.scss
│       │   ├── _services.scss
│       │   ├── _socials.scss
│       │   ├── _stats.scss
│       │   ├── _testimonial.scss
│       │   ├── _to-top.scss
│       │   └── _works.scss
│       ├── layout/
│       │   ├── _container.scss
│       │   ├── _footer.scss
│       │   ├── _header.scss
│       │   ├── _index.scss
│       │   └── _section.scss
│       └── main.scss
├── .browserslistrc
├── .editorconfig
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .stylelintrc.json
├── package.json
├── postcss.config.js
├── README.md
└── vite.config.js
```

### Пояснення архітектури Pug

- **Наслідування (`extends` / `block`):** Базовий каркас сторінки визначено у `layouts/main.pug` із блоками `meta`, `title`, `styles`, `content`, `scripts`. Головна сторінка `pages/index.pug` наслідує цей макет і перевизначає вміст.
- **Розширення блоків (`append`):** Використовується `append meta` для додавання специфічних Open Graph та описових метатегів без перезапису базових метатегів (viewport, charset).
- **Модульність (`include`):** Кожна секція сторінки, шапка та підвал винесені в окремі файли в папці `src/components/` та `src/components/sections/`.
- **Дані (`src/data/data.pug`):** Повторювані сутності структуровані у вигляді масивів JS-об’єктів (навігація, категорії фільтра, роботи портфоліо, сервіси, статистика, клієнти, пости журналу, колонки футера, соцмережі).
- **Ітерація (`each`):** Всі повторювані елементи рендеряться через цикли `each`, забезпечуючи принцип DRY.
- **Міксини (`src/mixins/`):**
  - `+btn(text, href, modifier)` — універсальна кнопка або посилання з підтримкою модифікаторів, довільних атрибутів (`&attributes`) та вкладеного вмісту (`block`).
  - `+icon(name)` — векторні SVG-іконки через конструкцію `case / when`.
  - `+picture(options)` — сучасна адаптивна розмітка `<picture>` із джерелами AVIF, WebP та запасним JPEG, адаптивними атрибутами `srcset` і `sizes`, розрахунком розмірів `width` / `height` та керуванням відкладеним завантаженням `loading="lazy"`.
  - `+work-card(work)` — компонента карточки портфоліо.
- **Умови та фільтрація:** Збережено доступний CSS-фільтр портфоліо на селекторах `:checked ~`, де радіокнопки та чипси категорій генеруються динамічно.

### Пояснення архітектури SCSS

- **Модульна система:** Використовуються виключно сучасні правила `@use` та `@forward` (без застарілого `@import`).
- **Індексні файли:** Кожна підпапка містить `_index.scss`, який експортує внутрішні паршали назовні.
- **Abstracts:**
  - `_variables.scss` містить мапу кольорів `$colors`, шрифти та мапу брейкпоінтів `$breakpoints`.
  - `_breakpoints.scss` реалізує міксин `@mixin mq($bp)` (підхід mobile-first з `sass:map`).
  - `_functions.scss` реалізує функцію `@function rem($px)` з використанням `sass:math`.
  - `_mixins.scss` містить утилітарні міксини (`visually-hidden`, `flex-center`, `focus-ring`, `button-reset`).
- **CSS Custom Properties у `:root`:** Кольори з карти SCSS `$colors` автоматично перетворюються у змінні CSS через директиву `@each` у `_typography.scss`.
- **БЕМ-методологія:** Кожен блок винесено в окремий файл, класи елементів формуються через конкатенацію `&__element` та модифікатори `&--modifier`.
- **Обмеження вкладеності:** Рівень вкладеності суворо обмежено трьома рівнями, специфічність селекторів мінімальна, селектори за id відсутні.

## Використані інструменти

- **Vite:** швидкий збирач та dev-сервер нового покоління.
- **Vituum + @vituum/vite-plugin-pug:** інтеграція шаблонізатора Pug у робочий процес Vite.
- **Sass (Dart Sass):** компіляція SCSS у сучасний CSS.
- **PostCSS + Autoprefixer:** автоматичне додавання вендорних префіксів під цільові браузери.
- **Browserslist:** єдиний конфіг цільового оточення браузерів.
- **Sharp:** пакет для високопродуктивної оптимізації та нарізки растрових зображень.
- **Prettier + @prettier/plugin-pug:** автоматичне форматування Pug, SCSS, JS, JSON, Markdown.
- **Stylelint + stylelint-config-standard-scss:** автоматичний контроль якості SCSS, дотримання БЕМ та обмеження вкладеності.
- **Husky + lint-staged:** Git-хуки для автоматичного лінтингу й форматування змінених файлів перед кожним комітом.
- **GitHub Actions:** CI/CD конвеєр автоматичного тестування, збирання та деплою на GitHub Pages.

## Цільові браузери (Browserslist)

Конфігурація у `.browserslistrc`:

```
last 2 Chrome versions
last 2 Firefox versions
last 2 Edge versions
last 2 Safari versions
last 2 iOS versions
```

## Порівняння розмірів до та після оптимізації

| Ресурс                         | До оптимізації (Lab 7)              | Після оптимізації (Lab 9)                                                 | Ефект / Економія                                                      |
| ------------------------------ | ----------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **CSS (стилі)**                | ~21.4 KB (немініфікований, 2 файли) | **20.7 KB** (єдиний бандл, esbuild мініфікація, Autoprefixer префікси)    | Об'єднання в один запит, мініфікація, gzip до 4.5 KB                  |
| **Зображення робіт (work-01)** | ~2.4 KB (один розмір WebP 358px)    | **1.2 KB** (AVIF 400w) / **2.5 KB** (AVIF 800w 2x)                        | Економія до ~50% трафіку для мобільних пристроїв, підтримка 2x Retina |
| **Зображення робіт (work-02)** | ~3.9 KB (WebP)                      | **1.7 KB** (AVIF 400w) / **3.7 KB** (AVIF 800w)                           | Економія понад 55% трафіку на смартфонах                              |
| **Прев'ю журналу (post-01)**   | ~382 B (WebP)                       | **384 B** (WebP 150w) / **853 B** (AVIF 150w) / **1.4 KB** (AVIF 300w 2x) | Адаптивна доставка під щільність пікселів екрана                      |
| **Формати зображень**          | Лише один формат `.webp`            | `<picture>`: **AVIF** (пріоритет) + **WebP** + фолбек **JPEG**            | Максимальна сумісність та найкраща компресія                          |
