import { GPT4All } from 'gpt4all';

// Get references to the HTML elements we'll be interacting with
const messageForm = document.getElementById('message-form') as HTMLFormElement;
const messageInput = document.getElementById('message-input') as HTMLInputElement;
const messagesList = document.getElementById('messages-list') as HTMLUListElement;

// Create a new instance of the GPT4All class
const gpt4all = new GPT4All();

// Initialize and open the connection with the model
gpt4all.init().then(() => {
  gpt4all.open();
}).catch(error => {
  console.error(error);
});

// Function to generate a response to a message
async function generateResponse(message: string): Promise<string> {
  try {
    // Generate a response to the message using the GPT4All model
    const response = await gpt4all.prompt(message);
    return response;
  } catch (error) {
    console.error(error);
    return 'I am sorry, I cannot generate a response at this time.';
  }
}

// Function to add a message to the messages list
function addMessageToUI(message: string, isUser: boolean): void {
  const messageListItem = document.createElement('li');
  messageListItem.classList.add('message');
  messageListItem.classList.add(isUser ? 'user' : 'bot');
  messageListItem.innerText = message;
  messagesList.appendChild(messageListItem);
}

// Event listener for the message form submission
messageForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get the user's message from the input element
  const message = messageInput.value.trim();

  // Add the user's message to the messages list
  addMessageToUI(message, true);

  // Clear the input element
  messageInput.value = '';

  // Generate a response to the user's message and add it to the messages list
  const response = await generateResponse(message);
  addMessageToUI(response, false);
});
