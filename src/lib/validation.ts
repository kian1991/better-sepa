/**
 * Replace letters with numbers using the SEPA scheme A=10, B=11, ...
 * Non-alphanumerical characters are dropped.
 *
 * @param str     The alphanumerical input string
 * @return        The input string with letters replaced
 */
function _replaceChars(str: string): string {
	var res = '';
	for (var i = 0, l = str.length; i < l; ++i) {
		var cc = str.charCodeAt(i);
		if (cc >= 65 && cc <= 90) {
			res += (cc - 55).toString();
		} else if (cc >= 97 && cc <= 122) {
			res += (cc - 87).toString();
		} else if (cc >= 48 && cc <= 57) {
			res += str[i];
		}
	}
	return res;
}

/**
 * mod97 function for large numbers
 *
 * @param str     The number as a string.
 * @return        The number mod 97.
 *
 */
function _txtMod97(str: string): number {
	var res = 0;
	for (var i = 0, l = str.length; i < l; ++i) {
		res = (res * 10 + parseInt(str[i], 10)) % 97;
	}
	return res;
}

/**
 * Calculates the checksum for the given IBAN. The input IBAN should pass 00
 * as the checksum digits, a full iban with the corrected checksum will be
 * returned.
 *
 * Example: DE00123456781234567890 -> DE87123456781234567890
 *
 * @param iban        The IBAN to calculate the checksum for.
 * @return            The corrected IBAN.
 */
export function checksumIBAN(iban: string): string {
	var ibrev = iban.substring(4) + iban.substring(0, 2) + '00';
	var mod = _txtMod97(_replaceChars(ibrev));
	return iban.substring(0, 2) + ('0' + (98 - mod)).substring(-2, 2) + iban.substring(4);
}

/**
 * Checks if a Creditor ID is valid (no country specific checks are done).
 *
 * @param iban        The Creditor ID to check.
 * @return            True, if the Creditor IDis valid.
 */
export function validateCreditorID(cid: string): boolean {
	var cidrev = cid.substring(7) + cid.substring(0, 4);
	return _txtMod97(_replaceChars(cidrev)) === 1;
}

/**
 * Calculates the checksum for the given Creditor ID . The input Creditor ID
 * should pass 00 as the checksum digits, a full Creditor ID with the
 * corrected checksum will be returned.
 *
 * Example: DE00ZZZ09999999999 -> DE98ZZZ09999999999
 *
 * @param iban        The IBAN to calculate the checksum for.
 * @return            The corrected IBAN.
 */
export function checksumCreditorID(cid: string): string {
	var cidrev = cid.substring(7) + cid.substring(0, 2) + '00';
	var mod = _txtMod97(_replaceChars(cidrev));
	return cid.substring(0, 2) + ('0' + (98 - mod)).substring(-2, 2) + cid.substring(4);
}

/**
 * Checks if an IBAN is valid (no country specific checks are done).
 *
 * @param iban        The IBAN to check.
 * @return            True, if the IBAN is valid.
 */
export function validateIBAN(iban: string): boolean {
	var ibrev = iban.substring(4) + iban.substring(0, 4);
	return _txtMod97(_replaceChars(ibrev)) === 1;
}
