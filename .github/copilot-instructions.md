
## React 19
- Use the new React 19 JSX transform. Do not import React from 'react' in files that only use JSX.

## Use React 19 context provider syntax for application contexts.

- When rendering a React context provider created with `createContext`, render the context object directly, for example `<FlagContext value={value}>`, instead of `<FlagContext.Provider value={value}>`.
- Do not introduce `.Provider` for app-owned React context objects unless the codebase is explicitly targeting a React version that requires it.
- Do not rewrite or avoid third-party components whose public API names happen to end with `Provider`, such as `QueryClientProvider` or `AgGridProvider`.
