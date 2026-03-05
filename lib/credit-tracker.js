/**
 * Credit tracking for external services
 */

export class CreditTracker {
  constructor() {
    this.credits = {
      runway: { balance: 0, lastChecked: null },
      replicate: { balance: 0, lastChecked: null }
    };
  }

  async checkRunway(apiKey) {
    try {
      const response = await fetch('https://api.dev.runwayml.com/v1/user', {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      const data = await response.json();
      this.credits.runway = {
        balance: data.credits || 0,
        lastChecked: new Date().toISOString()
      };
      return this.credits.runway.balance;
    } catch (error) {
      console.error('Failed to check Runway credits:', error.message);
      return null;
    }
  }

  async checkReplicate(apiKey) {
    try {
      const response = await fetch('https://api.replicate.com/v1/account', {
        headers: { 'Authorization': `Token ${apiKey}` }
      });
      const data = await response.json();
      this.credits.replicate = {
        balance: data.balance || 0,
        lastChecked: new Date().toISOString()
      };
      return this.credits.replicate.balance;
    } catch (error) {
      console.error('Failed to check Replicate credits:', error.message);
      return null;
    }
  }

  getStatus() {
    return this.credits;
  }

  hasEnoughCredits(service, required = 1) {
    return this.credits[service]?.balance >= required;
  }
}
