import { SEPA_FORMATS } from './constants';
import { createCreditTransferXML } from './converters/credit-transfer';
import { CreditTransfer, type CreditTransferInput } from './types/types';

export class SEPA {
  private _document: string = '';

  constructor(private _sepaFormat: SEPA_FORMATS) {}

  generateDocument(input: CreditTransferInput): [string, CreditTransfer] {
    switch (this._sepaFormat) {
      case SEPA_FORMATS['PAIN.001.001.03']:
        const [xml, json] = createCreditTransferXML(input);
        this._document = xml;
        return [xml, json];
      default:
        throw new Error('Unsupported SEPA format');
    }
  }
}

export default SEPA;
