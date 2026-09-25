import { expect, Page } from '@playwright/test';

import { UI_LABELS } from '../constants/agent.constants';
import {
  generateAadhaarNumber,
  generateAddress,
  generateBankAccountNumber,
  generateCertificateNumber,
  generateCKYCNumber,
  generatePanNumber,
  generateStreetAddress
} from '../utils/agent-data.util';
import { Logger } from '../utils/logger.util';
import { resolveLabelTrigger, selectors } from '../utils/selectors.util';
import { BasePage } from './base.page';

export class OnboardingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private async selectVisibleOption(optionText: string, fallbackTexts: string[] = []): Promise<void> {
    const patterns = [optionText, ...fallbackTexts].map((text) => new RegExp(`^${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\./g, '\\.?')}$`, 'i'));

    for (const pattern of patterns) {
      const locator = this.page.getByText(pattern).first();
      const count = await locator.count();

      if (count > 0) {
        await locator.click();
        return;
      }
    }

    throw new Error(`Dropdown option not found: ${optionText}`);
  }

  async ckycDetails(): Promise<void> {
    Logger.info('Completing CKYC step');

    const ckycYesButton = this.page.getByText('Yes', { exact: true }).last();
    await this.waitForVisible(ckycYesButton, 15000);
    await this.expectEnabled(ckycYesButton, 10000);
    await ckycYesButton.click();

    const ckycInput = this.page.locator(selectors.profile.ckycNumberInput);
    await this.waitForVisible(ckycInput, 15000);

    const ckycNumber = generateCKYCNumber();
    await ckycInput.fill(ckycNumber);

    const submitButton = this.page.getByRole('button', { name: UI_LABELS.submit, exact: true }).last();
    await this.waitForVisible(submitButton, 15000);
    await this.expectEnabled(submitButton, 15000);
    await submitButton.click();

    await this.page.waitForTimeout(1500);
  }

  async profileDetails(): Promise<void> {
    Logger.info('Filling profile details');
    await this.ckycDetails();

    const salutation = await resolveLabelTrigger(this.page, 'Salutation');
    await salutation.scrollIntoViewIfNeeded();
    await expect(salutation).toBeVisible({ timeout: 15000 });
    await salutation.click();

    await this.selectVisibleOption('Mr.', ['Mr']);

    const fatherName = this.page.locator(selectors.profile.fatherNameInput);
    await fatherName.scrollIntoViewIfNeeded();
    await expect(fatherName).toBeVisible({ timeout: 15000 });
    await fatherName.fill('Ramesh Kumar');

    const dateOfBirth = this.page.getByPlaceholder('dd/mm/yyyy');
    await dateOfBirth.scrollIntoViewIfNeeded();
    await expect(dateOfBirth).toBeVisible({ timeout: 15000 });
    await dateOfBirth.fill('16/02/2000');
    await dateOfBirth.press('Tab');

    const maritalStatus = this.page.getByRole('combobox').nth(2);
    await maritalStatus.scrollIntoViewIfNeeded();
    await expect(maritalStatus).toBeVisible({ timeout: 15000 });
    await maritalStatus.click();
    await this.selectVisibleOption('Single');

    const aadhaarNumber = generateAadhaarNumber();
    const aadhaarInput = this.page.locator(selectors.profile.aadhaarInput);
    await aadhaarInput.scrollIntoViewIfNeeded();
    await expect(aadhaarInput).toBeVisible({ timeout: 15000 });
    await aadhaarInput.fill(aadhaarNumber);

    const panNumber = generatePanNumber();
    const panInput = this.page.locator(selectors.profile.panInput);
    await panInput.scrollIntoViewIfNeeded();
    await expect(panInput).toBeVisible({ timeout: 15000 });
    await panInput.fill(panNumber);

    const occupation = this.page.getByRole('combobox').nth(4);
    await occupation.scrollIntoViewIfNeeded();
    await expect(occupation).toBeVisible({ timeout: 15000 });
    await occupation.click();
    await this.selectVisibleOption('Accountant');

    const address = generateAddress();
    const addressLine1 = this.page.locator(selectors.profile.addressInput);
    await addressLine1.scrollIntoViewIfNeeded();
    await expect(addressLine1).toBeVisible({ timeout: 15000 });
    await addressLine1.fill(address);
    await addressLine1.press('Tab');
    await expect(addressLine1).toHaveValue(address);

    const streetAddress = generateStreetAddress();
    const addressLine2 = this.page.locator(selectors.profile.streetInput);
    await addressLine2.scrollIntoViewIfNeeded();
    await expect(addressLine2).toBeVisible({ timeout: 15000 });
    await addressLine2.fill(streetAddress);
    await addressLine2.press('Tab');
    await expect(addressLine2).toHaveValue(streetAddress);

    const pincode = this.page.locator(selectors.profile.pincodeInput);
    await pincode.scrollIntoViewIfNeeded();
    await expect(pincode).toBeVisible({ timeout: 15000 });
    await pincode.fill('560001');
    await pincode.press('Tab');
    await expect(pincode).toHaveValue('560001');

    const communicationAddressQuestion = this.page.getByText('Is Communication Address Same?', { exact: true });
    const communicationAddressYes = communicationAddressQuestion.locator('xpath=following-sibling::*[1]').getByText('Yes', { exact: true });
    await communicationAddressYes.scrollIntoViewIfNeeded();
    await expect(communicationAddressYes).toBeVisible({ timeout: 15000 });
    await communicationAddressYes.click();

    const boardName = this.page.getByRole('combobox').nth(6);
    await boardName.scrollIntoViewIfNeeded();
    await expect(boardName).toBeVisible({ timeout: 15000 });
    await boardName.click();
    await this.selectVisibleOption('International General Certificate of Secondary Education');

    const certificateNumber = generateCertificateNumber();
    const rollNumber = this.page.locator(selectors.profile.rollNumberInput);
    await rollNumber.scrollIntoViewIfNeeded();
    await expect(rollNumber).toBeVisible({ timeout: 15000 });
    await rollNumber.fill(certificateNumber);

    const yearOfPassing = this.page.getByRole('combobox').nth(7);
    await yearOfPassing.scrollIntoViewIfNeeded();
    await expect(yearOfPassing).toBeVisible({ timeout: 15000 });
    await yearOfPassing.click();
    await this.selectVisibleOption('2024');

    const profileSubmitButton = this.page.getByRole('button', { name: UI_LABELS.submit, exact: true });
    await profileSubmitButton.scrollIntoViewIfNeeded();
    await expect(profileSubmitButton).toBeEnabled({ timeout: 15000 });
    await profileSubmitButton.click();

    const bankAccountNumberInput = this.page.locator(selectors.bank.bankAccountNumberInput);
    await bankAccountNumberInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  async bankDetails(): Promise<void> {
    Logger.info('Filling bank details');

    const accountNumber = generateBankAccountNumber();
    const bankAccountName = 'Rakesh Sharma';
    const ifscCode = 'HDFC0001234';

    const accountType = this.page.getByRole('combobox').first();
    await accountType.waitFor({ state: 'visible', timeout: 15000 });
    await accountType.click();

    const savingsOption = this.page.getByText('Savings', { exact: true }).last();
    await savingsOption.waitFor({ state: 'visible', timeout: 15000 });
    await savingsOption.click();

    const bankAccountNumber = this.page.locator(selectors.bank.bankAccountNumberInput);
    const reEnterBankAccountNumber = this.page.locator(selectors.bank.reEnterBankAccountNumberInput);
    const bankNameInput = this.page.getByPlaceholder('Enter Bank Name', { exact: true });
    const bankCityInput = this.page.getByPlaceholder('Enter Bank City', { exact: true });
    const branchNameInput = this.page.getByPlaceholder('Enter Branch Name', { exact: true });
    const ifscInput = this.page.getByPlaceholder('Enter IFSC Code', { exact: true });
    const accountNameInput = this.page.getByPlaceholder('Enter Name as in Bank Account', { exact: true });
    const bankSubmitButton = this.page.getByRole('button', { name: UI_LABELS.submit, exact: true }).last();

    await accountNameInput.waitFor({ state: 'visible', timeout: 15000 });
    await accountNameInput.fill(bankAccountName);
    await expect(accountNameInput).toHaveValue(bankAccountName);

    await bankAccountNumber.scrollIntoViewIfNeeded();
    await expect(bankAccountNumber).toBeVisible({ timeout: 15000 });
    await bankAccountNumber.fill(accountNumber);
    await expect(bankAccountNumber).toHaveValue(accountNumber);

    await reEnterBankAccountNumber.scrollIntoViewIfNeeded();
    await expect(reEnterBankAccountNumber).toBeVisible({ timeout: 15000 });
    await reEnterBankAccountNumber.fill(accountNumber);
    await expect(reEnterBankAccountNumber).toHaveValue(accountNumber);

    await ifscInput.waitFor({ state: 'visible', timeout: 15000 });
    await ifscInput.fill(ifscCode);
    await expect(ifscInput).toHaveValue(ifscCode);

    await bankNameInput.waitFor({ state: 'visible', timeout: 15000 });
    await expect(bankNameInput).not.toHaveValue('', { timeout: 15000 });

    await bankCityInput.waitFor({ state: 'visible', timeout: 15000 });
    await expect(bankCityInput).not.toHaveValue('', { timeout: 15000 });

    await branchNameInput.waitFor({ state: 'visible', timeout: 15000 });
    await expect(branchNameInput).not.toHaveValue('', { timeout: 15000 });

    await bankSubmitButton.waitFor({ state: 'visible', timeout: 15000 });
    await expect(bankSubmitButton).toBeEnabled({ timeout: 15000 });
    await bankSubmitButton.click();
  }

  async nomineeDetails(): Promise<void> {
    Logger.info('Filling nominee details');

    const nomineeName = `Nominee ${Date.now()}`;
    const nomineeContactNumber = `9${String(Date.now()).slice(-9)}`;
    const nomineeAge = '30';
    const nomineeShare = '100';
    const nomineePinCode = '560001';
    const nomineeCity = 'BENGALURU URBAN';
    const nomineeState = 'KARNATAKA';
    const nomineeAddressLine1 = `Flat ${String(Date.now()).slice(-8)}, Test Residency`;

    const salutation = await resolveLabelTrigger(this.page, 'Salutation');
    const gender = await resolveLabelTrigger(this.page, 'Gender');
    const relation = await resolveLabelTrigger(this.page, 'Relation');
    const nomineeNameInput = this.page.locator('input[name="nominee[0].nominee_name"], input[placeholder="Enter Nominee Name"], input[placeholder*="Nominee Name"]');
    const contactNumberInput = this.page.locator('input[name="nominee[0].contact_number"], input[placeholder="Enter Contact Number"], input[placeholder*="Contact Number"]');
    const ageInput = this.page.locator('input[name="nominee[0].age"], input[placeholder="Enter Age"], input[placeholder*="Age"]');
    const nomineeShareInput = this.page.locator('input[name="nominee[0].nominee_share"], input[placeholder="Enter Nominee Share"], input[placeholder*="Share"]');
    const pinCodeInput = this.page.locator('input[name="nominee[0].pin_code"], input[placeholder="Enter Pin Code"], input[placeholder*="Pin Code"]');
    const cityInput = this.page.locator('input[name="nominee[0].city"], input[placeholder="Enter City"], input[placeholder*="City"]');
    const stateInput = this.page.locator('input[name="nominee[0].state"], input[placeholder="Enter State"], input[placeholder*="State"]');
    const addressLine1Input = this.page.locator('input[name="nominee[0].address_line_1"], input[placeholder="Enter Address Line 1"], input[placeholder*="Address Line 1"]');
    const addressSameApplicant = this.page.getByText('Address Same Applicant', { exact: true });
    const nomineeSubmitButton = this.page.getByRole('button', { name: UI_LABELS.submit, exact: true }).last();

    await salutation.waitFor({ state: 'visible', timeout: 15000 });
    await salutation.click();
    await this.selectVisibleOption('Mr.', ['Mr']);

    await gender.waitFor({ state: 'visible', timeout: 15000 });
    await gender.click();
    await this.selectVisibleOption('Male');

    await relation.waitFor({ state: 'visible', timeout: 15000 });
    await relation.click();
    await this.selectVisibleOption('Brother');

    await nomineeNameInput.waitFor({ state: 'visible', timeout: 15000 });
    await nomineeNameInput.fill(nomineeName);
    await expect(nomineeNameInput).toHaveValue(nomineeName);

    await contactNumberInput.waitFor({ state: 'visible', timeout: 15000 });
    await contactNumberInput.fill(nomineeContactNumber);
    await expect(contactNumberInput).toHaveValue(nomineeContactNumber);

    await ageInput.waitFor({ state: 'visible', timeout: 15000 });
    await ageInput.fill(nomineeAge);
    await expect(ageInput).toHaveValue(nomineeAge);

    await nomineeShareInput.waitFor({ state: 'visible', timeout: 15000 });
    await nomineeShareInput.fill(nomineeShare);
    await expect(nomineeShareInput).toHaveValue(nomineeShare);

    const addressYesButton = addressSameApplicant.locator('xpath=following-sibling::*[1]').getByText('Yes', { exact: true });
    await addressYesButton.waitFor({ state: 'visible', timeout: 15000 });
    await addressYesButton.click();

    await pinCodeInput.waitFor({ state: 'visible', timeout: 15000 });
    await pinCodeInput.fill(nomineePinCode);
    await expect(pinCodeInput).toHaveValue(nomineePinCode);

    await cityInput.waitFor({ state: 'visible', timeout: 15000 });
    await expect(cityInput).toHaveValue(nomineeCity, { timeout: 15000 });

    await stateInput.waitFor({ state: 'visible', timeout: 15000 });
    await expect(stateInput).toHaveValue(nomineeState, { timeout: 15000 });

    await addressLine1Input.waitFor({ state: 'visible', timeout: 15000 });
    await addressLine1Input.fill(nomineeAddressLine1);
    await expect(addressLine1Input).toHaveValue(nomineeAddressLine1);

    await nomineeSubmitButton.waitFor({ state: 'visible', timeout: 15000 });
    await expect(nomineeSubmitButton).toBeEnabled({ timeout: 15000 });
    await nomineeSubmitButton.click();
  }

  async documents(): Promise<void> {}
  async consent(): Promise<void> {}
  async payment(): Promise<void> {}
  async examDetails(): Promise<void> {}
  async training(): Promise<void> {}
  async pospExam(): Promise<void> {}
  async thankYou(): Promise<void> {}
  async certified(): Promise<void> {}

  async runNewAgentJourney(): Promise<void> {
    await this.profileDetails();
    await this.bankDetails();
    await this.nomineeDetails();
    await this.documents();
    await this.consent();
    await this.payment();
    await this.examDetails();
    await this.training();
    await this.certified();
  }

  async runCompositeJourney(): Promise<void> {
    await this.profileDetails();
    await this.bankDetails();
    await this.nomineeDetails();
    await this.documents();
    await this.consent();
    await this.thankYou();
    await this.certified();
  }

  async runTransferJourney(): Promise<void> {
    await this.profileDetails();
    await this.bankDetails();
    await this.nomineeDetails();
    await this.documents();
    await this.consent();
    await this.payment();
    await this.examDetails();
    await this.training();
    await this.certified();
  }
}
