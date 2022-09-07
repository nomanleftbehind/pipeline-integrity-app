import { Prisma } from '@prisma/client';

export const substanceData: Prisma.SubstanceCreateInput[] = [
{ substance: 'Natural Gas', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
{ substance: 'Oil Well Effluent', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
{ substance: 'Salt Water', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
{ substance: 'Fresh Water', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
{ substance: 'Crude Oil', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
{ substance: 'Fuel Gas', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } }
];