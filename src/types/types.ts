import { z } from 'zod';
import { CreditTransferPaymentSchema, CreditTransferSchema, IBANSchema } from './schemas';

// inferred types
export type CreditTransferPayment = z.infer<typeof CreditTransferPaymentSchema>;
export type CreditTransferPaymentInput = z.input<typeof CreditTransferPaymentSchema>;
export type CreditTransferInput = z.input<typeof CreditTransferSchema>;
export type CreditTransfer = z.infer<typeof CreditTransferSchema>;
export type IBAN = z.infer<typeof IBANSchema>;
