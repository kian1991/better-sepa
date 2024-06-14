function _dateToPain(date: Date) {
	const off = date.getTimezoneOffset();
	return new Date(date.getTime() - off * 60 * 1000)
		.toISOString()
		.substring(0, 22)
		.replace(/[^0-9]/g, '');
}

// Simulate retrieving the next sequence number
// This could come from a database or another persistent storage
let currentSequence = 0;
function _getNextSequenceNumber(): string {
	currentSequence += 1; // Increment the sequence number
	return String(currentSequence).padStart(4, '0'); // Pad with zeros to ensure it has at least 4 digits
}

export const createMsgId = (date: Date): string => {
	// PAIN001YYYYMMDDHHMMSSMS (add 2 hrs)
	return `PAIN001${_dateToPain(date)}`;
};

export function generateEndToEndReference(): string {
	const date = new Date();
	const yyMMdd = date.toISOString().slice(2, 10).replace(/-/g, ''); // Format as YYMMDD
	const sequenceNumber = _getNextSequenceNumber(); // Function to retrieve the next sequence number
	//2404160013867001 => digits: 16
	return `${yyMMdd}${sequenceNumber}${Math.floor(Math.random() * 1000000)}`; // Add a random 4-digit number
}
