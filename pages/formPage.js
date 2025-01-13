import { fireEvent } from '@testing-library/react';
import { expect } from 'vitest';

export default class FormElements {
  constructor(screen) {
    this.screen = screen;
    this.emailField = this.screen.getByLabelText('Email');
    this.passwordField = this.screen.getByLabelText('Пароль');
    this.adressField = this.screen.getByLabelText('Адрес');
    this.cityField = this.screen.getByLabelText('Город');
    this.countryDropdown = this.screen.getByLabelText('Страна');
    this.countrySelectedValue = this.screen.getByDisplayValue('Выберите');
    this.acceptCheckbox = this.screen.getByRole('checkbox', { name: 'Принять правила' });
  }

  async currentButton(name) {
    return this.screen.getByRole('button', { name });
  }

  async acceptedRules(state) {
    return this.screen.getByText(state);
  }

  async findAllElements(role) {
    return this.screen.findAllByRole(role);
  }

  async currentTable() {
    return this.screen.getByRole('table');
  }

  async typeValue(input, text) {
    fireEvent.change(input, { target: { value: text } });
  }

  async clickButton(button) {
    fireEvent.click(await this.currentButton(button));
  }

  async clickCheckbox() {
    fireEvent.click(await this.acceptCheckbox);
  }

  async expectTableTitlesVisibility(expectedArray, condition = true) {
    expectedArray.forEach(async (elem) => {
      condition === true 
        ? expect(await this.currentTable()).toHaveTextContent(elem)
        : expect(await this.currentTable()).not.toHaveTextContent(elem);
    });
  }

  async expectUserDataVisability(obj, condition) {
    const expectedArray = Object.values(obj);
    this.expectTableTitlesVisibility(expectedArray, condition);
  }
}
