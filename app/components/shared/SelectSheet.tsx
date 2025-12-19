import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "~/components/ui/sheet"
import { ChevronDown } from "react-coolicons";

type Props = {
    value?: string | number | null;
    onChange: (value?: string | number | null) => void;
    options: {
        label: string,
        value: string | number,
        note?: string;
    }[],
    title: string;
    handleOpenChange?: (open: boolean) => void;
    open: boolean;
    error?: string;
}
const SelectSheet = ({ value, title, onChange, options, open, handleOpenChange, error }: Props) => {
    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent side="bottom"
                className="max-w-xl mx-auto border-none bg-[#2B2B2B] flex flex-col items-center pt-2 rounded-t-3xl [&_button]:hidden [&_button]:!border-none [&_button]:!outline-none [&_button]:opacity-0 h-[612px]">
                <div className="mb-5 w-10 h-[3px] bg-text-300 rounded-full" />
                <p className="font-medium mb-8 text-white">{title}</p>
                <div className="w-full h-[calc(100%-115px)] overflow-auto text-white">
                    {options.map((opt, i) => (
                        <div
                            className={`h-14 w-full [direction:rtl] px-6 relative flex flex-row items-center cursor-pointer hover:bg-[#121314] ${value === opt.value ? "bg-[#121314]" : ""}`}
                            key={i} onClick={() => onChange(opt.value)}>
                           <div className={`w-5 h-5 rounded-full  ${value===opt.value?"border-[6px] border-primary-main":"border-[1.2px] border-gray-200"}`}/>
                            <div className="flex items-center mr-4 justify-between">
                                <p>{opt.label}</p>
                                {opt.note && <p className="text-text-300">{opt.note}</p>}
                            </div>

                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}
export default SelectSheet