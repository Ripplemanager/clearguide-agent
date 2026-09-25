const form = document.querySelector('#chat-form');
const input = document.querySelector('#message');
const messages = document.querySelector('#messages');

function addMessage(label, text, className) {
  const message = document.createElement('div');
  message.className = `message ${className}`;
  message.innerHTML = `<strong>${label}</strong><p></p>`;
  message.querySelector('p').textContent = text;
  messages.append(message);
  messages.scrollTop = messages.scrollHeight;
  return message;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const question = input.value.trim();
  if (!question) return;

  addMessage('You', question, 'user-message');
  input.value = '';
  input.disabled = true;
  const thinking = addMessage('ClearGuide', 'Thinking...', 'agent-message');

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: question })
    });
    const data = await response.json();
    thinking.querySelector('p').textContent = data.answer || data.error;
  } catch {
    thinking.querySelector('p').textContent = 'I could not reach the server. Is it running?';
  } finally {
    input.disabled = false;
    input.focus();
  }
});
