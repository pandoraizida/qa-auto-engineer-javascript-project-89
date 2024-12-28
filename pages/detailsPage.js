export default class DelailsPage {
  constructor(screen) {
    this.screen = screen;
    this.subscribeButton = this.screen.getByRole('button', { name: 'Останусь здесь, запишусь на курс' });
    this.returnBackButton = this.screen.getByRole('button', { name: 'Вернуться в начало' });
    this.chatTextForDetails1 = this.screen.getByText(/Также есть программы обучения/i);
    this.chatTextForDetailsFull1 = 'В Хекслете можно освоить JavaScript, Python, PHP, верстку, Java, DevOps и Ruby on Rails. Также есть программы обучения по тестированию веб-приложений и аналитике данных. https://ru.hexlet.io/courses#preparatory';
    this.chatTextForDetails2 = this.screen.getByText(/Только не тратьте много времени/i);
    this.chatTextForDetailsFull2 = 'Только не тратьте много времени на выбор языка 😊 Вы встретитесь с одними и теми же понятиями: Литералы, Операции, Типы данных... Главное не синтаксис, а суть, которая позволяет комбинировать конструкции и получать результат.';
  }
}
