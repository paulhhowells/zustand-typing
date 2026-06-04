import { } from 'react';

import { useEditState } from './useEditState';

type Data = { x: number, y: number, name: string, index: number };

function App () {
  const editState = useEditState();

  return (
    <div>
      <h1>Zustand Generics: Proof of concept</h1>
      <pre>
        {
          JSON.stringify(editState.list, null, 2)
        }
      </pre>
    </div>
  );
}

export default App;
