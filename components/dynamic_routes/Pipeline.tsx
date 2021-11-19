import * as React from 'react';
import { useRouter } from 'next/router';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { usePipelineByIdQuery, PipelineByIdQuery, usePigRunByPipelineIdQuery } from '../../graphql/generated/graphql';

type IPipeline = NonNullable<PipelineByIdQuery['pipelineById']>;
type IPipelineValues = IPipeline[keyof IPipeline] | undefined;

export default function Pipeline() {
	const router = useRouter();
	const { id } = router.query;
	const { data, loading, error } = usePipelineByIdQuery({ variables: { id: typeof id === 'string' ? id : '' } });
	const { data: dataPigRun, loading: loadingPigRun, error: errorPigRun } = usePigRunByPipelineIdQuery({ variables: { pipelineId: typeof id === 'string' ? id : '' } });

	function renderValue(value: IPipelineValues) {
		if (Array.isArray(value)) {
			return (
				value.map((v, i) => {
					if (typeof v === 'object' && !Array.isArray(v) && v !== null) {
						return (
							<Table key={i}>
								<TableBody>
									{Object.entries(v).map(([k, v]) => {
										return (
											<TableRow key={k}>
												<TableCell>
													{k}
												</TableCell>
												<TableCell align="right">
													{v}
												</TableCell>
											</TableRow>
										)
									})
									}
								</TableBody>
							</Table>
						)
					} else {
						return v
					}
				})
			)
		} else if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
			return (
				<Table>
					<TableBody>
						{Object.entries(value).map(([k, v]) => {
							return (
								<TableRow key={k}>
									<TableCell>
										{k}
									</TableCell>
									<TableCell align="right">
										{v}
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			)
		} else {
			return value
		}
	}

	return (
		<>
			<Paper sx={{ width: '100%', overflow: 'hidden' }}>
				<TableContainer sx={{ maxHeight: 'calc(100vh - 64px)' }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								<TableCell style={{ minWidth: 170 }}>
									<IconButton aria-label="window back" size="small" onClick={() => router.back()}>
										<ArrowBackIcon />
									</IconButton>
									Property
								</TableCell>
								<TableCell align='right' style={{ minWidth: 170 }}>Value</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{loading ? <TableRow><TableCell>Loading...</TableCell></TableRow> :
								error ? <TableRow><TableCell>{error.message}</TableCell></TableRow> :
									data ?
										data.pipelineById ?
											Object.entries(data.pipelineById).map(([a, b]) => {
												return (
													<TableRow hover role="checkbox" tabIndex={-1} key={a}>
														<TableCell>
															{a}
														</TableCell>
														<TableCell align="right">
															{renderValue(b)}
														</TableCell>
													</TableRow>
												);
											}) :
											null :
										null
							}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</>
	)
}