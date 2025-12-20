import { Outlet } from "react-router";
import type { Route } from "../../.react-router/types/app/routes/+types/home";
import { Toaster } from "sonner";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "XFit" },
        { name: "description", content: "هدف با تو، مسیرت با ما !" },
    ];
}

const MobileLayout = () => {

    return (
        <div className="w-full max-w-xl mx-auto h-[100svh] overflow-hidden [direction:rtl]">
            <Outlet />
            <Toaster position={"top-center"} visibleToasts={1} richColors={true} />
        </div>
    )
}
export default MobileLayout;
