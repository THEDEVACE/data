import { faker } from '@faker-js/faker';

export interface Transaction {
  id: string;
  date: string;
  time: string;
  pump: number;
  nozzle: number;
  fuelType: 'SSP' | 'GASOIL';
  volume: string;
  volumeTC: string;
  price: string;
  amount: string;
  indexStart: string;
  indexEnd: string;
  tempAvg: string;
  ticketType: string;
  paymentType: string;
}

export const generateFakeTransactions = (count: number): Transaction[] => {
  const transactions: Transaction[] = [];
  const fuelTypes = ['SSP', 'GASOIL'] as const;
  const paymentTypes = ['Ticket', 'Attendant Tagging', 'En espèces', 'Carte bancaire'];

  for (let i = 0; i < count; i++) {
    const volume = faker.number.float({ min: 1, max: 60, fractionDigits: 2 });
    const price = faker.helpers.arrayElement([12.64, 13.48]);
    const amount = (volume * price).toFixed(2);
    const indexStart = faker.number.int({ min: 500000, max: 5000000 });

    transactions.push({
      id: (1600000 + i).toString(),
      date: '18/03/2026',
      time: faker.date.recent().toLocaleTimeString('fr-FR', { hour12: false }),
      pump: faker.number.int({ min: 1, max: 8 }),
      nozzle: faker.number.int({ min: 1, max: 3 }),
      fuelType: faker.helpers.arrayElement(fuelTypes),
      volume: volume.toFixed(2).replace('.', ','),
      volumeTC: (volume * 0.998).toFixed(2).replace('.', ','),
      price: `DHS ${price.toFixed(2).replace('.', ',')}`,
      amount: `DHS ${amount.replace('.', ',')}`,
      indexStart: indexStart.toLocaleString('fr-FR').replace(/\s/g, ' ') + ',00',
      indexEnd: (indexStart + volume).toLocaleString('fr-FR').replace(/\s/g, ' ') + `,${faker.number.int({ min: 10, max: 99 })}`,
      tempAvg: faker.number.float({ min: 15, max: 20, fractionDigits: 2 }).toFixed(2).replace('.', ','),
      ticketType: 'Ventes',
      paymentType: faker.helpers.arrayElement(paymentTypes),
    });
  }

  return transactions.sort((a, b) => b.time.localeCompare(a.time));
};
