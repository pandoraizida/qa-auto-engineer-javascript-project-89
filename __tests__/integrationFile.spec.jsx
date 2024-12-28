import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, afterEach, describe, test, expect } from 'vitest';
import WrappedWidget from '../pages/wrappedWidgetPage.js';
import App from '../src/App.jsx';
import steps from '../__fixtures__/testConfiguration.js';

test('Widget with new configuration renders successfully', () => {
    render(<App appSteps={steps} />);
    const wrappedWidget = new WrappedWidget(screen);
    expect(wrappedWidget.WrappedButton).toBeInTheDocument();
    expect(wrappedWidget.WrappedButton).toHaveTextContent('Открыть Чат');
})

describe('Widget content is from configuration', async () => {
    beforeEach(async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {};
        render(<App appSteps={steps} />);

        //open Widget
        fireEvent.click(screen.getByRole('button', { name: 'Открыть Чат' }));
        await screen.findByText('Hi! This is a test! Check that the message is from configuration file');
    })

    afterEach(async () => {
        //close widget
        fireEvent.click(screen.getByRole('button', { name: 'Close' }));
        await screen.findByText('Открыть Чат');
    })
    
    test('General Widget elements are not affected by new configuration', () => {
        expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
        expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument();
        expect(screen.getByAltText('tota')).toBeInTheDocument();
    })

    test('Message text is from configuration', () => {
        expect(screen.getByText('Hi! This is a test! Check that the message is from configuration file')).toBeInTheDocument();
    })

    test('Button text is from configuration', () => {
        expect(screen.getByRole('button', { name: 'Check that the button text is from configuration file' })).toBeInTheDocument();
    })

    test('Extra button from configuration is existed', () => {
        expect(screen.getByRole('button', { name: 'New button leads to the new page' })).toBeInTheDocument();
    })

    test('Widget works correctly with js injection in message text', () => {
        fireEvent.click(screen.getByRole('button', { name: 'New button leads to the new page' }));

        const allMessages = document.querySelectorAll('.message-body');
        const lastMessage = allMessages[allMessages.length-1];
        expect(lastMessage).toHaveTextContent('<script> Alert("Test") </script>');
    })

    test('Widget works correctly with js injection in button text', () => {
        fireEvent.click(screen.getByRole('button', { name: 'Check that the button text is from configuration file' }));
        expect(screen.getByRole('button', { name: '<script> Alert("Test") </script>' })).toBeInTheDocument();
    })
})

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

    afterEach(async () => {
        //close widget
        fireEvent.click(screen.getByRole('button', { name: 'Close' }));
        await screen.findByText('Открыть Чат');
    })

    test('Button leads to page in configuration', async () => {
        fireEvent.click(screen.getByRole('button', { name: '<script> Alert("Test") </script>' }));
        await screen.findByText(/Here are a lot of messages and none buttons/i);
    })

    test('Widget works correctly when button leads to the same page', () => {
        fireEvent.click(screen.getByRole('button', { name: 'leads to itself' }));
        expect((screen.getAllByText(/leads to itself/i)[0]).tagName).toBe('P');
        expect(screen.getByRole('button', { name: 'leads to itself' })).toBeInTheDocument();

        const allMessages = document.querySelectorAll('.message-body');
        const lastMessage = allMessages[allMessages.length-1];
        expect(lastMessage).toHaveTextContent('Here are some buttons leads to different pages');
    })
    
    test('Widget works correctly when button leads to nonexistent page', () => {
        fireEvent.click(screen.getByRole('button', { name: 'leads on nonexistent page' }));
        expect((screen.getAllByText(/leads on nonexistent page/i)[0]).tagName).toBe('P');
        expect(screen.getByRole('button', { name: 'leads on nonexistent page' })).toBeInTheDocument();

        const allMessages = document.querySelectorAll('.message-body');
        const lastMessage = allMessages[allMessages.length-1];
        expect(lastMessage).toHaveTextContent('');
    })

    test('Widget works correctly when page is null', () => {
        fireEvent.click(screen.getByRole('button', { name: 'leads to null page' }));
        expect((screen.getAllByText(/leads to null page/i)[0]).tagName).toBe('P');
        expect(screen.getByRole('button', { name: 'leads to null page' })).toBeInTheDocument();

        const allMessages = document.querySelectorAll('.message-body');
        const lastMessage = allMessages[allMessages.length-1];
        expect(lastMessage).toHaveTextContent('');
    })

    test('Widget works correctly when page is number', () => {
        fireEvent.click(screen.getByRole('button', { name: 'leads to number page' }));
        expect((screen.getAllByText(/leads to number page/i)[0]).tagName).toBe('P');
        expect(screen.getByRole('button', { name: 'leads to number page' })).toBeInTheDocument();

        const allMessages = document.querySelectorAll('.message-body');
        const lastMessage = allMessages[allMessages.length-1];
        expect(lastMessage).toHaveTextContent('');
    })  
})
