import { fireEvent } from '@testing-library/react';

export default class SwitchPage {
  constructor(screen) {
    this.screen = screen;
    this.detailsButton = this.screen.getByRole('button', { name: 'Расскажи подробнее' });
    this.easierButton = this.screen.getByRole('button', { name: 'А есть что-нибудь попроще' });
    this.returnBackButton = this.screen.getByRole('button', { name: 'Вернуться в начало' });
    this.chatTextForSwitch = this.screen.getByText(/У нас есть программы обучения новой профессии/i);
    this.chatTextForSwitchFull = 'У нас есть программы обучения новой профессии. Мы постоянно мониторим, какие компетенции востребованы на рынке, а учебные программы строим в соответствии ними. Учиться можно онлайн в удобном темпе без дедлайнов. К концу обучения у вас будет портфолио на GitHub. А к трудоустройству поможет подготовиться Карьерный трек';
  }

  async clickDetails() {
    fireEvent.click(this.detailsButton);
    await screen.findByText('Останусь здесь, запишусь на курс');
  }

  async clickSomeEasy() {
    fireEvent.click(this.easierButton);
    await screen.findByText('Интересно');
  }
}
