# Подключение поисковых систем и Яндекс Метрики

Код сайта уже поддерживает canonical URL, sitemap, robots, JSON-LD, токены
верификации и цели Метрики. Действия ниже выполняются в аккаунтах владельца после
публикации production-сборки.

## Google Search Console

1. Добавить ресурс `https://modulsdom-brest.by/` типа «Ресурс с префиксом URL»
   либо доменный ресурс `modulsdom-brest.by`.
2. Для HTML-тега скопировать только значение `content` в
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` файла `.env.production`. Для доменного
   ресурса добавить выданную Google TXT-запись в DNS.
3. Пересобрать и опубликовать сайт, затем подтвердить владение.
4. Отправить карту `https://modulsdom-brest.by/sitemap.xml` на индексирование.
5. Проверить главную страницу и несколько проектов инструментом проверки URL.

## Яндекс Вебмастер

1. Добавить сайт `https://modulsdom-brest.by`.
2. Подтвердить владение одним способом:
   - HTML-файл — в `public` уже находится `yandex_250241b34b72b84c.html`; файл
     должен совпадать с именем, выданным аккаунту владельца;
   - метатег — записать значение `content` в
     `NEXT_PUBLIC_YANDEX_SITE_VERIFICATION`.
3. Добавить `https://modulsdom-brest.by/sitemap.xml` в разделе индексирования.
4. Указать главное зеркало `https://modulsdom-brest.by` и проверить диагностику.

## Яндекс Метрика и цели

1. Создать счётчик для `https://modulsdom-brest.by`.
2. Записать числовой ID счётчика в `NEXT_PUBLIC_YANDEX_METRIKA_ID` файла
   `.env.production`, пересобрать и опубликовать сайт.
3. В Метрике создать цели типа «JavaScript-событие» с точными идентификаторами:

| Идентификатор | Что фиксирует |
|---|---|
| `project_open` | открытие карточки или переход к проекту |
| `phone_click` | нажатие на телефон |
| `telegram_click` | переход в Telegram |
| `viber_click` | переход в Viber |
| `email_click` | нажатие на email |
| `catalog_download` | открытие PDF-каталога |
| `consultation_click` | переход к способам связи для консультации |

Метрика загружается только после выбора «Принять все» в уведомлении о cookies.
После подключения проверить каждую цель в режиме реального времени. Событие
`project_open` дополнительно передаёт параметр `project_id`.

## Проверка зеркал после публикации

Все три альтернативных адреса должны отвечать одним `301` на основной URL с
сохранением пути и query-параметров:

```bash
curl -I http://modulsdom-brest.by/test?source=seo
curl -I http://www.modulsdom-brest.by/test?source=seo
curl -I https://www.modulsdom-brest.by/test?source=seo
```

Ожидаемый заголовок во всех случаях:

```text
Location: https://modulsdom-brest.by/test?source=seo
```
