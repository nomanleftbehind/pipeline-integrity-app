import Layout from '../components/layout';
import MenuBar from '../components/menubar';
import EntryField from '../components/fields/EntryField';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useContext, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { usePressureTestsByIdQuery, useValidatorLimitingSpecQuery } from '../graphql/generated/graphql';



export default function PressureTests() {

  const { data } = usePressureTestsByIdQuery();
  const { data: dataLimitingSpec } = useValidatorLimitingSpecQuery();

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 64px)' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>License</TableCell>
              <TableCell>Segment</TableCell>
              <TableCell align="right">Limiting Spec</TableCell>
              <TableCell align="right">Info Sent Out</TableCell>
              <TableCell align="right">DDS Date</TableCell>
              <TableCell align="right">Pressure Test Date</TableCell>
              <TableCell align="right">Pressure Test Received Date</TableCell>
              <TableCell align="right">Integriry Sheet Updated Date</TableCell>
              <TableCell align="right">Comment</TableCell>
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
                      <EntryField table="pressureTest" id={pressureTest.id} record={pressureTest.limitingSpec} columnName="limitingSpec" validator={dataLimitingSpec?.validators?.limitingSpecEnum} />
                      <TableCell align="right">{pressureTest.infoSentOutDate}</TableCell>
                      <TableCell align="right">{pressureTest.ddsDate}</TableCell>
                      <TableCell align="right">{pressureTest.pressureTestDate}</TableCell>
                      <TableCell align="right">{pressureTest.pressureTestReceivedDate}</TableCell>
                      <TableCell align="right">{pressureTest.integritySheetUpdated}</TableCell>
                      <TableCell align="right">{pressureTest.comment}</TableCell>
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