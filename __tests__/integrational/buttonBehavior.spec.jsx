import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, test, expect } from 'vitest';
import App from '../../src/App.jsx';
import steps from '../../__fixtures__/testConfiguration.js';
import getLastMessageText from '../../helpers/getLastMessage.js';

describe('Widget buttons lead to step from configuration', async () => {
    beforeEach(async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {};
        render(<App appSteps={steps} />);

        //open Widget
        fireEvent.click(screen.getByRole('button', { name: 'Открыть Чат' }));
        await screen.findByText('Hi! This is a test! Check that the message is from configuration file');

        fireEvent.click(screen.getByRole('button', { name: 'Check that the button text is from configuration file' }));
        await screen.findByText('Here are some buttons leads to different pages');
    })

    test('Button leads to page in configuration', async () => {
        fireEvent.click(screen.getByRole('button', { name: '<script> Alert("Test") </script>' }));
        await screen.findByText(/Here are a lot of messages and none buttons/i);
    })

    test('Widget works correctly when button leads to the same page', async () => {
        fireEvent.click(screen.getByRole('button', { name: 'leads to itself' }));
        expect(screen.getByRole('button', { name: 'leads to itself' })).toBeVisible();
        expect(getLastMessageText()).toHaveTextContent('Here are some buttons leads to different pages');
    })
    
    test('Widget works correctly when button leads to nonexistent page', async () => {
        fireEvent.click(screen.getByRole('button', { name: 'leads on nonexistent page' }));
        expect(screen.getByRole('button', { name: 'leads on nonexistent page' })).toBeVisible();

        // const allMessages = document.querySelectorAll('.message-body'); // считаю, что моя проверка более точная
        // const lastMessage = allMessages[allMessages.length-1];         // проверяю текст последнего сообщения, а не всех на свете
        // expect(lastMessage).toHaveTextContent('');                    // не стала ее убирать, немного отрефакторила
        expect(getLastMessageText()).toHaveTextContent('');
    })

    test('Widget works correctly when page is null', async () => {
        fireEvent.click(screen.getByRole('button', { name: 'leads to null page' }));
        expect(screen.getByRole('button', { name: 'leads to null page' })).toBeVisible();
        expect(getLastMessageText()).toHaveTextContent('');
    })

    test('Widget works correctly when page is number', async() => {
        fireEvent.click(screen.getByRole('button', { name: 'leads to number page' }));
        expect(screen.getByRole('button', { name: 'leads to number page' })).toBeVisible();
        expect(getLastMessageText()).toHaveTextContent('');
    })  
})
