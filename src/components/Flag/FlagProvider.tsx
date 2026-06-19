import {
	useContext,
	useState,
	type ReactNode,
} from 'react';

import {
	FlagContext,
	// type FlagState,
} from './useFlagContext';

interface FlagProviderProps {
	children: ReactNode;
}
export function FlagProvider ({ children }: FlagProviderProps) {
	const [ message, setMessage ] = useState<string | undefined>(undefined);
	const value = { message, setMessage };

	return (
		<FlagContext value={value}>
			{children}
		</FlagContext>
	);
}

export function Flag () {
	const flagContext = useContext(FlagContext);

	if (!flagContext) {
		return null;
	}

	const { message, setMessage } = flagContext;

	const handleClick = () => {
		setMessage('Hello World');
	};

	return (
		<div className="flag">
			<span>Flag { message } </span>
			<button
				type="button"
				onClick={handleClick}
			>
				Set Message
			</button>
		</div>
	);
}
