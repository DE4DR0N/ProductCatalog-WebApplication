# Product Catalog

Product Catalog - это веб-приложение для управления каталогом продуктов, включающее функционал аутентификации пользователей, управления категориями и продуктами, а также административные функции.

## Стек технологий

- **Frontend**: React, Tailwind CSS
- **Backend**: ASP.NET Core Web API
- **Database**: PostgreSQL
- **Аутентификация**: JWT токены

## Запуск

### Backend

1. Перейдите в директорию ProductCatalogWebApp.API:
    ```bash
    cd .\ProductCatalog-WebApplication\backend\ProductCatalogWebApp\ProductCatalogWebApp.API
    ```

2. Настройте базу данных в `appsettings.json`:

    ```json
    {
      "ConnectionStrings": {
        "DefaultConnection": "YourDatabaseConnectionString"
      },
      "Jwt": {
        "Key": "YourSecretKey",
        "Issuer": "YourIssuer",
        "Audience": "YourAudience"
      }
    }
    ```

3. Запустите приложение:
    ```bash
    dotnet run
    ```

### Frontend

1. Перейдите в директорию product-catalog:
    ```bash
    cd .\ProductCatalog-WebApplication\frontend\product-catalog
    ```

2. Установите зависимости:
    ```bash
    npm install
    ```

3. Запустите приложение:
    ```bash
    npm run dev
    ```

## Структура проекта

### Backend

- `API` - Слой API
- `Application` - Слой с бизнес логикой
- `Persistence` - Слой доступа к данным
- `Domain` - Слой с Entities

### Frontend

- `components` - Компоненты
- `pages` - Страницы приложения
- `context` - Контекст для управления состоянием
- `api` - Запросы к API

## Функционал

### Пользователь

- Просмотр списка продуктов и категорий
- Создание и изменение продуктов

### Продвинутый пользователь

- Просмотр списка продуктов и категорий
- Управление категориями и продуктами (создание, редактирование, удаление)

### Администратор

- Просмотр списка продуктов и категорий
- Управление категориями и продуктами (создание, редактирование, удаление)
- Управление пользователями
- Блокировка пользователей
