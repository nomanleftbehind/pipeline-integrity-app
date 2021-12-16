import { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Link from 'next/link';
import Layout from '../components/layout';
import MenuBar from '../components/menubar';

import { add_one } from '../wasm/pkg/pipeline_database_wasm_bg.wasm';
import { sum_flow } from '../wasm/pkg/pipeline_database_wasm_bg';

type TestParams = Parameters<typeof add_one>

const RustComponent = dynamic(
  async function loader() {
    // Import the wasm module
    const rustModule = await import('../wasm/pkg/pipeline_database_wasm_bg.wasm');
    // Return a React component that calls the add_one method on the wasm module
    function addOne({ num1, num2 }: { num1: TestParams[0], num2: TestParams[0] }) {
      return (
        <div>
          <div>{rustModule.add_one(num1, num2)}</div>
          {/* <div>{rustModule.take_str_by_shared_ref("hello")}</div> */}
        </div>
      )
    }
    return addOne;
  },
)

export default function WebAssembly() {

  const obj1 = sum_flow([{ key1: 3, key2: 4 }, { key1: 5, key2: 6 }, { key1: 7, key2: 8 },], 'key3');

  console.log('JS return:', obj1);



  // async function mem() {
  //   const m = await import('../wasm/pkg/pipeline_database_wasm_bg.wasm');

  //   return m.memory;
  // }

  // const b = mem().then(res => {
  //   console.log(res.buffer.byteLength);

  // })



  return (
    <div>
      <RustComponent num1={2} num2={4} />
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
