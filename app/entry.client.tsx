import { startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";

startTransition(() => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 30 * 1000,
                refetchOnMount: true,
                refetchOnWindowFocus: true,
            },
            mutations: {
                retry: 0,
            },
        },
    });
    if (typeof window !== "undefined") {
        const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];

        if (navEntries.length && navEntries[0].type === "reload") {
            sessionStorage.removeItem(import.meta.env.VITE_TOKEN_KEY);
        }
    }

    hydrateRoot(
        document,
        <QueryClientProvider client={queryClient}>
            <HydratedRouter />
            <ReactQueryDevtools />
        </QueryClientProvider>
        ,
    );
});
