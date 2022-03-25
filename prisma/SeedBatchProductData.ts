import { Prisma } from '@prisma/client';

export const batchProductData: Prisma.BatchProductCreateInput[] = [
  { product: 'C-1210', cost: 3.85, productType: 'Corrosion Inhibitor', solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'PR-777', cost: 1.73, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'C-3104', cost: 3.49, solubility: 'Water', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'R-777', cost: 1.66, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'P-7252', cost: undefined, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'SC-6232', cost: undefined, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'P-7272', cost: 1, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'PS-7217', cost: 4.05, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'P-7215', cost: 3.48, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'P-7263', cost: 2.99, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'P-7225', cost: 1.8, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'PSI-3', cost: 2.92, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'BC-1303', cost: 4.5, solubility: 'Water', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'CCB-350', cost: 3.09, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'B-2140', cost: 4.4, solubility: 'Water', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'SC-6132', cost: 3.59, solubility: 'Water', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'PSC-7292', cost: 3.58, solubility: 'Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { product: 'C-210', cost: 3.55, solubility: 'Water', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } }
];