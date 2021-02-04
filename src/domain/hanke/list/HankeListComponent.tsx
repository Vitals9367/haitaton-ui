import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import H1 from '../../../common/components/text/H1';
import { useLocalizedRoutes } from '../../../common/hooks/useLocalizedRoutes';
import Locale from '../../../common/components/locale/Locale';
import { HankeDataDraft } from '../../types/hanke';

import Table from './Table';
import './Hankelista.styles.scss';

type Props = {
  initialData: HankeDataDraft[];
};

const Projects: React.FC<Props> = ({ initialData }) => {
  const { NEW_HANKE } = useLocalizedRoutes();

  const { t } = useTranslation();
  const columns = React.useMemo(
    () => [
      {
        Header: t('hankeList:tableHeader:id'),
        id: 'id',
        accessor: 'hankeTunnus',
      },
      {
        Header: t('hankeList:tableHeader:name'),
        id: 'name',
        accessor: 'nimi',
      },
      {
        Header: t('hankeList:tableHeader:step'),
        id: 'step',
        accessor: 'vaihe',
      },
      {
        Header: t('hankeList:tableHeader:startDate'),
        id: 'startDate',
        accessor: (data: HankeDataDraft) => {
          return data.alkuPvm && Date.parse(data.alkuPvm);
        },
      },
      {
        Header: t('hankeList:tableHeader:endDate'),
        id: 'endDate',
        accessor: (data: HankeDataDraft) => {
          return data.loppuPvm && Date.parse(data.loppuPvm);
        },
      },
    ],
    []
  );
  return (
    <div className="hankelista">
      <H1 stylesAs="h2" data-testid="HankeListPageHeader">
        {t('hankeList:pageHeader')}
      </H1>
      <div className="hankelista__inner">
        <Table columns={columns} data={initialData || []} />
        <div className="hankelista__buttonWpr">
          <NavLink data-testid="toFormLink" to={NEW_HANKE.path} className="hankelista__hankeLink">
            <Locale id="header:hankeLink" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Projects;
