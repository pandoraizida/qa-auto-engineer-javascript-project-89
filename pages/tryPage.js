import { fireEvent } from '@testing-library/react';

export default class TryPage {
  constructor(screen) {
    this.screen = screen;
    this.intrestingButton = this.screen.getByRole('button', { name: 'Интересно' });
    this.changeProfButton = this.screen.getByRole('button', { name: 'А что по поводу смены профессии?' });
    this.returnBackButton = this.screen.getByRole('button', { name: 'Вернуться назад' });
    this.chatTextForTry = this.screen.getByText(/У нас есть подготовительные курсы/i);
    this.chatTextForTryFull = 'У нас есть подготовительные курсы, которые длятся всего 2 недели.За это время вы знакомитесь с основами программирвоания, пробуете его на практике и плавной подойдете к старту обучения в основной программе. Все это под руководством опытного программиста. Он поможет, если будут сложности. Курс стоит всего 990 рублей';
  }

  async clickIntresting() {
    fireEvent.click(this.intrestingButton);
  }

  async clickWhatAbout() {
    fireEvent.click(this.changeProfButton);
  }
}
