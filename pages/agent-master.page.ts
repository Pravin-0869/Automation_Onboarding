import { expect, Page } from '@playwright/test';

import { AGENT_TYPES } from '../constants/agent.constants';
import type { AgentSeed } from '../data/agent.data';
import { generateAgentData } from '../utils/agent-data.util';
import { Logger } from '../utils/logger.util';
import { selectors } from '../utils/selectors.util';
import { BasePage } from './base.page';

export class AgentMasterPage extends BasePage {
  agent: AgentSeed | null = null;

  constructor(page: Page) {
    super(page);
  }

  get onboardAgentButton() {
    return this.page.getByText('Onboard Agent', { exact: true });
  }

  get searchTable() {
    return this.page.getByRole('textbox', { name: 'Search Table' });
  }

  async open() {
    Logger.info('Opening agent master screen');
    await this.waitForVisible(this.onboardAgentButton, 15000);
    await this.onboardAgentButton.click();
  }

  async createAgent() {
    this.agent = generateAgentData();

    const fullNameInput = this.page.locator(selectors.profile.fullNameInput);
    const mobileInput = this.page.locator(selectors.profile.mobileInput);
    const emailInput = this.page.locator(selectors.profile.emailInput);
    const submitButton = this.page.getByRole('button', { name: 'Submit', exact: true });

    await this.waitForVisible(fullNameInput, 15000);
    await fullNameInput.fill(this.agent.name);

    await this.waitForVisible(mobileInput, 15000);
    await mobileInput.fill(this.agent.mobile);

    await this.waitForVisible(emailInput, 15000);
    await emailInput.fill(this.agent.email);

    await this.waitForVisible(submitButton, 10000);
    await this.expectEnabled(submitButton, 10000);
    await submitButton.click();

    const otpField = this.page.locator("[name='otp_code[0]']");
    await this.waitForVisible(otpField, 15000);
  }

  async verifyAgentOTP(otp = '123456') {
    for (let index = 0; index < otp.length; index += 1) {
      const otpField = this.page.locator(`[name='otp_code[${index}]']`);
      await this.waitForVisible(otpField, 15000);
      await otpField.click();
      await otpField.fill('');
      await otpField.pressSequentially(otp[index], { delay: 100 });
    }

    const verifyButton = this.page.getByRole('button', { name: 'Verify OTP', exact: true });
    await this.waitForVisible(verifyButton, 15000);
    await this.expectEnabled(verifyButton, 15000);
    await verifyButton.click();

    await this.page.waitForTimeout(1500);
  }

  async openCreatedAgent() {
    if (!this.agent) {
      throw new Error('No agent created yet. Create an agent before opening it.');
    }

    await this.waitForVisible(this.searchTable, 15000);
    await this.searchTable.fill(this.agent.email);

    const agentRow = this.page.locator('tr').filter({ hasText: this.agent.email }).first();
    await expect(agentRow).toBeVisible({ timeout: 30000 });

    const actionCell = agentRow.locator('td').last();
    await this.waitForVisible(actionCell, 10000);

    const eyeIcon = actionCell.locator("[class*='cursor-pointer'], svg").last();
    await this.waitForVisible(eyeIcon, 10000);
    await eyeIcon.click();

    await this.page.waitForTimeout(1500);
  }

  async selectAgentType(type: keyof typeof AGENT_TYPES | string) {
    const agentTypeInput = this.page.locator(selectors.agentMaster.agentTypeInput);
    await this.waitForVisible(agentTypeInput, 15000);
    await agentTypeInput.click();

    const dropdown = this.page.getByLabel('Select Agent Type');
    const option = dropdown.getByText(type, { exact: true });
    await this.waitForVisible(option, 10000);
    await option.click();

    await this.page.waitForTimeout(1000);

    const submitButton = this.page.locator('button[type="submit"]').last();
    await this.waitForVisible(submitButton, 15000);
    await this.expectEnabled(submitButton, 15000);
    await submitButton.click();

    await this.page.waitForTimeout(2000);
  }
}
