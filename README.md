# WIP: better-sepa

This package is a work in progress and is not yet ready for production use. Please use with caution.

## Description

`better-sepa` is a package designed to improve the handling of SEPA (Single Euro Payments Area) transactions. It provides enhanced functionality and convenience for working with SEPA-related data.

## Installation

To install `better-sepa`, simply run the following command:

```bash
npm install better-sepa
```

## Usage

To use `better-sepa`, import it into your project and start utilizing its features. Here's a simple example:

```javascript
// Sample Data
const payment: CreditTransferPayment = {
  recipientIBAN: 'DE75512108001245126199',
  recipientBIC: 'DEUTDEFF',
  recipientName: 'Max Mustermann',
  reference: 'Test Reference',
  amount: 100,
};

const transferSample: CreditTransfer = {
  batchBooking: true,
  payments: [payment],
  initiatorBIC: 'DEUTDEFF',
  initiatorName: 'Max Mustermann',
  initiatorIBAN: 'DE75512108001245126199',
};

const [xmlSample, jsonSample] = new SEPA(
  SEPA_FORMATS['PAIN.001.001.03']
).generateDocument(transferSample);

console.log(jsonSample);

// Your code here...
```

## License

This project is licensed under the [MIT License](LICENSE).
