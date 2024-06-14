import { create } from 'xmlbuilder2';
import {
  CreditTransfer,
  CreditTransferInput,
  CreditTransferPayment,
} from '../types/types';
import { CreditTransferSchema } from '../types/schemas';

export const createCreditTransferXML = (
  creditTransfer: CreditTransferInput
): [string, CreditTransfer] => {
  // Try to parse the input data and throw an error if it is invalid
  const parsingResult = CreditTransferSchema.safeParse(creditTransfer);

  if (!parsingResult.success) {
    throw new Error(parsingResult.error.toString());
  }

  const parsedCreditTransfer = parsingResult.data;
  console.log(parsedCreditTransfer);

  // Map the payments to the XML structure
  const mappedPayments = parsedCreditTransfer.payments.map((payment) => {
    // BIC Handling: check if BIC is provided. If not add the _Othr_ Attribute
    const parsedBIC = payment.recipientBIC
      ? { BIC: payment.recipientBIC }
      : {
          Othr: {
            Id: 'NOTPROVIDED',
          },
        };

    return {
      PmtId: {
        EndToEndId: payment.end2endReference,
      },
      Amt: {
        InstdAmt: {
          '@Ccy': 'EUR',
          '#text': payment.amount,
        },
      },
      CdtrAgt: {
        FinInstnId: {
          parsedBIC,
        },
      },
      Cdtr: {
        Nm: payment.recipientName,
      },
      CdtrAcct: {
        Id: {
          IBAN: payment.recipientIBAN,
        },
      },
      RmtInf: {
        Ustrd: payment.reference,
      },
    };
  });

  // Calculate the control sum (Just add up all payment amounts)
  let ctrlSum = parsedCreditTransfer.payments.reduce(
    (acc, payment) => acc + payment.amount,
    0
  );

  // round to 2 decimal places
  ctrlSum = Math.round(ctrlSum * 100) / 100;

  const doc = create({
    Document: {
      '@xmlns': 'urn:iso:std:iso:20022:tech:xsd:pain.001.001.03',
      '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      '@xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
      CstmrCdtTrfInitn: {
        GrpHdr: {
          MsgId: parsedCreditTransfer.documentId,
          CreDtTm: parsedCreditTransfer.documentCreationDate
            .toISOString()
            .substring(0, 19), // Remove milliseconds and timezone
          NbOfTxs: parsedCreditTransfer.payments.length,
          CtrlSum: ctrlSum,
          InitgPty: {
            Nm: parsedCreditTransfer.initiatorName,
          },
        },
        PmtInf: {
          PmtInfId: parsedCreditTransfer.documentId,
          PmtMtd: 'TRF',
          BtchBookg: parsedCreditTransfer.batchBooking,
          NbOfTxs: parsedCreditTransfer.payments.length,
          CtrlSum: ctrlSum,
          ReqdExctnDt: parsedCreditTransfer.requestedExecutionDate
            .toISOString()
            .substring(0, 10), // Only keep the date
          Dbtr: {
            Nm: parsedCreditTransfer.initiatorName,
          },
          DbtrAcct: {
            Id: {
              IBAN: parsedCreditTransfer.initiatorIBAN,
            },
          },
          DbtrAgt: {
            FinInstnId: {
              BIC: parsedCreditTransfer.initiatorBIC,
            },
          },
          CdtTrfTxInf: mappedPayments,
        },
      },
    },
  });
  return [doc.end({ prettyPrint: true }), parsingResult.data];
};
