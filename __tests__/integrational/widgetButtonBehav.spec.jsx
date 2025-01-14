import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, test } from 'vitest';
import App from '../../src/App.jsx';
import steps from '../../__fixtures__/testConfiguration.js';
import WidgetElements from '../../pages/widgetPage.js';

describe('Widget buttons lead to step from configuration', async () => {
    beforeEach(async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {};
        render(<App appSteps={steps} />);

        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(('Открыть Чат'));
        await widgetElements.clickWidgetButton(steps[0].buttons[0].text);
    })

    test('Button leads to page in configuration', async () => {
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(steps[1].buttons[0].text);
        widgetElements.expectLastMessageVisability(steps[2].messages[3]);
    })

    test('Widget works correctly when button leads to the same page', async () => {
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(steps[1].buttons[1].text);
        widgetElements.expectLastMessageVisability(steps[1].messages[0]);
    })
    
    test('Widget works correctly when button leads to nonexistent page', async () => {
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(steps[1].buttons[2].text);
        widgetElements.expectLastMessageVisability('');
    })

    test('Widget works correctly when page is null', async () => {
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(steps[1].buttons[3].text);
        widgetElements.expectLastMessageVisability('');
    })

    test('Widget works correctly when page is number', async() => {
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(steps[1].buttons[4].text);
        widgetElements.expectLastMessageVisability('');
    })  
})
