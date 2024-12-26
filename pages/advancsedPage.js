export class AdvansedPage {
    constructor(screen) {
      this.screen = screen;
      this.startButton = this.screen.getByRole('button', { name: 'Расскажи подробнее' });
      this.returnBackButton = this.screen.getByRole('button', { name: 'Верни меня в начало' });
      this.chatTextForAdv1 = this.screen.getByText(/Есть несколько вариантов обучения для тех/i);
      this.chatTextForAdv2 = this.screen.getByText(/возможно индивидуальное обучение/i);
      this.chatTextForAdvFull1 = 'Отлично! Есть несколько вариантов обучения для тех, кто хочет углубить знания. Во-первых, курсы повышения квалификации. Часто их оплачивает работодатель. Если вам кажется, что такой вариант возможен, поделитесь с ним этой ссылкой: https://b2b.hexlet.io/.';
      this.chatTextForAdvFull2 = 'Во-вторых, возможно индивидуальное обучение. Вы с наставником-разработчиком составляете план и углубляетесь в темы, которые хотите изучить подробнее.';
    }
}
