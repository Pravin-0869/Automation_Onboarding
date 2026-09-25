import { AGENT_TYPES } from '../constants/agent.constants';
import { AgentMasterPage } from '../pages/agent-master.page';
import { LoginPage } from '../pages/login.page';
import { OnboardingPage } from '../pages/onboarding.page';
import { test } from '../fixtures/base.fixture';

class AgentOnboardingTest {
  constructor(
    private readonly loginPage: LoginPage,
    private readonly agentMasterPage: AgentMasterPage,
    private readonly onboardingPage: OnboardingPage
  ) {}

  async runNewAgent(): Promise<void> {
    await this.loginPage.loginWithDefaultUser();
    await this.loginPage.submitOTP();
    await this.agentMasterPage.open();
    await this.agentMasterPage.createAgent();
    await this.agentMasterPage.verifyAgentOTP();
    await this.agentMasterPage.openCreatedAgent();
    await this.agentMasterPage.selectAgentType(AGENT_TYPES.NEW_AGENT);
    await this.onboardingPage.runNewAgentJourney();
  }

  async runComposite(): Promise<void> {
    await this.loginPage.loginWithDefaultUser();
    await this.loginPage.submitOTP();
    await this.agentMasterPage.open();
    await this.agentMasterPage.createAgent();
    await this.agentMasterPage.verifyAgentOTP();
    await this.agentMasterPage.openCreatedAgent();
    await this.agentMasterPage.selectAgentType(AGENT_TYPES.COMPOSITE);
    await this.onboardingPage.runCompositeJourney();
  }

  async runTransfer(): Promise<void> {
    await this.loginPage.loginWithDefaultUser();
    await this.loginPage.submitOTP();
    await this.agentMasterPage.open();
    await this.agentMasterPage.createAgent();
    await this.agentMasterPage.verifyAgentOTP();
    await this.agentMasterPage.openCreatedAgent();
    await this.agentMasterPage.selectAgentType(AGENT_TYPES.TRANSFER);
    await this.onboardingPage.runTransferJourney();
  }
}

test.describe('Fynity onboarding framework', () => {
  test('Agent Onboarding', async ({ loginPage, agentMasterPage, onboardingPage }, testInfo) => {
    const onboarding = new AgentOnboardingTest(loginPage, agentMasterPage, onboardingPage);

    if (testInfo.project.name === 'Chrome-NewAgent') {
      await onboarding.runNewAgent();
    }

    if (testInfo.project.name === 'Firefox-Composite') {
      await onboarding.runComposite();
    }

    if (testInfo.project.name === 'Edge-Transfer') {
      await onboarding.runTransfer();
    }
  });
});
