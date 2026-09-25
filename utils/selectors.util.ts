import { Locator, Page } from '@playwright/test';

export const selectors = {
  login: {
    mobileInput: "[name='mobile']",
    submitButton: "button[type='submit']"
  },
  otp: {
    otpInput: (index: number) => `[name='otp_code[${index}]']`
  },
  agentMaster: {
    onboardAgentButton: 'text=Onboard Agent',
    searchTable: 'textbox[name="Search Table"]',
    agentTypeInput: "input[role='combobox'][placeholder='Enter Agent Type']",
    agentTypeDropdown: 'text=Select Agent Type'
  },
  profile: {
    fullNameInput: "[placeholder='Enter your full name']",
    mobileInput: "[placeholder='Enter your mobile number']",
    emailInput: "[placeholder='Enter your email']",
    ckycNumberInput: "[name='ckyc_number']",
    fatherNameInput: 'input[name="profile.father_name"]',
    dobInput: 'input[placeholder="dd/mm/yyyy"]',
    aadhaarInput: 'input[name="profile.aadhar_no"]',
    panInput: 'input[name="profile.pan_no"]',
    addressInput: 'input[name="profile.address"]',
    streetInput: 'input[name="profile.street"]',
    pincodeInput: 'input[name="profile.pincode"]',
    rollNumberInput: 'input[name="profile.roll_no"]'
  },
  bank: {
    bankAccountNumberInput: 'input[name="bank.bank_account_number"]',
    reEnterBankAccountNumberInput: 'input[name="bank.re_enter_bank_account_number"]',
    accountNameInput: 'input[placeholder="Enter Name as in Bank Account"]',
    ifscInput: 'input[placeholder="Enter IFSC Code"]',
    bankNameInput: 'input[placeholder="Enter Bank Name"]',
    bankCityInput: 'input[placeholder="Enter Bank City"]',
    branchNameInput: 'input[placeholder="Enter Branch Name"]'
  },
  nominee: {
    label: (labelText: string) => `label:has-text("${labelText}")`,
    labelContainer: (labelText: string) => `//*[normalize-space(.)="${labelText}"]` 
  }
};

export async function resolveLabelTrigger(page: Page, labelText: string): Promise<Locator> {
  const candidateQueries = [
    `label:has-text("${labelText}")`,
    `text=${labelText}`,
    `div:has-text("${labelText}")`,
    `xpath=//label[contains(normalize-space(.), "${labelText}")]`,
    `xpath=//*[contains(normalize-space(.), "${labelText}")]`
  ];

  for (const query of candidateQueries) {
    const locator = page.locator(query).first();
    if ((await locator.count()) > 0) {
      return locator;
    }
  }

  return page.getByText(labelText, { exact: true }).first();
}
