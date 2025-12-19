import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [

    layout("./layouts/mobileLayout.tsx", [

        layout("./layouts/guard/auth.tsx", [

            layout("./layouts/appLayout.tsx", [
                index("routes/home.tsx"),
                route('qr', "routes/qr/index.tsx"),
                // route('settings', 'routes/settings/index.tsx')
            ]),

            ...prefix("gyms/:gym_id", [
                route('', 'routes/gyms/[gym_id]/index.tsx'),
            ])
        ]),

        ...prefix("auth", [
            layout("./layouts/guard/guest.tsx", [
                index("routes/auth/index.tsx"),
            ])
        ]),

    ]),

] satisfies RouteConfig;
