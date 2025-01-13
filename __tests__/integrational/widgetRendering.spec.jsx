import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, test, expect } from 'vitest';
import WidgetElements from '../../pages/widgetPage.js';
import App from '../../src/App.jsx';
import steps from '../../__fixtures__/testConfiguration.js';
import steps2 from '../../__fixtures__/empty.js';

test('Widget with new configuration renders successfully', () => {
    render(<App appSteps={steps} />);
    const widgetElements = new WidgetElements(screen);
    expect(widgetElements.wrappedWidgetButton).toBeVisible();
    expect(widgetElements.wrappedWidgetButton).toHaveTextContent('Открыть Чат');
})

describe('Widget is not failed with empty configuration', () => {
    beforeEach(async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {};
        render(<App appSteps={steps2} />);
    })

    test('Widget with empty configuration renders successfully', () => {
        const widgetElements = new WidgetElements(screen);
        expect(widgetElements.wrappedWidgetButton).toBeVisible();
    })

    test('General elements are not affected by empty configuration', async () => {
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(('Открыть Чат'));
        
        expect(await widgetElements.closeWidgetButton()).toBeVisible();
        expect(await widgetElements.modalHeaderText()).toBeVisible();
        expect(await widgetElements.widgetAvatar()).toBeVisible();
        widgetElements.expectLastMessageVisability('');
    })
})
