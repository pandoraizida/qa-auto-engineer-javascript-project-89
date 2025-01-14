import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, test, expect} from 'vitest';
import FormElements from '../pages/formPage.js';
import WidgetElements from '../pages/widgetPage.js'
import App from '../src/App.jsx';
import steps from '../__fixtures__/steps.js';

describe('Should display correct Form elements', () => {
    beforeEach(async () => {
        render(<App/>);
    })

    test.each([
        { field: 'Email' },
        { field: 'Пароль' },
        { field: 'Адрес' },
        { field: 'Город' },
        { field: 'Страна' },
        { field: 'Принять правила' }
    ])('Should display field: %s', async ({ field }) => {
        const formElements = new FormElements(screen);
        expect(await formElements.currentField(field)).toBeVisible();
    });

    test('Should display registration button', async () => {
        const formElements = new FormElements(screen);
        expect(await formElements.registrationButton()).toBeVisible();
    })
})

test('Should display correct Widget elements on Welcome page', async () => {
    window.HTMLElement.prototype.scrollIntoView = function() {};
    render(<App/>);
    const widgetElements = new WidgetElements(screen);
    await widgetElements.clickWidgetButton(('Открыть Чат'));
    widgetElements.expectLastMessageVisability(steps[0].messages[0]);
})

// Параметризованные тесты, как предложено для виджета в примере из ревью, тяжело читаемы и интуитивно не понятны
// что затрудняет дальнейшую с ними работу и отладку
// предлагаю оставить как есть

describe('Check Widget interface', () => {
    beforeEach(async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {};
        render(<App/>);    
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(('Открыть Чат'));
        await widgetElements.clickWidgetButton(steps[0].buttons[0].text);
        widgetElements.expectLastMessageVisability(steps[0].messages[0]);
    })
    
    test('should display correct elements on Start page', () => {
        const widgetElements = new WidgetElements(screen);
        widgetElements.expectLastMessageVisability(steps[1].messages[0]);
        widgetElements.expectCurrenButtonVisability(steps[1].buttons[0].text);
        widgetElements.expectCurrenButtonVisability(steps[1].buttons[1].text);
        widgetElements.expectCurrenButtonVisability(steps[1].buttons[2].text);
    })

    test('should display correct elements on Try page', async () => {
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(steps[1].buttons[1].text);

        widgetElements.expectLastMessageVisability(steps[2].messages[0]);
        widgetElements.expectCurrenButtonVisability(steps[2].buttons[0].text);
        widgetElements.expectCurrenButtonVisability(steps[2].buttons[1].text);
        widgetElements.expectCurrenButtonVisability(steps[2].buttons[2].text);
    })

    test('should display correct elements on Switch page', async () => {
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(steps[1].buttons[0].text);

        widgetElements.expectLastMessageVisability(steps[3].messages[0]);
        widgetElements.expectCurrenButtonVisability(steps[3].buttons[0].text);
        widgetElements.expectCurrenButtonVisability(steps[3].buttons[1].text);
        widgetElements.expectCurrenButtonVisability(steps[3].buttons[2].text);    
    })

    test('should display correct elements on Details page', async () => {
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(steps[1].buttons[0].text);
        await widgetElements.clickWidgetButton(steps[3].buttons[0].text);

        widgetElements.expectLastMessageVisability(steps[4].messages[0]);
        widgetElements.expectCurrenButtonVisability(steps[4].buttons[0].text);
        widgetElements.expectCurrenButtonVisability(steps[4].buttons[1].text);
    })

    test('should display correct elements on Advanced page', async () => {
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(steps[1].buttons[2].text);

        widgetElements.expectLastMessageVisability(steps[5].messages[0]);
        widgetElements.expectLastMessageVisability(steps[5].messages[1]);
        widgetElements.expectCurrenButtonVisability(steps[5].buttons[0].text);
        widgetElements.expectCurrenButtonVisability(steps[5].buttons[1].text);
    })

    test('should display correct elements on Subscribe page', async () => {
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(steps[1].buttons[0].text);
        await widgetElements.clickWidgetButton(steps[3].buttons[0].text);
        await widgetElements.clickWidgetButton(steps[4].buttons[0].text);
        
        widgetElements.expectLastMessageVisability(steps[6].messages[0]);
        widgetElements.expectLastMessageVisability(steps[6].messages[1]);
        widgetElements.expectCurrenButtonVisability(steps[6].buttons[0].text);
        widgetElements.expectCurrenButtonVisability(steps[6].buttons[1].text);
    })
})
