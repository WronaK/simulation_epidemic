import {FormControl, ValidationErrors} from '@angular/forms';

export class ParameterValidator {
  static isGreater =
    (firstValue: FormControl, secondValue: FormControl) => (): ValidationErrors | null => {
    if (firstValue.value < secondValue.value) {
      return {theGreater: true};
    }
    return null;
    }

  static isMoralityRate =
    (moralityRate: FormControl) => (): ValidationErrors | null => {
      if (moralityRate.value > 1) {
        return {isMoralityRate: true};
      }
      return null;
    }

}
