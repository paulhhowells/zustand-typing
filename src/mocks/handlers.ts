import { http, HttpResponse } from 'msw';

export const handlers = [
	http.get('/api/data', ({ request }) => {
		const url = new URL(request.url);
		const query = url.searchParams.get('q');

		return HttpResponse.json({
			query,
			results: [
				{ id: 1, name: `Result 1 for "${query}"` },
				{ id: 2, name: `Result 2 for "${query}"` },
				{ id: 3, name: `Result 3 for "${query}"` },
			],
		});
	}),
];
