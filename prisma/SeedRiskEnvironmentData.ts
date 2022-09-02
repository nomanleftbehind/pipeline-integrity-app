import { Prisma } from '@prisma/client';

export const riskEnvironmentData: Prisma.RiskEnvironmentCreateInput[] = [
  { environment: 'WB4', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { environment: 'WB5', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { environment: 'WB3', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { environment: 'WC2', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { environment: 'WC1', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { environment: 'WC3', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { environment: 'WC4', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { environment: 'WB1', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } }
];