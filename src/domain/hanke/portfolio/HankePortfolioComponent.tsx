import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTable, useSortBy, usePagination } from 'react-table';
import { useAccordion, Card, Tag, Tabs, Tab, TabList, TabPanel } from 'hds-react';
import { IconAngleDown, IconAngleUp, IconPen, IconCrossCircle } from 'hds-react/icons';
import { Link } from 'react-router-dom';
import Text from '../../../common/components/text/Text';
import { useLocalizedRoutes } from '../../../common/hooks/useLocalizedRoutes';
import { HankeDataDraft } from '../../types/hanke';

import styles from './HankePortfolio.module.scss';
import { formatToFinnishDate } from '../../../common/utils/date';

type CustomAccordionProps = {
  hanke: HankeDataDraft;
};

const CustomAccordion: React.FC<CustomAccordionProps> = ({ hanke }) => {
  const { MAP } = useLocalizedRoutes();
  // Handle accordion state with useAccordion hook
  const { isOpen, buttonProps, contentProps } = useAccordion({ initiallyOpen: false });
  // Change icon based on accordion open state
  const icon = isOpen ? <IconAngleDown size="m" /> : <IconAngleUp size="m" />;
  return (
    <>
      <Card className={styles.hankeCard} border aria-label="Advanced filters" {...buttonProps}>
        {/* voi siirtää omaan palikkaan kortin headerin */}
        <div className={styles.hankeCardHeader}>
          <Link
            className={styles.link}
            to={`${MAP.path}?hanke=${hanke.hankeTunnus}`}
            title="Avaa hanke kartalla"
          >
            {hanke.hankeTunnus}
          </Link>
          <div className={styles.hankeName}>
            <p>{hanke.nimi}</p>
          </div>
          {/* vaihe tagit voisi olla eriväriset eri vaiheille */}
          <Tag className={styles.tag}>{hanke.vaihe}</Tag>
          <div className={styles.hankeDates}>
            <p>{formatToFinnishDate(hanke.alkuPvm)}</p>-<p>{formatToFinnishDate(hanke.loppuPvm)}</p>
          </div>
          <div className={styles.actions}>
            <IconPen />
            <IconCrossCircle />
          </div>
          <div className={styles.iconWrapper}>{icon}</div>
        </div>
      </Card>
      <Card
        className={styles.hankeCardContent}
        border
        aria-label="Advanced filters"
        {...contentProps}
      >
        <Tabs small>
          <TabList className={styles.tablist}>
            <Tab>Perustiedot</Tab>
            <Tab>Yhteystiedot</Tab>
            <Tab>Liitteet</Tab>
          </TabList>
          <TabPanel>
            <div className={styles.gridTest}>
              <div className={`${styles.gridItem} ${styles.gridDescription}`}>
                <b>Kuvaus</b>
                <p>lipsum</p>
              </div>
              <div className={styles.gridItem}>
                <b>Hankevaihe</b>
                <p>lipsum</p>
              </div>
              <div className={styles.gridItem}>
                <b>Suunnitteluvaihe</b>
                <p>lipsum</p>
              </div>
              <div className={styles.gridItem}>
                <b>Katuosoite</b>
                <p>lipsum</p>
              </div>
              <div className={styles.gridItem}>
                <b>Työmaan koko</b>
                <p>lipsum</p>
              </div>
              <div className={`${styles.gridItem} ${styles.gridType}`}>
                <b>Työmaan tyyppi</b>
                <p>lipsum</p>
              </div>
              <div className={`${styles.gridItem} ${styles.gridType}`}>
                <b>Haitat väliotsikko</b>
              </div>
              <div className={`${styles.gridItem} ${styles.gridInception}`}>
                <div className={styles.gridHaitat}>
                  <b>Kaistahaitta</b>
                  <p>lipsum</p>
                </div>
                <div className={styles.gridHaitat}>
                  <b>Kaistan pituushaitta</b>
                  <p>lipsum</p>
                </div>
                <div className={styles.gridHaitat}>
                  <b>Meluhaitta</b>
                  <p>lipsum</p>
                </div>
                <div className={styles.gridHaitat}>
                  <b>Pölyhaitta</b>
                  <p>lipsum</p>
                </div>
                <div className={styles.gridHaitat}>
                  <b>Tärinähaitta</b>
                  <p>lipsum</p>
                </div>
              </div>
              <div className={`${styles.gridItem} ${styles.gridInception}`}>
                <div className={styles.gridIndex}>
                  <b>Liikennehaitaindeksi</b>
                  <p>lipsum</p>
                </div>
                <div className={styles.gridIndex}>
                  <b>Pyöräilyn pääreitti</b>
                  <p>lipsum</p>
                </div>
                <div className={styles.gridIndex}>
                  <b>Merkittävät joukkoliikennereitit</b>
                  <p>lipsum</p>
                </div>
                <div className={styles.gridIndex}>
                  <b>Ruuhkautuminen</b>
                  <p>lipsum</p>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>Tab 2 sisältö</TabPanel>
          <TabPanel>Tab 3 sisältö</TabPanel>
        </Tabs>
      </Card>
    </>
  );
};

export type Column = {
  Header: string;
  // eslint-disable-next-line
  accessor: any;
};

export interface PagedRowsProps {
  columns: Array<Column>;
  data: Array<HankeDataDraft>;
}

const PaginatedPortfolio: React.FC<PagedRowsProps> = ({ columns, data }) => {
  const { page } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      {page.map((row) => {
        return (
          <div>
            <CustomAccordion hanke={row.original} />
          </div>
        );
      })}
    </>
  );
};

type Props = {
  hankkeet: HankeDataDraft[];
};

const HankePortfolio: React.FC<Props> = ({ hankkeet }) => {
  const { t } = useTranslation();
  const columns = React.useMemo(
    () => [
      {
        Header: 'hankeTunnus',
        id: 'hankeTunnus',
        accessor: 'hankeTunnus',
      },
      {
        Header: 'nimi',
        id: 'nimi',
        accessor: 'nimi',
      },
      {
        Header: 'vaihe',
        id: 'vaihe',
        accessor: 'vaihe',
      },
      {
        Header: 'alkuPvm',
        id: 'alkuPvm',
        accessor: (data: HankeDataDraft) => {
          return data.alkuPvm && Date.parse(data.alkuPvm);
        },
      },
      {
        Header: 'loppuPvm',
        id: 'loppuPvm',
        accessor: (data: HankeDataDraft) => {
          return data.loppuPvm && Date.parse(data.loppuPvm);
        },
      },
    ],
    []
  );
  // TODO: Continue with implementing paging
  // create a static component of paging which receives functions to change
  // pages as props
  // then use the implementation for the hankeLista as well

  return (
    <div className={styles.hankesalkkuContainer}>
      <div>
        <Text
          tag="h1"
          data-testid="HankePortfolioPageHeader"
          styleAs="h2"
          spacing="s"
          weight="bold"
        >
          {t('hankePortfolio:pageHeader')}
        </Text>
        <div className={styles.contentContainer}>
          <PaginatedPortfolio data={hankkeet} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default HankePortfolio;
