import React from 'react';
import { Dialog, Button, DialogVariant } from 'hds-react';
import { IconAlertCircleFill, IconErrorFill } from 'hds-react/icons';
import { useTranslation } from 'react-i18next';

import styles from './ConfirmationDialog.module.scss';

type Props = {
  title: string;
  description: string | React.ReactNode;
  isOpen: boolean;
  close: () => void;
  mainAction: () => void;
  mainBtnLabel: string;
  mainBtnIcon?: React.ReactElement;
  variant: DialogVariant;
  errorMsg?: string;
  showCloseButton?: boolean;
  showSecondaryButton?: boolean;
  isLoading?: boolean;
};

const ConfirmationDialog: React.FC<Props> = ({
  title,
  description,
  isOpen,
  close,
  mainAction,
  mainBtnLabel,
  mainBtnIcon,
  variant,
  errorMsg,
  showCloseButton = false,
  showSecondaryButton = true,
  isLoading = false,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      id="dialog"
      isOpen={isOpen}
      aria-labelledby={title}
      aria-describedby={typeof description === 'string' ? description : title}
      targetElement={document.getElementById('root') || undefined}
      variant={variant}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      close={showCloseButton ? (close as any) : undefined}
      closeButtonLabelText={t('common:ariaLabels:closeButtonLabelText')}
    >
      <Dialog.Header
        id="dialog-title"
        title={title}
        iconLeft={
          <IconAlertCircleFill
            aria-hidden="true"
            color={variant === 'primary' ? 'var(--color-bus)' : 'var(--color-brick)'}
          />
        }
      />
      <Dialog.Content>
        {typeof description === 'string' ? (
          <p data-testid="dialog-description-test">{description}</p>
        ) : (
          <div data-testid="dialog-description-test">{description}</div>
        )}
        {errorMsg && (
          <div className={styles.errorMsg}>
            <IconErrorFill />
            <p>{errorMsg}</p>
          </div>
        )}
      </Dialog.Content>
      <Dialog.ActionButtons>
        <Button
          onClick={mainAction}
          data-testid="dialog-button-test"
          variant={variant}
          iconLeft={mainBtnIcon}
          isLoading={isLoading}
        >
          {mainBtnLabel}
        </Button>
        {showSecondaryButton && (
          <Button
            variant="secondary"
            onClick={close}
            theme={variant === 'danger' ? 'black' : 'default'}
            data-testid="dialog-cancel-test"
          >
            {t('common:confirmationDialog:cancelButton')}
          </Button>
        )}
      </Dialog.ActionButtons>
    </Dialog>
  );
};
export default ConfirmationDialog;
