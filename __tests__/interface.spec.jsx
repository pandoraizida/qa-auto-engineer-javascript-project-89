import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, test, expect } from 'vitest';
import WrappedWidget from '../pages/wrappedWidgetPage.js';
import WelcomePage from '../pages/welcomePage.js';
import StartPage from '../pages/startPage.js';
import SwitchPage from '../pages/switchPage.js';
import DetailsPage from '../pages/detailsPage.js';
import SubscribePage from '../pages/subscribePage.js';
import TryPage from '../pages/tryPage.js';
import AdvancedPage from '../pages/advancedPage.js';
import App from '../src/App.jsx';

test('Should display correct elements on Welcome page', async () => {
    window.HTMLElement.prototype.scrollIntoView = function() {};
    render(<App/>);
    const wrappedWidget = new WrappedWidget(screen);
    await wrappedWidget.openWidget();

    const welcomePage = new WelcomePage(screen);
    expect(welcomePage.chatText).toBeVisible();
    expect(welcomePage.startConvButton).toBeVisible();
})

describe('Check chat interface', () => {
    beforeEach(async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {};
        render(<App/>);    
        const wrappedWidget = new WrappedWidget(screen);
        await wrappedWidget.openWidget();
        const welcomePage = new WelcomePage(screen);
        await welcomePage.startConversation();
    })
    
    test('should display correct elements on Start page', () => {
        const startPage = new StartPage(screen);
          expect(startPage.chatTextForStart).toBeVisible();
          expect(startPage.changeProfButton).toBeVisible();
          expect(startPage.tryItButton).toBeVisible();
          expect(startPage.advancedButton).toBeVisible();
          expect(startPage.chatTextForStart).toHaveTextContent(startPage.chatTextForStartFull);
    })

    test('should display correct elements on Switch page', async () => {
        const startPage = new StartPage(screen);
        await startPage.clickChangeProfession();

        const switchPage = new SwitchPage(screen);
            expect(switchPage.detailsButton).toBeVisible();
            expect(switchPage.easierButton).toBeVisible();
            expect(switchPage.returnBackButton).toBeVisible();
            expect(switchPage.chatTextForSwitch).toHaveTextContent(switchPage.chatTextForSwitchFull);
    })

    test('should display correct elements on Details page', async () => {
        const startPage = new StartPage(screen);
        await startPage.clickChangeProfession();

        const switchPage = new SwitchPage(screen);
        await switchPage.clickDetails();

        const detailsPage = new DetailsPage(screen);
            expect(detailsPage.subscribeButton).toBeVisible();
            expect(detailsPage.returnBackButton).toBeVisible();
            expect(detailsPage.chatTextForDetails1).toHaveTextContent(detailsPage.chatTextForDetailsFull1);
            expect(detailsPage.chatTextForDetails2).toHaveTextContent(detailsPage.chatTextForDetailsFull2);
    })

    test('should display correct elements on Subscribe page', async () => {
        const startPage = new StartPage(screen);
        await startPage.clickChangeProfession();

        const switchPage = new SwitchPage(screen);
        await switchPage.clickDetails();

        const detailsPage = new DetailsPage(screen);
        await detailsPage.clickSubscribe();

        const subscribePage = new SubscribePage(screen);
            expect(subscribePage.doubleButton).toBeVisible();
            expect(subscribePage.returnBackButton).toBeVisible();
            expect(subscribePage.chatTextForSubscribe1).toBeVisible();
            expect(subscribePage.chatTextForSubscribe2).toBeVisible();
    })

    test('should display correct elements on Try page', async () => {
        const startPage = new StartPage(screen);
        await startPage.clickChangeProfession();
        const switchPage = new SwitchPage(screen);
        await switchPage.clickSomeEasy();

        const tryPage = new TryPage(screen);
            expect(tryPage.intrestingButton).toBeVisible();
            expect(tryPage.changeProfButton).toBeVisible();
            expect(tryPage.returnBackButton).toBeVisible();
            expect(tryPage.chatTextForTry).toHaveTextContent(tryPage.chatTextForTryFull);
    })

    test('should display correct elements on Advanced page', async () => {
        const startPage = new StartPage(screen);
        await startPage.clickIamDeveloper();

        const advancedPage = new AdvancedPage(screen);
            expect(advancedPage.startButton).toBeVisible();
            expect(advancedPage.returnBackButton).toBeVisible();
            expect(advancedPage.chatTextForAdv1).toHaveTextContent(advancedPage.chatTextForAdvFull1);
            expect(advancedPage.chatTextForAdv2).toHaveTextContent(advancedPage.chatTextForAdvFull2);
    })
})
