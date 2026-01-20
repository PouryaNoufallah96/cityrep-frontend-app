import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [

    layout("./layouts/mobileLayout.tsx", [

        layout("./layouts/guard/auth.tsx", [

            layout("./layouts/appLayout.tsx", [
                index("routes/home.tsx"),
                route('qr', "routes/qr/index.tsx"),
                route('history', "routes/history/index.tsx"),
                route('profile', 'routes/profile/index.tsx'),
                route('wallet', 'routes/wallet/index.tsx')
            ]),

            ...prefix("gyms/:gym_id", [
                route('', 'routes/gyms/[gym_id]/index.tsx'),
                route('reserve', 'routes/gyms/[gym_id]/reserve/index.tsx'),
            ]),

            ...prefix("wallet/charge", [
                route('', 'routes/wallet/charge/index.tsx'),
                route('receipt', 'routes/wallet/charge/receipt/index.tsx'),
            ])
        ]),

        ...prefix("auth", [
            layout("./layouts/guard/guest.tsx", [
                index("routes/auth/index.tsx"),
            ])
        ]),

    ]),

] satisfies RouteConfig;
