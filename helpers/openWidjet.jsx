import { WelcomePage } from '../pages/welcomePage.js';
import { WrappedWidget } from '../pages/wrappedWidgetPage.js';
import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';

export const openWidget = async () => {
    const wrappedWidget = new WrappedWidget(screen);
    await wrappedWidget.openWidget();
    await screen.findByText('Виртуальный помощник');

    const welcomePage = new WelcomePage(screen);
    await welcomePage.startConversation();
    await screen.findByText('Помогу вам выбрать подходящий курс.');
    return;
};
