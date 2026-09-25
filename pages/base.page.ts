import { expect, Locator, Page } from '@playwright/test';
import { Logger } from '../utils/logger.util';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForVisible(locator: Locator, timeout = 15000): Promise<Locator> {
    await locator.waitFor({ state: 'visible', timeout });
    return locator;
  }

  async expectEnabled(locator: Locator, timeout = 15000): Promise<void> {
    await expect(locator).toBeEnabled({ timeout });
  }

  async fillField(locator: Locator, value: string, options: { timeout?: number; pressTab?: boolean } = {}): Promise<void> {
    const { timeout = 15000, pressTab = false } = options;

    await this.waitForVisible(locator, timeout);
    await locator.fill(value);

    if (pressTab) {
      await locator.press('Tab');
    }

    await expect(locator).toHaveValue(value, { timeout });
  }

  async clickIfVisible(locator: Locator, timeout = 15000): Promise<void> {
    await this.waitForVisible(locator, timeout);
    await locator.click();
  }

  async clickSubmitButton(options: { index?: number; timeout?: number } = {}): Promise<void> {
    const { index = 0, timeout = 15000 } = options;
    const button = this.page.getByRole('button', { name: 'Submit', exact: true }).nth(index);

    Logger.info(`Clicking submit button at index ${index}`);
    await this.waitForVisible(button, timeout);
    await this.expectEnabled(button, timeout);
    await button.click();
  }

  async selectDropdownOption(trigger: Locator, optionLabel: string, timeout = 10000): Promise<void> {
    await this.waitForVisible(trigger, timeout);
    await trigger.click();

    const option = this.page.getByText(optionLabel, { exact: true });
    await this.waitForVisible(option, timeout);
    await option.click();
  }
}
