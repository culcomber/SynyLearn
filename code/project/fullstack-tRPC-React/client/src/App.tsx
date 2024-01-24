import * as React from 'react';

import { trpc } from './trpc';

const App = () => {
    const { data, isLoading } = trpc.user.getUserById.useQuery('0');

    if (isLoading) return <div>Loading ...</div>;

    return <div>{data?.name}</div>;
};

export default App;