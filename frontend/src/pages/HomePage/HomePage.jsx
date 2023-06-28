//главная страница

import { Catalog } from '../../components/Catalog/Catalog';
import { TopSales } from '../../components/Top-sales/Top-sales';

export const HomePage = () => {
  return (
    <>
      <TopSales />
      <Catalog />
    </>
  );
};
