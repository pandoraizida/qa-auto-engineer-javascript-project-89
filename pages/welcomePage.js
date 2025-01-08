import { fireEvent } from '@testing-library/react';

export default class WelcomePage {
  constructor(screen) {
    this.screen = screen;
    this.startConvButton = this.screen.getByRole('button', { name: 'Начать разговор' });
    this.chatText = this.screen.getByText('Привет! Я ваш виртуальный помощник. Нажмите "Начать разговор", чтобы открыть чат');
  }

  async startConversation() {
    fireEvent.click(this.startConvButton);
  }
}
