import fs from 'fs';
import path from 'path';

import { AGENT_NAMES } from '../constants/agent.constants';
import type { AgentSeed } from '../data/agent.data';

const AGENT_NAME_STATE_FILE = path.resolve(process.cwd(), '.agent_name_state.json');

function readAgentNameIndex(): number {
  try {
    if (fs.existsSync(AGENT_NAME_STATE_FILE)) {
      const saved = JSON.parse(fs.readFileSync(AGENT_NAME_STATE_FILE, 'utf8')) as { index?: number };
      const parsed = Number(saved?.index ?? 0);

      if (Number.isFinite(parsed) && parsed >= 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Agent name state reset to 0:', (error as Error).message);
  }

  return 0;
}

function saveAgentNameIndex(index: number): void {
  try {
    fs.writeFileSync(AGENT_NAME_STATE_FILE, JSON.stringify({ index }, null, 2));
  } catch (error) {
    console.warn('Could not save agent name state:', (error as Error).message);
  }
}

let agentNameIndex = readAgentNameIndex();

export function generateAgentData(): AgentSeed {
  const timestamp = Date.now();
  const baseName = AGENT_NAMES[agentNameIndex % AGENT_NAMES.length];
  const uniqueEmailSuffix = String(timestamp).slice(-6);

  agentNameIndex += 1;
  saveAgentNameIndex(agentNameIndex);

  return {
    name: baseName,
    mobile: `9${String(timestamp).slice(-9)}`,
    email: `${baseName.toLowerCase().replace(/\s+/g, '')}${uniqueEmailSuffix}@gmail.com`
  };
}

export function generateCKYCNumber(): string {
  const timestampPart = String(Date.now()).slice(-12);
  const randomPart = String(Math.floor(Math.random() * 100)).padStart(2, '0');
  return timestampPart + randomPart;
}

export function generateAadhaarNumber(): string {
  return `2${String(Date.now()).slice(-11)}`;
}

export function generateAddress(): string {
  const uniquePart = String(Date.now()).slice(-8);
  return `Flat ${uniquePart}, Test Residency`;
}

export function generateStreetAddress(): string {
  const uniquePart = String(Date.now()).slice(-8);
  return `Automation Street ${uniquePart}, Test Nagar`;
}

export function generateCertificateNumber(): string {
  return `CERT${String(Date.now()).slice(-10)}`;
}

export function generatePanNumber(): string {
  const uniqueDigits = String(Date.now()).slice(-4);
  return `AUTPF${uniqueDigits}F`;
}

export function generateBankAccountNumber(): string {
  return `10${String(Date.now()).slice(-12)}`;
}
