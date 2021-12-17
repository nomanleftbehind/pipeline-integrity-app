import Layout from '../components/layout';
import MenuBar from '../components/menubar';

import { sum_flow } from '../wasm/pkg/pipeline_database_wasm_bg';


export default function WebAssembly() {

  const obj1 = sum_flow([{ key1: 3, key2: 4 }, { key1: 5, key2: 6 }, { key1: 7, key2: 8 }, { key1: -15, key2: 8 }], 'key2');

  console.log('JS return:', obj1);

  return (
    <div>
      {obj1}
    </div>
  )
}

WebAssembly.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layout>
      <MenuBar />
      {page}
    </Layout>
  )
}
