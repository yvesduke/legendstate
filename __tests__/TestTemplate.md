```ts
// jest.mock('../../util/NameManager', () => {
//   const React2 = require('react');

//   const FakeContext = React2.createContext();

//   // eslint-disable-next-line
//   const fakeUsePlayerVote = () => React2.useContext(FakeContext);

//   const FakePlayerVoteProvider = ({children, value = {}}:{children:ReactNode, value:Object}) => {
//     return (
//       <FakeContext.Provider value={value}>{children}</FakeContext.Provider>
//     );
//   };

//   return {
//     usePlayerVote: fakeUsePlayerVote,
//     NameProvider: FakePlayerVoteProvider,
//   };
// });
```

`https://jestjs.io/docs/configuration#coveragedirectory-string`
