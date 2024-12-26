import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, test, expect } from 'vitest';
import { WrappedWidget } from '../pages/wrappedWidgetPage.js';
import App from '../src/App.jsx';
import steps from '../__fixtures__/empty.js';

beforeEach(async () => {
    window.HTMLElement.prototype.scrollIntoView = function() {};
    render(<App appSteps={steps} />);
})

describe('Widget is not failed with empty configuration', () => {
    test('Widget renders successfully', () => {
        const wrappedWidget = new WrappedWidget(screen);
        expect(wrappedWidget.WrappedButton).toBeInTheDocument();
        expect(wrappedWidget.WrappedButton).toHaveTextContent('Открыть Чат');
    })

    test('General elements are not affected by empty configuration', async () => {
        fireEvent.click(screen.getByRole('button', { name: 'Открыть Чат' }));
        await screen.findByText('Виртуальный помощник');
        expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
        expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument();
        expect(screen.getByAltText('tota')).toBeInTheDocument();
        expect(document.querySelector('.message-body')).toHaveTextContent('');
    })
})