export default class WelcomePage {
  constructor(screen) {
    this.screen = screen;
    this.startConvButton = this.screen.getByRole('button', { name: 'Начать разговор' });
    this.closeWidgetButton = this.screen.getByRole('button', { name: 'Close' });
    this.modalHeaderText = this.screen.getByText('Виртуальный помощник');
    this.widgetAvatar = this.screen.getByAltText('tota');
    this.chatText = this.screen.getByText('Привет! Я ваш виртуальный помощник. Нажмите "Начать разговор", чтобы открыть чат');
  }
}
