import Logo from "~/components/shared/Logo";

export default function SplashScreen() {
    return (
        <div className="w-screen h-screen max-w-xl pt-[272px] overflow-hidden relative mx-auto">
            <img className="z-[5] object-cover absolute top-0 left-0 w-full h-full" src="/images/splash.jpg" alt="CityRep"/>
        </div>
    );
}