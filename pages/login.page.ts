import { Page } from '@playwright/test';

import { appConfig } from '../config/app.config';
import { selectors } from '../utils/selectors.util';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get mobileInput() {
    return this.page.locator(selectors.login.mobileInput);
  }

  get loginButton() {
    return this.page.locator(selectors.login.submitButton);
  }

  get otpInput() {
    return this.page.locator(selectors.otp.otpInput(0));
  }

  async goto(): Promise<void> {
    await this.page.goto(appConfig.baseUrl, { waitUntil: 'domcontentloaded' });
  }

  async loginWithDefaultUser(): Promise<void> {
    await this.goto();
    await this.waitForVisible(this.mobileInput, appConfig.defaultTimeout);
    await this.mobileInput.fill(appConfig.defaultMobile);
    await this.expectEnabled(this.loginButton, appConfig.defaultTimeout);
    await this.loginButton.click();
  }

  async enterOTP(otp: string): Promise<void> {
    if (otp.length !== 6) {
      throw new Error('OTP must contain exactly 6 digits');
    }

    for (let index = 0; index < otp.length; index += 1) {
      const otpField = this.page.locator(selectors.otp.otpInput(index));
      await this.waitForVisible(otpField, appConfig.defaultTimeout);
      await otpField.click();
      await otpField.fill('');
      await otpField.pressSequentially(otp[index], { delay: 100 });
    }
  }

  async submitOTP(): Promise<void> {
    await this.enterOTP(appConfig.otp);
    const signInButton = this.page.locator(selectors.login.submitButton);
    await this.expectEnabled(signInButton, appConfig.defaultTimeout);
    await signInButton.click();
  }
}
