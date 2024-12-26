export class WrappedWidget {
    constructor(screen) {
      this.screen = screen;
      this.WrappedButton = this.screen.getByRole('button', { name: 'Открыть Чат' });
    }
}
