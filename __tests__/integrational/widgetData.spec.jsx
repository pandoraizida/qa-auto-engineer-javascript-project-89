import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, test } from 'vitest';
import WidgetElements from '../../pages/widgetPage.js';
import App from '../../src/App.jsx';
import steps from '../../__fixtures__/testConfiguration.js';

describe('Widget content is from configuration', async () => {
    beforeEach(async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {};
        render(<App appSteps={steps} />);
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton('Открыть Чат');
    })

    test('Message text is from configuration', () => {
        const widgetElements = new WidgetElements(screen);
        widgetElements.expectLastMessageVisability(steps[0].messages[0]);
    })

    test('Button text is from configuration', () => {
        const widgetElements = new WidgetElements(screen);
        widgetElements.expectCurrenButtonVisability(steps[0].buttons[0].text);
    })

    test('Extra button from configuration is existed', () => {
        const widgetElements = new WidgetElements(screen);
        widgetElements.expectCurrenButtonVisability(steps[0].buttons[1].text);
    })

    test('Widget works correctly with js injection in message text', async () => {
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(steps[0].buttons[1].text);
        widgetElements.expectLastMessageVisability(steps[2].messages[3]);
    })

    test('Widget works correctly with js injection in button text', async () => {
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(steps[0].buttons[0].text);
        widgetElements.expectCurrenButtonVisability(steps[1].buttons[0].text);
    })
})
