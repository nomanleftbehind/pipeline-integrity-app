import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useRouter } from 'next/router';

import { usePigRunByPipelineIdQuery } from '../../graphql/generated/graphql';

export default function PigRuns() {
	const router = useRouter();
	const { id } = router.query;
	const { data, loading, error } = usePigRunByPipelineIdQuery({ variables: { pipelineId: typeof id === 'string' ? id : '' } });


	return (
		<>
			{loading ? 'Loading...' :
				error ? <div>{error.message}</div> :
					data ?
						data.pigRunByPipelineId ?
							<Paper sx={{ width: '100%', overflow: 'hidden' }}>
								<TableContainer sx={{ maxHeight: 'calc(100vh - 64px)' }}>
									<Table stickyHeader aria-label="sticky table">
										<TableHead>
											<TableRow>
												{data.pigRunByPipelineId[0] ?
													Object.keys(data.pigRunByPipelineId[0]).map((column, index) => {
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
											{data.pigRunByPipelineId.map((pigRun) => {
												return pigRun ?
													<TableRow hover role="checkbox" tabIndex={-1} key={pigRun.id}>
														{Object.values(pigRun).map((value, index) => {
															return (
																<TableCell key={index} align={index === 0 ? 'left' : 'right'}>
																	{typeof value === 'string' ?
																		value :
																		typeof value === 'object' && !Array.isArray(value) && value !== null ?
																			<Table>
																				<TableHead>
																					<TableRow>
																						{Object.keys(value).map((subColumn, index) => {
																							return (
																								<TableCell key={index}>
																									{subColumn}
																								</TableCell>
																							)
																						})}
																					</TableRow>
																				</TableHead>
																				<TableBody>
																					<TableRow>
																						{Object.values(value).map((subValue, index) => {
																							return (
																								<TableCell key={index}>
																									{subValue}
																								</TableCell>
																							)
																						})}
																					</TableRow>
																				</TableBody>
																			</Table> :
																			null
																	}
																</TableCell>
															)
														})}
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