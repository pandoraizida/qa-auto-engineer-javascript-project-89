import { fireEvent } from '@testing-library/react';

export default class WrappedWidget {
  constructor(screen) {
    this.screen = screen;
    this.WrappedButton = this.screen.getByRole('button', { name: 'Открыть Чат' });
  }

  async openWidget() {
    fireEvent.click(this.WrappedButton);
    await screen.findByText('Виртуальный помощник');
  }
}
