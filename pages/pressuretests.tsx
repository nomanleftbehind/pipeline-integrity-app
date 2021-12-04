import Layout from '../components/layout';
import MenuBar from '../components/menubar';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useContext, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMeQuery, usePressureTestsByIdQuery } from '../graphql/generated/graphql';
import { UserContext } from './_app';



export default function PressureTests() {

  const { data } = usePressureTestsByIdQuery();

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.pressureTestsById ?
              data.pressureTestsById.map(pressureTest => {
                return pressureTest ?
                  (
                    <TableRow hover role="checkbox" tabIndex={-1} key={pressureTest.id}>
                      <TableCell align="right">{pressureTest.id}</TableCell>
                      <TableCell align="right">{pressureTest.pipeline.license}</TableCell>
                      <TableCell align="right">{pressureTest.pipeline.segment}</TableCell>
                      <TableCell align="right">{pressureTest.pressureTestDate}</TableCell>
                    </TableRow>
                  ) : null
              }) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}


PressureTests.getLayout = function getLayout(page: ReactNode) {

  return (
    <Layout>
      <MenuBar />
      {page}
    </Layout>
  )
}