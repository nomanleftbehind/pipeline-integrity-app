import { Prisma } from '@prisma/client';

export const chemicalSupplierData: Prisma.ChemicalSupplierCreateInput[] = [
  { name: 'Contact', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { name: 'Sterling', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } },
  { name: 'CPS', updatedBy: { connect: { email: 'dsucic@bonterraenergy.com' } }, createdBy: { connect: { email: 'dsucic@bonterraenergy.com' } } }
];