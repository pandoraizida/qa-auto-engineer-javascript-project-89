const getLastMessageText = () => {
  const allMessages = document.querySelectorAll('.message-body');
  const lastMessage = allMessages[allMessages.length-1];
  return lastMessage;
};

export default getLastMessageText;