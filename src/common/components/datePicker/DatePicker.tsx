import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DateInput, Tooltip } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { TooltipProps } from '../../types/tooltip';
import { getInputErrorText } from '../../utils/form';
import styles from './DatePicker.module.scss';
import { convertFinnishDate, formatToFinnishDate, toEndOfDayUTCISO } from '../../utils/date';

type PropTypes = {
  name: string;
  label?: string;
  disabled?: boolean;
  selected?: Date;
  locale: 'en' | 'fi' | 'sv' | undefined;
  tooltip?: TooltipProps;
  required?: boolean;
  maxDate?: Date;
  minDate?: Date;
  initialMonth?: Date;
  helperText?: string;
};

const DatePicker: React.FC<PropTypes> = ({
  name,
  label,
  disabled,
  tooltip,
  required,
  minDate,
  maxDate,
  initialMonth,
  helperText,
  locale,
}) => {
  const { t } = useTranslation();
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
          <div className={styles.datePicker}>
            <div className={styles.tooltip}>
              {!!tooltip && (
                <Tooltip buttonLabel={tooltip.buttonLabel} placement={tooltip.placement}>
                  {tooltip.tooltipText}
                </Tooltip>
              )}
            </div>
            <div className={styles.dateInput}>
              <DateInput
                id={name}
                label={label}
                disabled={disabled}
                invalid={Boolean(error)}
                value={formatToFinnishDate(value)}
                maxDate={maxDate}
                minDate={minDate}
                initialMonth={initialMonth}
                language={locale}
                required={required}
                disableConfirmation
                helperText={helperText}
                errorText={getInputErrorText(t, error)}
                ref={ref}
                onChange={(date) => {
                  const convertedDateString = convertFinnishDate(date);
                  onChange(toEndOfDayUTCISO(new Date(convertedDateString)));
                }}
              />
            </div>
          </div>
        )}
      />
    </>
  );
};
export default DatePicker;
