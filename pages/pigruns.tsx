import { ReactNode } from 'react';
import Layout from '../components/layout';
import MenuBar from '../components/menubar';
import GenericTable from '../components/rows/GenericTable';


export default function PigRuns() {
  return <GenericTable table='pig runs' />
}

PigRuns.getLayout = function getLayout(page: ReactNode) {
  return (
    <Layout>
      <MenuBar />
      {page}
    </Layout>
  )
}