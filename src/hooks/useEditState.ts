import { create } from 'zustand';

type Indexed = { index: number; };

interface EditState {
	list: Array<Indexed>;
	add: (item: Indexed) => void;
}
export const useEditState = create<EditState>()(
// export const useEditState = <T extends Indexed>() => create<EditState<T>>(
	(set) => ({
		list: [],
		add: (item: Indexed) => set(
			(state) => {
				let list: Array<Indexed>;

				console.log('add', item.index, item);

				// if an item with the same index already exists, replace it, otherwise add it to the list
				const existingIndex = state.list.findIndex(element => element.index === item.index);

				if (existingIndex !== -1) {
					list = [ ...state.list ];
					list[existingIndex] = item;
				} else {
					// find the first element with an index greater than the new item, and insert the new item before it
					const insertIndex = state.list.findIndex((element: Indexed) => element.index > item.index);

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
