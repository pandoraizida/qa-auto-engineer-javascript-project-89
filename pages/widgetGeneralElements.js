import {screen, fireEvent} from '@testing-library/react';

export default class GeneralElements {
  constructor(screen) {
    this.screen = screen;
    this.closeWidgetButton = this.screen.getByRole('button', { name: 'Close' });
    this.modalHeaderText = this.screen.getByText('Виртуальный помощник');
    this.widgetAvatar = this.screen.getByAltText('tota');
  };

  async closeWidget() {
    fireEvent.click(this.closeWidgetButton);
    await screen.findByText('Открыть Чат');
  };
}
