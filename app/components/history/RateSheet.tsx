import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "~/components/ui/sheet"
import {ChevronDown} from "react-coolicons";
import {StarIcon} from "lucide-react";
import {useState} from "react";
import {Button} from "~/components/ui/button";

type Props = {
    image: string,
    title: string,
    handleRate?: (rate: number) => void,
    open: boolean,
    handleOpenChange: (open: boolean) => void,
}
const RateSheet = ({image, title, open, handleOpenChange, handleRate}: Props) => {
    const [selectedRate, setSelectedRate] = useState<number>(0)
    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent side="bottom"
                          className="px-4 z-[150] max-w-xl mx-auto border-none bg-[#2B2B2B] flex flex-col items-center pt-2 rounded-t-3xl [&_button]:hidden [&_button]:!border-none [&_button]:!outline-none [&_button]:opacity-0 h-[652px]">
                <div className="mb-5 w-10 h-[3px] bg-text-300 rounded-full"/>
                <div className="w-full max-w-[328px] h-[263px]">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover rounded-r-[12px]"
                    />
                </div>
                <p className=" text-primary-700 font-bold text-xl">{title}</p>
                <p className="text-white">تجربه استفاده از باشگاه چطور بود؟</p>


                <div className="w-full relative flex items-center justify-between max-w-[272px] mt-10">
                    {[1, 2, 3, 4, 5].map((item) => {
                        const isActive = item <= selectedRate;

                        return (
                            <div
                                key={item}
                                onClick={() => {
                                    setSelectedRate(item);
                                }}
                                className="flex flex-col items-center gap-4 cursor-pointer relative z-[3] group"
                            >
                                <StarIcon
                                    className={`
            transition-all duration-200
            ${
                                        isActive
                                            ? "fill-secondary-main text-secondary-main"
                                            : "fill-transparent text-secondary-main"
                                    }
            group-hover:fill-secondary-main
          `}
                                />

                                <div
                                    className={`
            w-4 h-4 rounded-full border border-primary-700 transition-all duration-200
            ${
                                        isActive
                                            ? "bg-primary-700"
                                            : "bg-[#2B2B2B] group-hover:bg-primary-700"
                                    }
          `}
                                />
                            </div>
                        );
                    })}

                    <div className="w-[calc(100%-16px)] left-2 absolute h-px bg-primary-700 bottom-2 z-[2]"/>
                </div>

                <Button onClick={() => handleRate?.(selectedRate)}
                        className="w-full max-w-[300px] h-12 bg-primary-main !opacity-100 rounded-full mt-10 !flex  text-white">ثبت
                    امتیاز</Button>

            </SheetContent>
        </Sheet>
    )
}
export default RateSheet