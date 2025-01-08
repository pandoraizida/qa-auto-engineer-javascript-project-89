import { fireEvent } from '@testing-library/react';

export default class StartPage {
  constructor(screen) {
    this.screen = screen;
    this.changeProfButton = this.screen.getByRole('button', { name: 'Сменить профессию или трудоустроиться' });
    this.tryItButton = this.screen.getByRole('button', { name: 'Попробовать себя в IT' });
    this.advancedButton = this.screen.getByRole('button', { name: 'Я разработчик, хочу углубить свои знания' });
    this.chatTextForStart = this.screen.getByText(/Помогу вам выбрать подходящий курс/i);
    this.chatTextForStartFull = 'Помогу вам выбрать подходящий курс. Выбирайте категорию вопроса, и буквально через пару шагов я смогу рассказать вам то, что нужно.';
  }

  async clickChangeProfession() {
    fireEvent.click(this.changeProfButton);
    await screen.findByText('Расскажи подробнее');
  }

  async clickIamDeveloper() {
    fireEvent.click(this.advancedButton);
    await screen.findByText('Расскажи подробнее');
  }

  async clickTryIt() {
    fireEvent.click(this.tryItButton);
    await screen.findByText('Интересно');
  }
}
