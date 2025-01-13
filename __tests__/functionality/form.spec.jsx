import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, beforeEach, test, expect } from 'vitest';
import FormElements from '../../pages/formPage.js';
import App from '../../src/App.jsx';

const userData = {
    email: 'user@test.com',
    password: 'user_pass',
    adress: 'Cosy alley, 666',
    city: 'Sweet city',
    county: 'Аргентина'
}

const tableTitles = ['Принять правила', 'Адрес', 'Город', 'Страна', 'Email', 'Пароль'];

describe('Check form functionality', () => {

    beforeEach(async () => {
        render(<App />);
    });

    test('After registration user data is displayed if all form fields were filled', async () => {
        const formElements = new FormElements(screen);
        await formElements.typeValue('Email', userData.email);
        expect(screen.getByDisplayValue(userData.email)).toBeVisible();

        await formElements.typeValue('Пароль', userData.password);
        await formElements.typeValue('Адрес', userData.adress);
        await formElements.typeValue('Город', userData.city);
        await formElements.clickCheckbox();
        await formElements.typeValue('Страна', userData.county);
        await formElements.clickButton('Зарегистрироваться');
        
        expect(await formElements.currentButton('Назад')).toBeVisible();
        expect(await formElements.findAllElements('button')).toHaveLength(2);
        expect(await formElements.currentTable()).toBeVisible();
        expect(await formElements.findAllElements('row')).toHaveLength(6);
        expect(await formElements.acceptedRules('true')).toBeVisible();
        formElements.expectTableTitlesVisibility(tableTitles);
        formElements.expectUserDataVisability(userData);
    })

    test('After registration user data is not displayed if form fields were not filled', async () => {
        const formElements = new FormElements(screen);
        await formElements.clickButton(('Зарегистрироваться'));

        expect(await formElements.currentButton('Назад')).toBeVisible();
        expect(await formElements.findAllElements('button')).toHaveLength(2);
        expect(await formElements.currentTable()).toBeVisible();
        formElements.expectTableTitlesVisibility(tableTitles);
        formElements.expectUserDataVisability(userData, false);
        expect(await formElements.acceptedRules('false')).toBeVisible();
    })

    test('Back button leads to form', async () => {
        const formElements = new FormElements(screen);
        expect(await formElements.currentButton('Зарегистрироваться')).toBeVisible();
        await formElements.clickButton(('Зарегистрироваться'));
        expect(await formElements.currentButton('Назад')).toBeVisible();
        await formElements.clickButton(('Назад'));
        expect(await formElements.currentButton('Зарегистрироваться')).toBeVisible();
    })
})
