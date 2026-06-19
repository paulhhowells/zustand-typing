import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './components/App.tsx';
import { FlagProvider } from './components/Flag';

import './index.css';

async function start () {
	const { worker } = await import('./mocks/browser');

	await worker.start();
}

const queryClient = new QueryClient();

start().then(() => {
	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<FlagProvider>
					<App />
					<ReactQueryDevtools initialIsOpen={false} />
				</FlagProvider>
			</QueryClientProvider>
		</StrictMode>,
	);
});
