import React from 'react';
import { useTranslation } from 'react-i18next';
import { Drawer, DrawerBody, DrawerContent } from '@chakra-ui/react';
import { IconCross } from 'hds-react/icons';
import Text from '../../../../common/components/text/Text';
import { formatToFinnishDate } from '../../../../common/utils/date';
import { HankeData } from '../../../types/hanke';
import styles from './HankeSidebar.module.scss';
import HankeIndexes from '../../../hanke/hankeIndexes/HankeIndexes';

type SectionProps = {
  title: string;
  content: string;
};

const SidebarSection: React.FC<SectionProps> = ({ title, content }) =>
  title && title !== '' && content && content !== '' ? (
    <>
      <Text tag="h3" styleAs="h6" weight="bold" spacingBottom="2-xs">
        {title}
      </Text>
      <Text tag="p" styleAs="body-s" spacingBottom="2-xs">
        {content}
      </Text>
    </>
  ) : null;

type Props = {
  hanke: HankeData;
  isOpen: boolean;
  handleClose: () => void;
};

const HankeSidebar: React.FC<Props> = ({ hanke, isOpen, handleClose }) => {
  const { t } = useTranslation();

  const tyomaaTyyppiContent = hanke.tyomaaTyyppi.length
    ? hanke.tyomaaTyyppi.map((tyyppi) => t(`hanke:tyomaaTyyppi:${tyyppi}`)).join(', ')
    : '-';

  return (
    <Drawer
      variant="alwaysOpen"
      placement="left"
      isOpen={isOpen}
      size="md"
      // https://github.com/chakra-ui/chakra-ui/issues/2893
      // Temporary ixed with global css in app.scss
      trapFocus={false}
      useInert={false}
      onClose={handleClose}
      blockScrollOnMount={false}
    >
      <DrawerContent
        className={styles.hankeSidebar__content}
        aria-label={t('hankeSidebar:ariaSidebarContent')}
      >
        <DrawerBody>
          <button
            className={styles.hankeSidebar__closeButton}
            type="button"
            onClick={handleClose}
            aria-label={t('hankeSidebar:closeButtonAriaLabel')}
          >
            <IconCross aria-hidden />
          </button>
          <Text tag="h2" weight="bold" styleAs="h4" spacing="2-xs">
            {hanke.nimi} ({hanke.hankeTunnus})
          </Text>
          {hanke.tyomaaKatuosoite && (
            <Text tag="p" styleAs="h5" weight="bold" spacingBottom="2-xs">
              {hanke.tyomaaKatuosoite}
            </Text>
          )}
          <Text tag="p" styleAs="h6" weight="bold" spacingBottom="s">
            {formatToFinnishDate(hanke.alkuPvm)} - {formatToFinnishDate(hanke.loppuPvm)}
          </Text>
          <SidebarSection
            title={t('hankeForm:labels.vaihe')}
            content={t(`hanke:vaihe:${hanke.vaihe}`)}
          />
          <SidebarSection
            title={t('hankeForm:labels.tyomaaTyyppi')}
            content={tyomaaTyyppiContent}
          />
          <SidebarSection title={t('hankeForm:labels.kuvaus')} content={hanke.kuvaus} />
          <hr />

          <HankeIndexes hankeIndexData={hanke.tormaystarkasteluTulos} small />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default HankeSidebar;
