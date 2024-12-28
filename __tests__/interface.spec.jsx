import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, afterEach, describe, test, expect } from 'vitest';
import WelcomePage from '../pages/welcomePage.js';
import StartPage from '../pages/startPage.js';
import SwitchPage from '../pages/switchPage.js';
import DelailsPage from '../pages/detailsPage.js';
import SubscribePage from '../pages/subscribePage.js';
import TryPage from '../pages/tryPage.js';
import AdvansedPage from '../pages/advancsedPage.js';
import App from '../src/App.jsx';

test('Check chat interface on Welcome page', async () => {
    window.HTMLElement.prototype.scrollIntoView = function() {};
    render(<App/>);
    fireEvent.click(screen.getByRole('button', { name: 'Открыть Чат' }));
    await screen.findByText('Начать разговор');

    const welcomePage = new WelcomePage(screen);
    expect(welcomePage.chatText).toBeInTheDocument();
    expect(welcomePage.startConvButton).toBeInTheDocument();
})

describe('Check chat interface', () => {
    beforeEach(async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {};
        render(<App/>);
    
        //open Start page
        fireEvent.click(screen.getByRole('button', { name: 'Открыть Чат' }));
        await screen.findByText('Начать разговор');
    
        fireEvent.click(screen.getByRole('button', { name: 'Начать разговор' }));
        await screen.findByText('Сменить профессию или трудоустроиться');
    })
    
    afterEach(async () => {
        //close widget
        fireEvent.click(screen.getByRole('button', { name: 'Close' }));
        await screen.findByText('Открыть Чат');
    })

    test('on Start page', () => {
        const startPage = new StartPage(screen);
          expect(startPage.chatTextForStart).toBeInTheDocument();
          expect(startPage.changeProfButton).toBeInTheDocument();
          expect(startPage.tryItButton).toBeInTheDocument();
          expect(startPage.advancedButton).toBeInTheDocument();
          expect(screen.getByText('Начать разговор').tagName).toBe('P');
          expect(startPage.chatTextForStart).toHaveTextContent(startPage.chatTextForStartFull);
    })

    test('on Switch page', async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Сменить профессию или трудоустроиться' }));
        await screen.findByText('Расскажи подробнее');
        const switchPage = new SwitchPage(screen);
            expect(switchPage.detailsButton).toBeInTheDocument();
            expect(switchPage.easierButton).toBeInTheDocument();
            expect(switchPage.returnBackButton).toBeInTheDocument();
            expect(screen.getByText('Сменить профессию или трудоустроиться').tagName).toBe('P')
            expect(switchPage.chatTextForSwitch).toHaveTextContent(switchPage.chatTextForSwitchFull);
    })

    test('on Details page', async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Сменить профессию или трудоустроиться' }));
        await screen.findByText('Расскажи подробнее');
        fireEvent.click(screen.getByRole('button', { name: 'Расскажи подробнее' }));
        await screen.findByText('Останусь здесь, запишусь на курс');
        const delailsPage = new DelailsPage(screen);
            expect(delailsPage.subscribeButton).toBeInTheDocument();
            expect(delailsPage.returnBackButton).toBeInTheDocument();
            expect(screen.getByText('Расскажи подробнее').tagName).toBe('P')
            expect(delailsPage.chatTextForDetails1).toHaveTextContent(delailsPage.chatTextForDetailsFull1);
            expect(delailsPage.chatTextForDetails2).toHaveTextContent(delailsPage.chatTextForDetailsFull2);
    })

    test('on Subscribe page', async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Сменить профессию или трудоустроиться' }));
        await screen.findByText('Расскажи подробнее');
        fireEvent.click(screen.getByRole('button', { name: 'Расскажи подробнее' }));
        await screen.findByText('Останусь здесь, запишусь на курс');
        fireEvent.click(screen.getByRole('button', { name: 'Останусь здесь, запишусь на курс' }));
        await screen.findByText('Верни меня в начало');

        const subscribePage = new SubscribePage(screen);
            expect(subscribePage.doubleButton).toBeInTheDocument();
            expect(subscribePage.returnBackButton).toBeInTheDocument();
            expect((screen.getAllByText(/Останусь здесь, запишусь на курс/i)[0]).tagName).toBe('P');
            expect(subscribePage.chatTextForSubscribe1).toBeInTheDocument();
            expect(subscribePage.chatTextForSubscribe2).toBeInTheDocument();
    })

    test('on Try page', async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Сменить профессию или трудоустроиться' }));
        await screen.findByText('А есть что-нибудь попроще');
        fireEvent.click(screen.getByRole('button', { name: 'А есть что-нибудь попроще' }));
        await screen.findByText('Интересно');

        const tryPage = new TryPage(screen);
            expect(tryPage.intrestingButton).toBeInTheDocument();
            expect(tryPage.changeProfButton).toBeInTheDocument();
            expect(tryPage.returnBackButton).toBeInTheDocument();
            expect(screen.getByText('А есть что-нибудь попроще').tagName).toBe('P')
            expect(tryPage.chatTextForTry).toHaveTextContent(tryPage.chatTextForTryFull);
    })

    test('on Advansed page', async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Я разработчик, хочу углубить свои знания' }));
        await screen.findByText('Расскажи подробнее');

        const advansedPage = new AdvansedPage(screen);
            expect(advansedPage.startButton).toBeInTheDocument();
            expect(advansedPage.returnBackButton).toBeInTheDocument();
            expect(screen.getByText('Я разработчик, хочу углубить свои знания').tagName).toBe('P');
            expect(advansedPage.chatTextForAdv1).toHaveTextContent(advansedPage.chatTextForAdvFull1);
            expect(advansedPage.chatTextForAdv2).toHaveTextContent(advansedPage.chatTextForAdvFull2);
    })
})
