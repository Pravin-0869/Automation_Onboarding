import { test as base } from '@playwright/test';

import { AgentMasterPage } from '../pages/agent-master.page';
import { LoginPage } from '../pages/login.page';
import { OnboardingPage } from '../pages/onboarding.page';

export type AppFixtures = {
  loginPage: LoginPage;
  agentMasterPage: AgentMasterPage;
  onboardingPage: OnboardingPage;
};

export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  agentMasterPage: async ({ page }, use) => {
    await use(new AgentMasterPage(page));
  },
  onboardingPage: async ({ page }, use) => {
    await use(new OnboardingPage(page));
  }
});

export { expect } from '@playwright/test';
