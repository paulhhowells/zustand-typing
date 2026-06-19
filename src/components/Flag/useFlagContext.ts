import {
	createContext,
	useContext,
} from 'react';

export interface FlagState {
	message?: string;
	setMessage: (message: string) => void;
}

export const FlagContext = createContext<FlagState | null>(null);

export function useFlagContext () {
	const flagContext = useContext(FlagContext);

	if (!flagContext) {
		throw new Error('useFlagContext must be used within a FlagProvider');
	}

	return flagContext;
}
