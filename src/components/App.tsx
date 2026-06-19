import React from 'react';

import { useDataQuery } from '../hooks/useDataQuery';
import { useEditState } from '../hooks/useEditState';
import { EditsList } from './EditsList';
import { Grid } from './Grid';

import './App.css';
import { Flag } from './Flag';

type SelectEvent = React.ChangeEvent<HTMLSelectElement>;

function App () {
	const [ queryParams, setQueryParams	] = React.useState<string | undefined>(undefined);
	const { data, error, isLoading } = useDataQuery(queryParams);
	const rowData = data?.results;

	const editAdd = useEditState((state) => state.add);

	const handleChange = (event: SelectEvent) => {
		setQueryParams(event.target.value);
	};
	const handleEdit = (rowIndex: number) => {
		if (data) {
			// const item = data.results.find(
			// 	(result) => result.rowId === rowId,
			// );
			const item = data.results[rowIndex];

			if (item) {
				editAdd(item)!;
			}
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: { error.message }</div>;
	}

	return (
		<div className="app">
			<h1>Zustand Generics: <span>proof of concept</span></h1>
			<div className="app_twin">
				<EditsList
					onEdit={ handleEdit }
					disableButtons={ !data }
					className="app_twin__item"
				/>
				<div className="app_twin__item">
					<h2>Data</h2>
					<select
						defaultValue=""
						onChange={handleChange}
					>
						<option value="query1">Query 1</option>
						<option value="query2">Query 2</option>
						<option value="query3">Query 3</option>
						<option value="">Empty</option>
					</select>
					<pre>
						{
							data
								? JSON.stringify(data, null, 2)
								: 'No data'
						}
					</pre>
					<Flag />
				</div>
				<div className="app_twin__item">
					<Grid rowData={rowData} />
				</div>
			</div>
		</div>
	);
}

export default App;
