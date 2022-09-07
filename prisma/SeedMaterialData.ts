import { Prisma } from '@prisma/client';

export const materialData: Prisma.MaterialCreateInput[] = [
{ material: 'Steel', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
{ material: 'Fiberglass', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
{ material: 'Aluminum', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
{ material: 'Polyethylene', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
{ material: 'Composite', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
{ material: 'Asbestos Cement', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
{ material: 'Polyvinyl Chloride', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } }
];