import { createCreditTransferXML } from './credit-transfer';
import { CreditTransfer, CreditTransferInput } from '../types/types';

describe('createCreditTransferXML', () => {
	it('should create a valid XML document', () => {
		const creditTransfer: CreditTransferInput = {
			documentCreationDate: new Date('2021-01-01'),
			initiatorName: 'John Doe',
			initiatorIBAN: 'DE12100110012281061880',
			initiatorBIC: 'DEUTDEFF',
			requestedExecutionDate: new Date('2021-01-02'),
			batchBooking: false,
			payments: [
				{
					reference: 'Test',
					recipientIBAN: 'DE12100110012281061880',
					amount: 3434,
					recipientName: 'Jane Doe',
					end2endReference: '123456789',
				},
			],
		};

		const xml = createCreditTransferXML(creditTransfer);
		console.log(xml);
		expect(xml).toMatchSnapshot();
	});
});
