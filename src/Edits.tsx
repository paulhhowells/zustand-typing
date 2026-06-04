import { } from 'react';

import { useEditState } from './useEditState';

type Data = { x: number, y: number, name: string, index: number };

function EditView() {
  const editState = useEditState();

  return (
    <section>
      <h1>Edit View</h1>
      <pre>
        {
          JSON.stringify(editState.list, null, 2)
        }
      </pre>
    </section>
  );
}

export default EditView;
