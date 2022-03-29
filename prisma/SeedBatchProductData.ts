import { Prisma } from '@prisma/client';

export const batchProductData: Prisma.BatchProductCreateInput[] = [
  { product: 'PR777', cost: 1.73, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'C3104', cost: 3.49, solubility: 'Water', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'R777', cost: 1.66, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'P7252', cost: undefined, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'SC6232', cost: undefined, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'P7272', cost: 1, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'PS7217', cost: 4.05, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'P7215', cost: 3.48, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'P7263', cost: 2.99, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'P7225', cost: 1.8, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'PSI3', cost: 2.92, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'BC1303', cost: 4.5, solubility: 'Water', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'CCB350', cost: 3.09, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'B2140', cost: 4.4, solubility: 'Water', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'SC6132', cost: 3.59, solubility: 'Water', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'PSC7292', cost: 3.58, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'C210', cost: 3.55, solubility: 'Water', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'C1210', cost: 4.98, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } }
];