import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useRouter } from 'next/router';
import EntryField from '../fields/EntryField';

import { usePigRunsByPipelineIdQuery, useGetValidatorsQuery } from '../../graphql/generated/graphql';

export default function PigRuns() {
	const router = useRouter();
	const { id } = router.query;
	const { data, loading, error } = usePigRunsByPipelineIdQuery({ variables: { pipelineId: typeof id === 'string' ? id : '' } });
	const { data: validatorsData } = useGetValidatorsQuery();

	const { pigTypeEnum } = validatorsData?.validators || {}

	return (
		<>
			{loading ? 'Loading...' :
				error ? <div>{error.message}</div> :
					data ?
						data.pigRunsByPipelineId ?
							<Paper sx={{ width: '100%', overflow: 'hidden' }}>
								<TableContainer sx={{ maxHeight: 'calc(100vh - 64px)' }}>
									<Table stickyHeader aria-label="sticky table">
										<TableHead>
											<TableRow>
												{data.pigRunsByPipelineId[0] ?
													Object.keys(data.pigRunsByPipelineId[0]).map((column, index) => {
														return (
															<TableCell key={index}>
																{column}
															</TableCell>
														)
													}) :
													null
												}
											</TableRow>
										</TableHead>
										<TableBody>
											{data.pigRunsByPipelineId.map((pigRun) => {
												return pigRun ?
													<TableRow hover role="checkbox" tabIndex={-1} key={pigRun.id}>
														<EntryField table="pig runs" id={pigRun.id} record={pigRun.id} columnName="id" />
														<EntryField table="pig runs" id={pigRun.id} record={pigRun.pigType} columnName="pigType" validator={pigTypeEnum} />
														<EntryField table="pig runs" id={pigRun.id} record={pigRun.date} columnName="date" />
														<EntryField table="pig runs" id={pigRun.id} record={pigRun.comment} columnName="comment" validator={"^.*$"} />
														<EntryField table="pig runs" id={pigRun.id} record={pigRun.operator?.email} columnName="operator" />
														<EntryField table="pig runs" id={pigRun.id} record={pigRun.createdBy?.email} columnName="createdBy" />
														<EntryField table="pig runs" id={pigRun.id} record={pigRun.createdAt} columnName="createdAt" />
														<EntryField table="pig runs" id={pigRun.id} record={pigRun.updatedAt} columnName="updatedAt" />
													</TableRow> :
													null;
											})}
										</TableBody>
									</Table>
								</TableContainer>
							</Paper> :
							null :
						null
			}
		</>
	)
}