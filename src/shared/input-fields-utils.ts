import { FormControl } from '@angular/forms';

export function getMeaningfulMessage(field: FormControl) {
  if (field.valid) {
    return '';
  }
  let message = '';
  const requiredError = field.errors?.['required'];
  const minLengthError = field.errors?.['minlength'];
  const patternError = field.errors?.['pattern'];
  const emailError = field.errors?.['email'];
  const datePickerError = field.errors?.['matDatepickerParse'];
  if(requiredError !== undefined && requiredError === true) {
    message += ' This field is required! ';
  } else if (minLengthError !== undefined) {
    message += ` Minimal length is "${minLengthError.requiredLength}", current length "${minLengthError.actualLength}"! `;
  } else if (patternError !== undefined) {
    message += ' Invalid format! ';
  } else if (emailError !== undefined && emailError === true) {
    message += ' Email has bad format! ';
  } else if (datePickerError !== undefined) {
    message += ' Entered invalid date! ';
  } 
  return message;
}
