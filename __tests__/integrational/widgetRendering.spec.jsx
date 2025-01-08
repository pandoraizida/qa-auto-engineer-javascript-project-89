import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, test, expect } from 'vitest';
import WrappedWidget from '../../pages/wrappedWidgetPage.js';
import GeneralElements from '../../pages/widgetGeneralElements.js';
import App from '../../src/App.jsx';
import steps from '../../__fixtures__/testConfiguration.js';
import steps2 from '../../__fixtures__/empty.js';
import getLastMessageText from '../../helpers/getLastMessage.js';

test('Widget with new configuration renders successfully', () => {
    render(<App appSteps={steps} />);
    const wrappedWidget = new WrappedWidget(screen);
    expect(wrappedWidget.WrappedButton).toBeVisible();
    expect(wrappedWidget.WrappedButton).toHaveTextContent('Открыть Чат');
})

describe('Widget is not failed with empty configuration', () => {
    beforeEach(async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {};
        render(<App appSteps={steps2} />);
    })

    test('Widget with empty configuration renders successfully', () => {
        const wrappedWidget = new WrappedWidget(screen);
        expect(wrappedWidget.WrappedButton).toBeVisible();
        expect(wrappedWidget.WrappedButton).toHaveTextContent('Открыть Чат');
    })

    test('General elements are not affected by empty configuration', async () => {
        const wrappedWidget = new WrappedWidget(screen);
        await wrappedWidget.openWidget();
        const generalElements = new GeneralElements(screen);
        expect(generalElements.closeWidgetButton).toBeVisible();
        expect(generalElements.modalHeaderText).toBeVisible();
        expect(generalElements.widgetAvatar).toBeVisible();
        expect(getLastMessageText()).toHaveTextContent('');
    })
})
