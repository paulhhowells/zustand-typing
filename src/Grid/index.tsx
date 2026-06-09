import React from 'react';
import {
	AllCommunityModule,
	ValidationModule,
	type CellValueChangedEvent,
	type ColDef,
} from 'ag-grid-community';
import {
	CellSelectionModule,
} from 'ag-grid-enterprise';
import { AgGridProvider, AgGridReact } from 'ag-grid-react';

import type { Row, RowData } from '../hooks/useDataQuery';

const modules = [
	AllCommunityModule,
	CellSelectionModule,
	...(process.env.NODE_ENV !== 'production' ? [ ValidationModule ] : []),
];

const getRowId = (params: { data: Row; }) => params.data.rowIndex.toString();
const columnDefs: ColDef<Row>[] = [
	{
		field: 'id',
		editable: true,
	},
	{
		field: 'name',
		editable: true,
	},
	{ field: 'rowIndex' },
	{ field: 'edits' },
];

export function Grid ({ rowData }: { rowData?: RowData }) {
	const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		console.log('Grid button clicked', event);
	}, []);

	const onCellValueChanged = React.useCallback((params: CellValueChangedEvent) => {
		const {
			api,
			colDef,
			data,
			newValue,
		} = params;

		// Is this the right way to get the row node for the edited cell?
		// Can params.node be used for this instead?
		const rowNode = api.getRowNode(params.data.rowId);

		console.log('rowNode?.data.getDataValue edits', rowNode?.getDataValue('edits'));

		const edits = params.data.edits || [];

		console.log(colDef.field, newValue, edits, edits.includes(newValue));

		if (edits.includes(newValue) === false) {
			// Is this the right way to update a single cell value without re-rendering the entire grid?

			// Is this recursive?

			rowNode?.setDataValue(
				'edits',
				[
					...edits,
					newValue,
				],
				'data',
			);
		}

		console.log('Cell value changed', params);
		console.log(colDef.field, newValue, data);
	}, []);

	return (
		<AgGridProvider modules={modules}>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
				<header>
					<button onClick={handleClick}>Button</button>
				</header>
				<div style={{ flexGrow: 1 }}>
					<AgGridReact
						rowData={rowData}
						getRowId={getRowId}
						columnDefs={columnDefs}
						onCellValueChanged={onCellValueChanged}
						cellSelection
					/>
				</div>
			</div>
		</AgGridProvider>
	);
}
