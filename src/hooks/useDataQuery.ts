import { useQuery } from '@tanstack/react-query';

type Result = { id: number; name: string; edit?: string; edits?: Array<string>; };

interface ApiResponse {
	query: string | null;
	results: Array<Result>;
}

export type Row = Result & { rowIndex: number; };
export type RowData = Array<Row>;

interface DataResponse {
	query: ApiResponse['query'];
	results: RowData;
};

async function fetchData (queryParams: string): Promise<DataResponse> {
	const url = queryParams
		? `/api/data?q=${encodeURIComponent(queryParams)}`
		: '';

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const { query, results } = await response.json() as ApiResponse;

	const data = {
		query,
		results: results.map((result, index) => ({
			...result,
			rowIndex: index,
		})),
	};

	return data;
}

export function useDataQuery (queryParams?: string) {
	return useQuery({
		queryKey: [ 'data', queryParams ],
		queryFn: () => fetchData(queryParams!),
		enabled: !!queryParams,
	});
}
