import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, test, expect } from 'vitest';
import App from '../../src/App.jsx';
import steps from '../../__fixtures__/testConfiguration.js';
import getLastMessageText from '../../helpers/getLastMessage.js';

describe('Widget content is from configuration', async () => {
    beforeEach(async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {};
        render(<App appSteps={steps} />);

        //open Widget
        fireEvent.click(screen.getByRole('button', { name: 'Открыть Чат' }));
        await screen.findByText('Hi! This is a test! Check that the message is from configuration file');
    })

    test('Message text is from configuration', () => {
        expect(screen.getByText('Hi! This is a test! Check that the message is from configuration file')).toBeVisible();
    })

    test('Button text is from configuration', () => {
        expect(screen.getByRole('button', { name: 'Check that the button text is from configuration file' })).toBeVisible();
    })

    test('Extra button from configuration is existed', () => {
        expect(screen.getByRole('button', { name: 'New button leads to the new page' })).toBeVisible();
    })

    test('Widget works correctly with js injection in message text', async () => {
        fireEvent.click(screen.getByRole('button', { name: 'New button leads to the new page' }));
        expect(getLastMessageText()).toHaveTextContent('<script> Alert("Test") </script>');
    })

    test('Widget works correctly with js injection in button text', () => {
        fireEvent.click(screen.getByRole('button', { name: 'Check that the button text is from configuration file' }));
        expect(screen.getByRole('button', { name: '<script> Alert("Test") </script>' })).toBeVisible();
    })
})
