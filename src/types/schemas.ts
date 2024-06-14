import { z } from 'zod';
import { validateIBAN } from '../lib/validation';
import { createMsgId, generateEndToEndReference } from '../lib/util';

// general schemas
export const IBANSchema = z.string().min(15).max(34).refine(validateIBAN, {
	message: 'Invalid IBAN',
});

// PAIN.001.001.03 schemas (credit transfer)
export const CreditTransferPaymentSchema = z.object({
	recipientName: z.string(),
	recipientIBAN: IBANSchema,
	recipientBIC: z.string().optional(),
	amount: z.number().positive(),
	reference: z.string().optional(),
	end2endReference: z.string().default(() => generateEndToEndReference()),
});

export const CreditTransferSchema = z.object({
	documentId: z.string().default(createMsgId(new Date())),
	documentCreationDate: z.date().default(() => new Date()),
	requestedExecutionDate: z.date().default(() => new Date()),
	initiatorName: z.string(),
	initiatorIBAN: IBANSchema,
	initiatorBIC: z.string(),
	batchBooking: z.boolean().default(false),
	payments: z.array(CreditTransferPaymentSchema),
});
