import Layout from '../components/layout';
import MenuBar from '../components/menubar';
import { ReactNode } from 'react';

export default function Index() {
  return (
    <section>
      <h2>Welcome to Pipeline Database web app</h2>
      <p>
        Click buttons in the navigation bar to view or edit desired entities.
      </p>
    </section>
  )
}

Index.getLayout = function getLayout(page: ReactNode) {
  return (
    <Layout>
      <MenuBar />
      {page}
    </Layout>
  )
}
