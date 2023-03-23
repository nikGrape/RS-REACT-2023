import From, { FromErrors } from '../Form';
import dayjs from 'dayjs';

dayjs.locale('es');

export function validate(form: From): FromErrors {
  const errors = new FromErrors();

  const brainWeight = parseInt(form.brainWeight.current?.value || '0');

  if (!form.firstname.current?.value.match(/^[A-Z].+/)) errors.firstname = true;
  if (!form.lastname.current?.value.match(/^[A-Z].+/)) errors.lastname = true;
  if (brainWeight < 1000 || brainWeight > 1500) errors.brainWeight = true;
  if (!form.zip.current?.value.match(/^[0-9]{4,8}$/)) errors.zip = true;
  if (!form.datashere.current?.checked) errors.datashere = true;
  if (!form.flatEarth.current?.checked && brainWeight > 1050) errors.flatEarth = true;

  if (!form.female.current?.checked && !form.male.current?.checked) errors.male = true;

  if (form.birthdate.current?.value) {
    const birthdate = dayjs(form.birthdate.current.value);
    const go14yearsBack = dayjs().subtract(14, 'year');
    if (go14yearsBack.isBefore(birthdate)) errors.birthdate = true;
  } else {
    errors.birthdate = true;
  }

  return errors;
}
