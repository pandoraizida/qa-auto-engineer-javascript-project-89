import { fireEvent } from '@testing-library/react';
import { expect } from 'vitest';

export default class WidgetElements {
  constructor(screen) {
    this.screen = screen;
    this.wrappedWidgetButton = this.screen.getByRole('button', { name: 'Открыть Чат' });
  }

  async currentWidgetButton(name) {
    return this.screen.getByRole('button', { name });
  }

  async widgetAvatar() {
    return this.screen.getByAltText('tota');
  }

  async modalHeaderText() {
    return this.screen.getByText('Виртуальный помощник');
  }

  async closeWidgetButton() {
    return this.screen.getByRole('button', { name: 'Close' });
  }

  async getTagForText(text) {
    return this.screen.getByText(text).tagName;
  }

  async clickWidgetButton(button) {
    fireEvent.click(await this.currentWidgetButton(button));
  }

  async expectCurrenButtonVisability(text) {
    expect(await this.currentWidgetButton(text)).toBeVisible();
  }

  expectLastMessageVisability(text) {
    const messages = this.screen.getAllByText(text);
    const lastMessage = messages[messages.length - 1];
    expect(lastMessage).toBeVisible();
  }
}
