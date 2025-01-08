import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, beforeEach, test, expect } from 'vitest';
import WrappedWidget from '../pages/wrappedWidgetPage.js';
import GeneralElements from '../pages/widgetGeneralElements.js';
import WelcomePage from '../pages/welcomePage.js';
import StartPage from '../pages/startPage.js';
import SwitchPage from '../pages/switchPage.js';
import DetailsPage from '../pages/detailsPage.js';
import TryPage from '../pages/tryPage.js';
import AdvancedPage from '../pages/advancedPage.js';
import getLastMessageText from '../helpers/getLastMessage.js';
import App from '../src/App.jsx';

describe('Check widget functionality', () => {
    beforeEach(async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {};
        render(<App />);
        const wrappedWidget = new WrappedWidget(screen);
        await wrappedWidget.openWidget();
    });

    test('General widget elements are presented', async () => {
        const generalElements = new GeneralElements(screen);
        expect(generalElements.modalHeaderText).toBeVisible();
        expect(generalElements.closeWidgetButton).toBeVisible();
        expect(generalElements.widgetAvatar).toBeVisible();
    })

    test('Close button wrapped the widget', async () => {
        const generalElements = new GeneralElements(screen);
        expect(generalElements.closeWidgetButton).toBeVisible();
        await generalElements.closeWidget();

        const wrappedWidget = new WrappedWidget(screen);
        expect(wrappedWidget.WrappedButton).toBeVisible();
    })

    test('Return back leads to Start page', async () => {
        const welcomePage = new WelcomePage(screen);
        await welcomePage.startConversation();

        const startPage = new StartPage(screen);
        await startPage.clickIamDeveloper();

        const advancedPage = new AdvancedPage(screen);
        await advancedPage.clickReturnBack();
        
        expect(startPage.chatTextForStart).toBeVisible();
    })

    test('After click on button it has tag <p>', async () => {
        const welcomePage = new WelcomePage(screen);
        await welcomePage.startConversation();
        expect(screen.getByText('Начать разговор').tagName).toBe('P');

        const startPage = new StartPage(screen);
        await startPage.clickIamDeveloper();
        expect(screen.getByText('Я разработчик, хочу углубить свои знания').tagName).toBe('P');
    })
})

describe('Check buttons from Start page', () => {
    beforeEach(async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {};
        render(<App/>);    
        const wrappedWidget = new WrappedWidget(screen);
        await wrappedWidget.openWidget();
        const welcomePage = new WelcomePage(screen);
        await welcomePage.startConversation();
    });

    test('<Change profession> button leads to Switch page', async () => {
        const startPage = new StartPage(screen);
        await startPage.clickChangeProfession();
        await screen.findByText(/Помогу вам выбрать подходящий курс/i);
    })

    test('<Try IT> button leads to Try page', async () => {
        const startPage = new StartPage(screen);
        await startPage.clickTryIt();
        await screen.findByText(/У нас есть подготовительные курсы, которые длятся всего 2 недели/i);
    })

    test('<I am developer> button leads to Advanced page', async () => {
        const startPage = new StartPage(screen);
        await startPage.clickIamDeveloper();
        await screen.findByText(/Отлично! Есть несколько вариантов обучения для тех, кто хочет углубить знания/i);
    })
})

describe('Check buttons from Switch page', () => {
    beforeEach(async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {};
        render(<App/>);    
        const wrappedWidget = new WrappedWidget(screen);
        await wrappedWidget.openWidget();
        const welcomePage = new WelcomePage(screen);
        await welcomePage.startConversation();
        const startPage = new StartPage(screen);
        await startPage.clickChangeProfession();
    });

    test('<Details> button leads to Details page', async () => {
        const switchPage = new SwitchPage(screen);
        await switchPage.clickDetails();
        await screen.findByText(/В Хекслете можно освоить JavaScript, Python, PHP, верстк/i);
    })

    test('<Something Easy> button leads to Try page', async () => {
        const switchPage = new SwitchPage(screen);
        await switchPage.clickSomeEasy();
        await screen.findByText(/У нас есть подготовительные курсы, которые длятся всего 2 недели/i);
    })
})

describe('Check buttons from Try page', () => {
    beforeEach(async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {};
        render(<App/>);    
        const wrappedWidget = new WrappedWidget(screen);
        await wrappedWidget.openWidget();
        const welcomePage = new WelcomePage(screen);
        await welcomePage.startConversation();
        const startPage = new StartPage(screen);
        await startPage.clickTryIt();
    });

    test('<Intresting> button leads to Details page', async () => {
        const tryPage = new TryPage(screen);
        await tryPage.clickIntresting();
        await screen.findByText(/В Хекслете можно освоить JavaScript, Python, PHP, верстк/i);
    })

    test('<Change profession> button leads to Switch page', async () => {
        const tryPage = new TryPage(screen);
        await tryPage.clickWhatAbout();
        await screen.findByText(/У нас есть программы обучения новой профессии/i);
    })
})

describe('Check buttons from Details and Advanced pages', () => {
    beforeEach(async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {};
        render(<App/>);    
        const wrappedWidget = new WrappedWidget(screen);
        await wrappedWidget.openWidget();
        const welcomePage = new WelcomePage(screen);
        await welcomePage.startConversation();
    });

    test('<Subscribe> button leads to Subscribe page', async () => {
        const startPage = new StartPage(screen);
        await startPage.clickChangeProfession();
        const switchPage = new SwitchPage(screen);
        await switchPage.clickDetails();
        const detailsPage = new DetailsPage(screen);
        await detailsPage.clickSubscribe();
        await screen.findByText(/Ага, дублирую ссылку/i);
    })

    test('<Tell more> button leads to Start page', async () => {
        const startPage = new StartPage(screen);
        await startPage.clickIamDeveloper();
        const advancedPage = new AdvancedPage(screen);
        await advancedPage.clickTellMeMore();
        expect(getLastMessageText()).toHaveTextContent('Привет! Я ваш виртуальный помощник. Нажмите "Начать разговор", чтобы открыть чат');
    })
})
