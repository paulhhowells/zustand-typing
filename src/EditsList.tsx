import { useEditState } from './hooks/useEditState';

interface Props {
	onEdit: (index: number) => void;
	disableButtons?: boolean;
	className?: string;
}

export function EditsList ({
	disableButtons,
	onEdit,
	className,
}: Props) {
	const editList = useEditState(state=>state.list);

	return (
		<div className={className}>
			<h2>Edits</h2>
			<div>
				<button type="button" onClick={() => onEdit(0)} disabled={disableButtons}>Add 0</button>
				<button type="button" onClick={() => onEdit(1)} disabled={disableButtons}>Add 1</button>
				<button type="button" onClick={() => onEdit(2)} disabled={disableButtons}>Add 2</button>
			</div>
			<ul>
				{
					editList.map((item) => (
						<li key={item.index}>{ JSON.stringify(item) }</li>
					))
				}
			</ul>
		</div>
	);
}
