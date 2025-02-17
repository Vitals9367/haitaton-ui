import { FieldPath, FieldValues, UseFormTrigger } from 'react-hook-form';
import { ObjectSchema } from 'yup';

/**
 * Change form step if validation is successful
 * @param handleStepChange function that is called if form is valid
 * @param fieldsToValidate array of form fields that are validated
 * @param trigger react-hook-form trigger function
 */
export function changeFormStep<T extends FieldValues>(
  handleStepChange: () => void,
  fieldsToValidate: FieldPath<T>[],
  trigger: UseFormTrigger<T>
) {
  trigger(fieldsToValidate, { shouldFocus: true }).then((isValid) => {
    if (isValid) {
      handleStepChange();
    }
  });
}

export function isPageValid<T extends FieldValues, T2 = T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: ObjectSchema<any>,
  pageFieldPaths: FieldPath<T>[],
  formValues: T2
): boolean {
  let isValid = true;
  for (let i = 0; i < pageFieldPaths.length; i += 1) {
    const path = pageFieldPaths[i];
    try {
      schema.validateSyncAt(path, formValues);
    } catch (error) {
      isValid = false;
      break;
    }
  }
  return isValid;
}
