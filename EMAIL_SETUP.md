# 📧 Настройка отправки заявок на Email

## Шаг 1: Регистрация на EmailJS

1. Перейдите на [EmailJS.com](https://www.emailjs.com/)
2. Зарегистрируйтесь (бесплатный план позволяет 200 писем в месяц)
3. Войдите в аккаунт

## Шаг 2: Настройка Email Service

1. В панели управления перейдите в **Email Services**
2. Нажмите **Add New Service**
3. Выберите **Gmail** (или другой провайдер)
4. Подключите ваш email аккаунт
5. Запомните **Service ID** (например: `service_abc123`)

## Шаг 3: Создание Email Template

1. Перейдите в **Email Templates**
2. Нажмите **Create New Template**
3. Настройте шаблон:

### HTML Template:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Новая заявка с сайта DREAM DIGITAL</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #FF0033; border-bottom: 3px solid #00FFFF; padding-bottom: 10px;">
            🚀 НОВАЯ ЗАЯВКА С САЙТА
        </h1>
        
        <div style="background: #f5f5f5; padding: 20px; border-left: 5px solid #00FFFF; margin: 20px 0;">
            <h2 style="color: #000; margin-top: 0;">Информация о клиенте:</h2>
            
            <p><strong>👤 Имя/Компания:</strong> {{from_name}}</p>
            <p><strong>📱 Телефон/WhatsApp:</strong> {{from_phone}}</p>
            <p><strong>📧 Email:</strong> {{from_email}}</p>
            <p><strong>💰 Выбранный тариф:</strong> {{pricing_type}}</p>
        </div>
        
        <div style="background: #000; color: #fff; padding: 20px; text-align: center; margin: 20px 0;">
            <h3 style="color: #00FFFF; margin: 0;">DREAM DIGITAL</h3>
            <p style="margin: 10px 0 0 0; color: #F5F5F5;">Ваш сайт в 72 часа — начиная с $300</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
            <p style="color: #717182; font-size: 14px;">
                Заявка получена: {{date}}<br>
                Сайт: dream-digital.com
            </p>
        </div>
    </div>
</body>
</html>
```

4. Сохраните шаблон и запомните **Template ID** (например: `template_xyz789`)

## Шаг 4: Получение Public Key

1. В панели управления перейдите в **Account** → **API Keys**
2. Скопируйте **Public Key** (например: `user_def456`)

## Шаг 5: Обновление кода

Замените в файле `src/components/ProjectRequestForm.tsx` следующие значения:

```typescript
// Замените эти строки на ваши реальные данные:
emailjs.init("YOUR_PUBLIC_KEY"); // Ваш Public Key
'YOUR_SERVICE_ID', // Ваш Service ID  
'YOUR_TEMPLATE_ID', // Ваш Template ID
```

Например:
```typescript
emailjs.init("user_def456");
await emailjs.send(
  'service_abc123',
  'template_xyz789',
  templateParams
);
```

## Шаг 6: Тестирование

1. Запустите сайт: `npm run dev`
2. Откройте форму заявки
3. Заполните и отправьте тестовую заявку
4. Проверьте, пришло ли письмо на ваш email

## ⚠️ Важные замечания:

- **Безопасность**: Public Key виден в коде, но это нормально для EmailJS
- **Лимиты**: Бесплатный план - 200 писем/месяц
- **Спам**: EmailJS автоматически защищает от спама
- **Логи**: Все отправки логируются в панели EmailJS

## 🔧 Альтернативные решения:

Если EmailJS не подходит, можно использовать:
- **Formspree** - еще проще в настройке
- **Netlify Forms** - если сайт на Netlify
- **Собственный бэкенд** - для полного контроля

## 📞 Поддержка:

Если возникнут проблемы:
1. Проверьте консоль браузера на ошибки
2. Убедитесь, что все ID указаны правильно
3. Проверьте лимиты EmailJS
4. Обратитесь в поддержку EmailJS
