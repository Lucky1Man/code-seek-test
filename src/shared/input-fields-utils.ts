import { FormControl } from '@angular/forms';

export function getMeaningfulMessage(field: FormControl) {
  if (field.valid) {
    return '';
  }
  if(field.errors?.['required'] !== undefined && field.errors?.['required'] === true) {
    return 'This field is required!';
  } else {
    return '';
  }
}
