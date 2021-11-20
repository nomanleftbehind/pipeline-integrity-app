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

import { usePipelineByIdQuery, PipelineByIdQuery } from '../../graphql/generated/graphql';

type IPipeline = NonNullable<PipelineByIdQuery['pipelineById']>;
type IPipelineValues = IPipeline[keyof IPipeline] | undefined;

type ArraysFromUnion<T> = T extends (infer U)[] ? U[] : never;
type ArrayType = ArraysFromUnion<IPipelineValues>

type InsideArray<T> = T extends (infer U)[] ? U : never
type Element = InsideArray<ArrayType>

export default function Pipeline() {
	const router = useRouter();
	const { id } = router.query;
	const { data, loading, error } = usePipelineByIdQuery({ variables: { id: typeof id === 'string' ? id : '' } });

	// This function finds first object inside array that's not null or undefined.
	// Can't use array.find(el => el) because compiler says that
	// each member of the el union type has signatures, but none of those signatures are compatible with each other
	function renderHeaderCells(array: ArrayType) {
		let el: Element;
		for (let i = 0; i < array.length; i++) {
			el = array[i];
			if (el) break;
		}
		if (el) {
			return (
				Object.keys(el).map((subColumn, index, arr) => {
					return (
						<TableCell key={index} align={index !== 0 || arr.length === 1 ? 'right' : 'left'}>
							{subColumn}
						</TableCell>
					)
				})
			)
		} else {
			return null
		}
	}

	function renderValue(value: IPipelineValues) {
		if (!value) {
			return null
		} else if (typeof value === 'string' || typeof value === 'number' || value === true) {
			return <div>{value}</div>
		} else {
			return (
				<Table>
					{Array.isArray(value) ?
						<>
							<TableHead>
								<TableRow>
									{renderHeaderCells(value)}
								</TableRow>
							</TableHead>
							<TableBody>
								{value.map((subValue, index) => {
									return (
										<TableRow key={index}>
											{subValue ?
												Object.values(subValue).map((subSubValue, subIndex, arr) => {
													return (
														<TableCell key={subIndex} align={subIndex !== 0 || arr.length === 1 ? 'right' : 'left'}>
															{subSubValue}
														</TableCell>
													)
												}) :
												null
											}
										</TableRow>
									)
								})}
							</TableBody>
						</> :
						<>
							<TableHead>
								<TableRow>
									{Object.keys(value).map((subColumn, index, arr) => {
										return (
											<TableCell key={index} align={index !== 0 || arr.length === 1 ? 'right' : 'left'}>
												{subColumn}
											</TableCell>
										)
									})}
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									{Object.values(value).map((subValue, index, arr) => {
										return (
											<TableCell key={index} align={index !== 0 || arr.length === 1 ? 'right' : 'left'}>
												{subValue}
											</TableCell>
										)
									})}
								</TableRow>
							</TableBody>
						</>}
				</Table>
			)
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