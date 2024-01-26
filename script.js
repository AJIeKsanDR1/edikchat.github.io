const loginPanel = document.getElementById('login-panel');
const chatPanel = document.getElementById('chat');
const messagesDiv = document.getElementById('chat-messages');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const sendBtn = document.getElementById('chat-send');
const searchInput = document.getElementById('message-search');
let currentUser = '';

loginBtn.addEventListener('click', function() {
    const username = document.getElementById('username').value.trim();
    if (username) {
        currentUser = username;
        // Здесь должен быть AJAX запрос на сервер для логина
        displayChat();
        postMessage(`${currentUser} вошел в чат`, 'system');
    }
});

logoutBtn.addEventListener('click', function() {
    // Здесь должен быть AJAX запрос на сервер для выхода
    postMessage(`${currentUser} вышел из чата`, 'system');
    currentUser = '';
    displayLogin();
});

sendBtn.addEventListener('click', function() {
    const message = document.getElementById('chat-input').value.trim();
    if (message) {
        // Здесь должен быть AJAX запрос на сервер для отправки сообщения
        postMessage(message, currentUser, true); // true для сообщений от текущего пользователя
        document.getElementById('chat-input').value = '';
    }
});

searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.trim();
    // Здесь должен быть AJAX запрос на сервер для поиска сообщений
    // Отобразить результаты в messagesDiv
});

function postMessage(message, user, isCurrentUser = false) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${user}: ${message}`;
    messageElement.setAttribute('data-user', user); // Добавление атрибута

    // Назначение стилей сообщениям
    if (isCurrentUser) {
        messageElement.style.color = 'blue'; // Цвет текущего пользователя
    } else if (user === 'system') {
        messageElement.style.color = 'red'; // Цвет системных сообщений
    } else {
        messageElement.style.color = getRandomColor(); // Цвет других пользователей
    }

    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Автопрокрутка к последнему сообщению
}

document.getElementById('message-search').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const messages = document.querySelectorAll('#chat-messages > div');
    messages.forEach(msg => {
        const user = msg.getAttribute('data-user').toLowerCase(); // Предполагаем, что каждое сообщение имеет атрибут data-user с именем пользователя
        if (user.includes(searchTerm) || searchTerm === '') {
            msg.style.display = ''; // Показать сообщения, если они соответствуют поиску или поисковая строка пуста
        } else {
            msg.style.display = 'none'; // Скрыть остальные сообщения
        }
    });
});

// Получение элемента кнопки поиска
const searchBtn = document.getElementById('search-btn');

// Обработчик события клика для кнопки поиска
searchBtn.addEventListener('click', function() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const messages = document.querySelectorAll('#chat-messages > div');

    messages.forEach(msg => {
        const user = msg.getAttribute('data-user').toLowerCase();
        if (user.includes(searchTerm) || searchTerm === '') {
            msg.style.display = ''; // Показывать сообщение
        } else {
            msg.style.display = 'none'; // Скрывать сообщение
        }
    });
});

function displayChat() {
    loginPanel.style.display = 'none';
    chatPanel.style.display = 'block';
}

function displayLogin() {
    chatPanel.style.display = 'none';
    loginPanel.style.display = 'block';
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}