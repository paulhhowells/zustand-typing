import { create } from 'zustand';

type Indexed = { rowIndex: number; };

interface EditState {
	list: Array<Indexed>;
	add: (item: Indexed) => void;
}
export const useEditState = create<EditState>()(
	(set) => ({
		list: [],
		add: (item: Indexed) => set(
			(state) => {
				let list: Array<Indexed>;

				console.log('add', item.rowIndex, item);

				// if an item with the same rowIndex already exists, replace it, otherwise add it to the list
				const existingIndex = state.list.findIndex(element => element.rowIndex === item.rowIndex);

				if (existingIndex !== -1) {
					// list = [ ...state.list ];
					// list[existingIndex] = item;
					list = state.list.with(existingIndex, item);
				} else {
					// find the first element with an rowIndex greater than the new item, and insert the new item before it
					const insertIndex = state.list.findIndex((element: Indexed) => element.rowIndex > item.rowIndex);

					if (insertIndex !== -1) {
						list = state.list.toSpliced(insertIndex, 0, item);
					} else {
						list = [ ...state.list, item ];
					}
				}

				return { list };
			},
		),
	}),
);
