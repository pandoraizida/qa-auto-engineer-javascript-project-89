import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, beforeEach, test, expect } from 'vitest';
import WrappedWidget from '../pages/wrappedWidgetPage.js';
import WelcomePage from '../pages/welcomePage.js';
import App from '../src/App.jsx';

describe('Check widget functionality', () => {
    beforeEach(async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {};
        render(<App />);
        fireEvent.click(screen.getByRole('button', { name: 'Открыть Чат' }));
        await screen.findByText('Начать разговор');
    });

    test('General widget elements are presented', async () => {
        const welcomePage = new WelcomePage(screen);
        expect(welcomePage.modalHeaderText).toBeInTheDocument();
        expect(welcomePage.closeWidgetButton).toBeInTheDocument();
        expect(welcomePage.widgetAvatar).toBeInTheDocument();
    })

    test('Close button wrapped the widget', async () => {
        const welcomePage = new WelcomePage(screen);
        expect(welcomePage.closeWidgetButton).toBeInTheDocument();
        fireEvent.click(welcomePage.closeWidgetButton);
        await screen.findByText('Открыть Чат');

        const wrappedWidget = new WrappedWidget(screen);
        expect(wrappedWidget.WrappedButton).toBeInTheDocument();
        expect(welcomePage.closeWidgetButton).not.toBeInTheDocument();
    })

    test('Return back leads to Start page', async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Начать разговор' }));
        await screen.findByText('Сменить профессию или трудоустроиться');
        fireEvent.click(screen.getByRole('button', { name: 'Сменить профессию или трудоустроиться' }));
        await screen.findByText('Расскажи подробнее');
        fireEvent.click(screen.getByRole('button', { name: 'Расскажи подробнее' }));
        await screen.findByText('Останусь здесь, запишусь на курс');
        fireEvent.click(screen.getByRole('button', { name: 'Останусь здесь, запишусь на курс' }));
        await screen.findByText('Верни меня в начало');
        fireEvent.click(screen.getByRole('button', { name: 'Верни меня в начало' }));
        expect(screen.getByRole('button', { name: 'Сменить профессию или трудоустроиться' })).toBeInTheDocument();
    })
})

describe('Check that button leads to the appropriate page', async () => {
    beforeEach(async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {};
        render(<App />);
        fireEvent.click(screen.getByRole('button', { name: 'Открыть Чат' }));
        await screen.findByText('Начать разговор');

        fireEvent.click(screen.getByRole('button', { name: 'Начать разговор' }));
        await screen.findByText(/Помогу вам выбрать подходящий курс/i);
    });

    test('Subscribe1 flow', async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Сменить профессию или трудоустроиться' }));
        await screen.findByText(/У нас есть программы обучения новой профессии/i);

        fireEvent.click(screen.getByRole('button', { name: 'Расскажи подробнее' }));
        await screen.findByText(/В Хекслете можно освоить JavaScript, Python, PHP, верстку, Java, DevOps и Ruby on Rails/i);

        fireEvent.click(screen.getByRole('button', { name: 'Останусь здесь, запишусь на курс' }));
        await screen.findByText(/Ага, дублирую ссылку/i);
    })

    test('Subscribe2 flow', async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Сменить профессию или трудоустроиться' }));
        await screen.findByText(/У нас есть программы обучения новой профессии/i);

        fireEvent.click(screen.getByRole('button', { name: 'А есть что-нибудь попроще' }));
        await screen.findByText(/У нас есть подготовительные курсы, которые длятся всего 2 недели/i);

        fireEvent.click(screen.getByRole('button', { name: 'Интересно' }));
        await screen.findByText(/В Хекслете можно освоить JavaScript, Python, PHP, верстку, Java, DevOps и Ruby on Rails/i);

        fireEvent.click(screen.getByRole('button', { name: 'Останусь здесь, запишусь на курс' }));
        await screen.findByText(/Ага, дублирую ссылку/i);
    })

    test('Try IT flow', async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Попробовать себя в IT' }));
        await screen.findByText(/У нас есть подготовительные курсы, которые длятся всего 2 недели/i);
    })

    test('Change profession flow', async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Попробовать себя в IT' }));
        await screen.findByText(/У нас есть подготовительные курсы, которые длятся всего 2 недели/i);

        fireEvent.click(screen.getByRole('button', { name: 'А что по поводу смены профессии?' }));
        await screen.findByText(/У нас есть программы обучения новой профессии./i);
    })

    test('Advansed flow', async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Я разработчик, хочу углубить свои знания' }));
        await screen.findByText(/Отлично! Есть несколько вариантов обучения для тех/i);
    })
})