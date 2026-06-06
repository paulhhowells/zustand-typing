import React from 'react';
import { useDataQuery } from './hooks/useDataQuery';

import { useEditState } from './useEditState';

// type Data = { x: number, y: number, name: string, index: number };
type SelectEvent = React.ChangeEvent<HTMLSelectElement>;

function App () {
	const [ queryParams, setQueryParams	] = React.useState<string | undefined>(undefined);

	const { data,
		// isLoading, error
	} = useDataQuery(queryParams);

	const editState = useEditState();

	const handleChange = (event: SelectEvent) => {
		setQueryParams(event.target.value);
	};

	return (
		<div>
			<h1>Zustand Generics: Proof of concept</h1>
			<pre>
				{
					JSON.stringify(editState.list, null, 2)
				}
			</pre>
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
		</div>
	);
}

export default App;
