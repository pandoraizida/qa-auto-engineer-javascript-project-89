import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, test, expect} from 'vitest';
import FormElements from '../pages/formPage.js';
import WidgetElements from '../pages/widgetPage.js'
import App from '../src/App.jsx';
import steps from '../__fixtures__/steps.js';

test('Should display correct Form elements', async () => {
    render(<App/>);
    const formElements = new FormElements(screen);
    expect(await formElements.currentField('Email')).toBeVisible();
    expect(await formElements.currentField('Пароль')).toBeVisible();
    expect(await formElements.currentField('Адрес')).toBeVisible();
    expect(await formElements.currentField('Город')).toBeVisible();
    expect(await formElements.currentField('Страна')).toBeVisible();
    expect(await formElements.countrySelectedValue()).toBeVisible();
    expect(await formElements.findAllElements('option')).toHaveLength(4);
    expect(await formElements.acceptCheckbox()).toBeVisible();
    expect(await formElements.currentButton('Зарегистрироваться')).toBeVisible();
    expect(await formElements.findAllElements('button')).toHaveLength(2);
    expect(await formElements.currentButton('Зарегистрироваться')).toBeVisible();
})

test('Should display correct Widget elements on Welcome page', async () => {
    window.HTMLElement.prototype.scrollIntoView = function() {};
    render(<App/>);
    const widgetElements = new WidgetElements(screen);
    await widgetElements.clickWidgetButton(('Открыть Чат'));
    widgetElements.expectLastMessageVisability(steps[0].messages[0]);
})

describe('Check Widget interface', () => {
    beforeEach(async () => {
        window.HTMLElement.prototype.scrollIntoView = function() {};
        render(<App/>);    
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(('Открыть Чат'));
        await widgetElements.clickWidgetButton(steps[0].buttons[0].text); //Начать разговор
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
        await widgetElements.clickWidgetButton(steps[1].buttons[1].text); //Попробовать себя в IT

        widgetElements.expectLastMessageVisability(steps[2].messages[0]);
        widgetElements.expectCurrenButtonVisability(steps[2].buttons[0].text);
        widgetElements.expectCurrenButtonVisability(steps[2].buttons[1].text);
        widgetElements.expectCurrenButtonVisability(steps[2].buttons[2].text);
    })

    test('should display correct elements on Switch page', async () => {
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(steps[1].buttons[0].text); //Сменить профессию или трудоустроиться

        widgetElements.expectLastMessageVisability(steps[3].messages[0]);
        widgetElements.expectCurrenButtonVisability(steps[3].buttons[0].text);
        widgetElements.expectCurrenButtonVisability(steps[3].buttons[1].text);
        widgetElements.expectCurrenButtonVisability(steps[3].buttons[2].text);    
    })

    test('should display correct elements on Details page', async () => {
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(steps[1].buttons[0].text); //Сменить профессию или трудоустроиться
        await widgetElements.clickWidgetButton(steps[3].buttons[0].text) //Расскажи подробнее

        widgetElements.expectLastMessageVisability(steps[4].messages[0]);
        widgetElements.expectCurrenButtonVisability(steps[4].buttons[0].text);
        widgetElements.expectCurrenButtonVisability(steps[4].buttons[1].text);
    })

    test('should display correct elements on Advanced page', async () => {
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(steps[1].buttons[2].text); //Я разработчик, хочу углубить свои знания

        widgetElements.expectLastMessageVisability(steps[5].messages[0]);
        widgetElements.expectLastMessageVisability(steps[5].messages[1]);
        widgetElements.expectCurrenButtonVisability(steps[5].buttons[0].text);
        widgetElements.expectCurrenButtonVisability(steps[5].buttons[1].text);
    })

    test('should display correct elements on Subscribe page', async () => {
        const widgetElements = new WidgetElements(screen);
        await widgetElements.clickWidgetButton(steps[1].buttons[0].text); //Сменить профессию или трудоустроиться
        await widgetElements.clickWidgetButton(steps[3].buttons[0].text) //Расскажи подробнее
        await widgetElements.clickWidgetButton(steps[4].buttons[0].text) //Останусь здесь, запишусь на курс
        
        widgetElements.expectLastMessageVisability(steps[6].messages[0]);
        widgetElements.expectLastMessageVisability(steps[6].messages[1]);
        widgetElements.expectCurrenButtonVisability(steps[6].buttons[0].text);
        widgetElements.expectCurrenButtonVisability(steps[6].buttons[1].text);
    })
})
