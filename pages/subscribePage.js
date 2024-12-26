export class SubscribePage {
    constructor(screen) {
      this.screen = screen;
      this.chatTextForSubscribe1 = this.screen.getByText('Ага, дублирую ссылку https://ru.hexlet.io/courses#preparatory');
      this.chatTextForSubscribe2 = this.screen.getByText('Был рад знакомству! Увидимся ✋');
      this.doubleButton = this.screen.getByRole('button', { name: 'Останусь здесь, запишусь на курс' });
      this.returnBackButton = this.screen.getByRole('button', { name: 'Верни меня в начало' });
    }
}