# Google Analytics 4 Setup Guide

## 🔧 Настройка Google Analytics 4

### Шаг 1: Создание аккаунта GA4

1. **Перейдите в [Google Analytics](https://analytics.google.com/)**
2. **Войдите в Google аккаунт**
3. **Нажмите "Start measuring"**

### Шаг 2: Создание аккаунта

1. **Account name:** `Dream Digital`
2. **Data sharing settings:** Выберите нужные опции
3. **Нажмите "Next"**

### Шаг 3: Создание свойства

1. **Property name:** `Dream Digital Website`
2. **Reporting time zone:** Ваш часовой пояс
3. **Currency:** USD (или другая)
4. **Нажмите "Next"**

### Шаг 4: Настройка бизнеса

1. **Business size:** Выберите подходящий размер
2. **Business category:** Technology
3. **Business objectives:** Выберите цели
4. **Нажмите "Create"**

### Шаг 5: Настройка потока данных

1. **Platform:** Web
2. **Website URL:** `https://dreamdigital.team`
3. **Stream name:** `Dream Digital Main`
4. **Нажмите "Create stream"**

### Шаг 6: Получение ID измерения

После создания потока вы получите **Measurement ID** (например: `G-XXXXXXXXXX`)

### Шаг 7: Обновление переменных окружения

#### Для локальной разработки:
Обновите файл `env.local`:
```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### Для продакшена (Netlify):
1. Перейдите в **Site settings → Environment variables**
2. Добавьте переменную:
   - `VITE_GA_MEASUREMENT_ID` = G-XXXXXXXXXX

### Шаг 8: Настройка целей (Goals)

В GA4 настройте цели:
1. **Form submissions** - отправка форм
2. **Page views** - просмотры страниц
3. **Button clicks** - клики по кнопкам
4. **Admin panel access** - доступ к админ панели

### Шаг 9: Настройка событий

Настройте пользовательские события:
- `form_submit` - отправка форм
- `button_click` - клики по кнопкам
- `admin_access` - доступ к админ панели
- `pricing_view` - просмотр цен
- `contact_action` - контактные действия

## 📊 Что отслеживается

### Автоматически:
- **Page views** - просмотры страниц
- **User sessions** - сессии пользователей
- **Traffic sources** - источники трафика
- **Device types** - типы устройств
- **Geographic data** - географические данные

### Пользовательские события:
- **Form submissions** - отправка форм заявок
- **Admin panel access** - доступ к админ панели
- **Button clicks** - клики по кнопкам
- **Pricing views** - просмотр тарифов
- **Contact actions** - контактные действия

## 🔍 Как проверить работу

1. **Откройте сайт** в браузере
2. **Откройте Developer Tools** (F12)
3. **Перейдите на вкладку Network**
4. **Найдите запросы к** `google-analytics.com`
5. **Проверьте в GA4** - данные должны появиться через 24-48 часов

## ⚠️ Важные моменты

- **GDPR compliance** - GA4 учитывает согласие на cookies
- **Privacy** - не отслеживает персональные данные
- **Performance** - минимальное влияние на скорость сайта
- **Testing** - используйте режим разработчика GA4 для тестирования

## 🚀 Готово!

После настройки вы сможете:
- Отслеживать посетителей сайта
- Анализировать источники трафика
- Измерять конверсии
- Оптимизировать сайт на основе данных
