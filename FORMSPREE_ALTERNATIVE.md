# 📧 Альтернатива: Formspree (Проще EmailJS)

## 🚀 Быстрая настройка Formspree

### Шаг 1: Регистрация
1. Перейдите на [Formspree.io](https://formspree.io/)
2. Зарегистрируйтесь (бесплатно до 50 писем/месяц)
3. Создайте новый проект

### Шаг 2: Получение Endpoint
1. В проекте нажмите **New Form**
2. Назовите форму "DREAM DIGITAL Contact"
3. Скопируйте **Endpoint URL** (например: `https://formspree.io/f/xaybcdjk`)

### Шаг 3: Обновление формы

Замените в `src/components/ProjectRequestForm.tsx` функцию `handleSubmit`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus('idle');

  try {
    const response = await fetch('https://formspree.io/f/YOUR_ENDPOINT_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        pricingType: formData.pricingType,
        message: `Новая заявка с сайта DREAM DIGITAL:
        
Имя/Компания: ${formData.name}
Телефон/WhatsApp: ${formData.phone}
Email: ${formData.email || 'Не указан'}
Тариф: ${formData.pricingType || 'Не выбран'}

Дата: ${new Date().toLocaleString('ru-RU')}`
      })
    });

    if (response.ok) {
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', email: '', pricingType: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
        const dialog = document.querySelector('[role="dialog"]') as HTMLElement;
        if (dialog) {
          dialog.click();
        }
      }, 3000);
    } else {
      throw new Error('Ошибка отправки');
    }

  } catch (error) {
    console.error('Ошибка отправки:', error);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};
```

### Шаг 4: Настройка уведомлений
1. В Formspree перейдите в **Settings** → **Notifications**
2. Настройте уведомления на ваш email
3. Можно настроить Slack, Discord или другие каналы

## ✅ Преимущества Formspree:

- **Проще настройка** - не нужно создавать шаблоны
- **Автоматические уведомления** - сразу на email
- **Защита от спама** - встроенная защита
- **Аналитика** - статистика отправок
- **Бесплатный план** - 50 писем/месяц

## 🔧 Настройка кастомного шаблона письма

В Formspree можно настроить кастомный шаблон:

1. Перейдите в **Settings** → **Email Templates**
2. Создайте новый шаблон:

```html
<h2>🚀 Новая заявка с сайта DREAM DIGITAL</h2>

<div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #00FFFF;">
  <p><strong>👤 Имя/Компания:</strong> {{name}}</p>
  <p><strong>📱 Телефон/WhatsApp:</strong> {{phone}}</p>
  <p><strong>📧 Email:</strong> {{email}}</p>
  <p><strong>💰 Тариф:</strong> {{pricingType}}</p>
</div>

<div style="background: #000; color: #fff; padding: 15px; text-align: center; margin: 15px 0;">
  <h3 style="color: #00FFFF; margin: 0;">DREAM DIGITAL</h3>
  <p style="margin: 5px 0 0 0;">Ваш сайт в 72 часа — начиная с $300</p>
</div>

<p style="color: #717182; font-size: 12px;">
  Заявка получена: {{_date}}<br>
  Сайт: dream-digital.com
</p>
```

## 📊 Мониторинг заявок

В Formspree вы можете:
- Видеть все заявки в панели управления
- Экспортировать данные в CSV
- Настраивать автоматические ответы клиентам
- Интегрировать с CRM системами

## 🎯 Рекомендация

**Для начала рекомендую Formspree** - он проще в настройке и не требует создания шаблонов. Если понадобится больше функциональности, можно перейти на EmailJS.
