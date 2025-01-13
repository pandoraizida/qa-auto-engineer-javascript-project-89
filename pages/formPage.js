import { fireEvent } from '@testing-library/react';
import { expect } from 'vitest';

export default class FormElements {
  constructor(screen) {
    this.screen = screen;
  }

  async currentField(label) {
    return this.screen.getByLabelText(label);
  }

  async countrySelectedValue() {
    return this.screen.getByDisplayValue('Выберите');
  }

  async acceptCheckbox() {
    return this.screen.getByRole('checkbox', { name: 'Принять правила' });
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

  async typeValue(field, textForChange) {
    const input = this.screen.getByLabelText(field);
    fireEvent.change(input, { target: { value: textForChange } });
  }

  async clickButton(button) {
    fireEvent.click(await this.currentButton(button));
  }

  async clickCheckbox() {
    fireEvent.click(this.screen.getByRole('checkbox', { name: 'Принять правила' }));
  }

  async expectTableTitlesVisibility(expectedArray, condition = true) {
    expectedArray.forEach(async (elem) => {
      if (condition) {
        expect(await this.currentTable()).toHaveTextContent(elem);
      } else {
        expect(await this.currentTable()).not.toHaveTextContent(elem);
      }
    });
  }

  async expectUserDataVisability(obj, condition) {
    const expectedArray = Object.values(obj);
    this.expectTableTitlesVisibility(expectedArray, condition);
  }
}
