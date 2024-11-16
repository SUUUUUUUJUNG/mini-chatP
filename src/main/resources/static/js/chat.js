let stompClient = null;

function connect() {
    const socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', function (messageOutput) {
            showMessage(JSON.parse(messageOutput.body));
        });
    });
}

function sendMessage() {
    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;
    if (username && message) {
        stompClient.send("/app/sendMessage", {}, JSON.stringify({'sender': username, 'content': message}));
        document.getElementById('message').value = '';
    }
}

function showMessage(message) {
    const messageArea = document.getElementById('message-area');
    const messageElement = document.createElement('p');
    messageElement.textContent = `${message.sender}: ${message.content}`;
    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}

connect();
