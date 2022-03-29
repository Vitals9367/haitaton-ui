import React from 'react';
import { useQuery } from 'react-query';
import api from '../../api/api';
import { HankeData } from '../../types/hanke';
import HankePortfolioComponent from './HankePortfolioComponent';

const getHankkeet = async () => {
  const { data } = await api.get<HankeData[]>(`/hankkeet/`);
  return data;
};

const useHankeList = () => useQuery<HankeData[]>(['project'], getHankkeet);

const HankePortfolioContainer: React.FC = () => {
  const { data } = useHankeList();

  // Add header to fix Axe "page-has-heading-one"-error
  return data ? <HankePortfolioComponent hankkeet={data} /> : <h1>Ladataan..</h1>;
};

export default HankePortfolioContainer;
