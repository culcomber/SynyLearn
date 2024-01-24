import { createTRPCReact, httpBatchLink } from '@trpc/react-query';

import type { AppRouter } from '../../server/src';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: 'http://localhost:4000/trpc',
        }),
    ],
});