import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, beforeEach, test, expect } from 'vitest';
import WidgetElements from '../../pages/widgetPage.js';
import App from '../../src/App.jsx';
import steps from '../../__fixtures__/steps.js';

describe('Check widget functionality', () => {
    beforeEach(async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {};
        render(<App />);
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(('Открыть Чат'));
    });

    test('General widget elements are presented', async () => {
        const widgetElements = new WidgetElements(screen);
        expect(await widgetElements.modalHeaderText()).toBeVisible();
        expect(await widgetElements.closeWidgetButton()).toBeVisible();
        expect(await widgetElements.widgetAvatar()).toBeVisible();
    })

    test('Close button wrapped the widget', async () => {
        const widgetElements = new WidgetElements(screen);
        expect(await widgetElements.closeWidgetButton()).toBeVisible();
        await widgetElements.clickWidgetButton('Close');

        expect(widgetElements.wrappedWidgetButton).toBeVisible();
    })

    test('Return back leads to Start page', async () => {
        const widgetElements = new WidgetElements(screen);

        await widgetElements.clickWidgetButton(steps[0].buttons[0].text);
        await widgetElements.clickWidgetButton(steps[1].buttons[2].text);
        await widgetElements.clickWidgetButton(steps[5].buttons[1].text);

        widgetElements.expectLastMessageVisability(steps[1].messages[0]);
        widgetElements.expectCurrenButtonVisability(steps[1].buttons[0].text);
    })

    test('Click on button leads to appropriate page', async () => {
        const widgetElements = new WidgetElements(screen);

        await widgetElements.clickWidgetButton(steps[0].buttons[0].text);
        widgetElements.expectLastMessageVisability(steps[1].messages[0]);

        await widgetElements.clickWidgetButton(steps[1].buttons[1].text);
        widgetElements.expectLastMessageVisability(steps[2].messages[0]);

        await widgetElements.clickWidgetButton(steps[2].buttons[0].text);
        widgetElements.expectLastMessageVisability(steps[4].messages[0]);
    })

    test('After click on button it has tag <p>', async () => {
        const widgetElements = new WidgetElements(screen);

        await widgetElements.clickWidgetButton(steps[0].buttons[0].text);
        expect(await widgetElements.getTagForText(steps[0].buttons[0].text)).toBe('P');

        await widgetElements.clickWidgetButton(steps[1].buttons[2].text);
        expect(await widgetElements.getTagForText(steps[1].buttons[2].text)).toBe('P');
    })
})
