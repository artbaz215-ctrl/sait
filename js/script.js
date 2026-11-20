// ====================================================
// 1. АКТУАЛЬНЫЙ ГОД В ПОДВАЛЕ
// ====================================================
const yearEl = document.querySelector('#year');
yearEl.textContent = new Date().getFullYear();


// ====================================================
// 2. ПЕРЕКЛЮЧЕНИЕ ТЁМНОЙ ТЕМЫ
//    JS переключает класс на <html>, а стили описаны в CSS
// ====================================================
const themeBtn = document.querySelector('#theme-toggle');
const a11yBtn = document.querySelector('#a11y-toggle');   // нужна ниже

themeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');

    const isDark = document.documentElement.classList.contains('dark');
    themeBtn.textContent = isDark ? '☀️' : '🌙';

    // Тёмная тема выключает режим для слабовидящих (режимы взаимоисключающие)
    if (isDark) {
        document.documentElement.classList.remove('a11y');
        a11yBtn.setAttribute('aria-pressed', 'false');
        localStorage.setItem('a11y', 'off');
    }
});


// ====================================================
// 2.1. ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ
// ====================================================

// Восстанавливаем режим при загрузке страницы
if (localStorage.getItem('a11y') === 'on') {
    document.documentElement.classList.add('a11y');
    a11yBtn.setAttribute('aria-pressed', 'true');
}

a11yBtn.addEventListener('click', () => {
    const isOn = document.documentElement.classList.toggle('a11y');
    a11yBtn.setAttribute('aria-pressed', isOn ? 'true' : 'false');
    localStorage.setItem('a11y', isOn ? 'on' : 'off');

    // Режим слабовидящих выключает тёмную тему
    if (isOn) {
        document.documentElement.classList.remove('dark');
        themeBtn.textContent = '🌙';
    }
});


// ====================================================
// 3. ОТПРАВКА ФОРМЫ БЕЗ ПЕРЕЗАГРУЗКИ СТРАНИЦЫ
// ====================================================
const form = document.querySelector('form');
const statusMsg = document.querySelector('#form-status');

form.addEventListener('submit', (event) => {
    event.preventDefault();        // отменяем перезагрузку

    const name = document.querySelector('#name').value.trim();

    statusMsg.textContent = `Спасибо, ${name}! Сообщение отправлено.`;
    statusMsg.classList.add('visible');

    form.reset();                  // очищаем поля
});


// ====================================================
// 4. КНОПКА «НАВЕРХ» ПОЯВЛЯЕТСЯ ПРИ ПРОКРУТКЕ
// ====================================================
const upBtn = document.querySelector('#to-top');

window.addEventListener('scroll', () => {
    upBtn.classList.toggle('visible', window.scrollY > 400);
});

upBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});