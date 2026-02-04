import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function campoObrigatorio(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;

    if (valor === null || valor === undefined) {
      return { campoObrigatorio: true };
    }

    if (typeof valor === 'string' && valor.trim() === '') {
      return { campoObrigatorio: true };
    }

    if (Array.isArray(valor) && valor.length === 0) {
      return { campoObrigatorio: true };
    }

    return null;
  };
}
