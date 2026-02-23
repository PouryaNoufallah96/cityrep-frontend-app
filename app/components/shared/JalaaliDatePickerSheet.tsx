import { useState, useEffect, useRef } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import moment from "moment-jalaali";

type Props = {
    open: boolean;
    onClose: () => void;
    value: string; // "YYYY-MM-DD" in gregorian or jalaali? We will output gregorian from moment, or keep it Jalaali? The backend might expect Gregorian. Let's output Gregorian, but display Jalaali.
    onChange: (date: string) => void;
    title?: string;
};

const MONTHS = [
    "فروردین", "اردیبهشت", "خرداد",
    "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر",
    "دی", "بهمن", "اسفند"
];

const CURRENT_JYEAR = moment().jYear();
const YEARS = Array.from({ length: 100 }, (_, i) => CURRENT_JYEAR - i);

export default function JalaaliDatePickerSheet({ open, onClose, value, onChange, title = "انتخاب تاریخ" }: Props) {
    const [jYear, setJYear] = useState<number>(CURRENT_JYEAR - 20);
    const [jMonth, setJMonth] = useState<number>(1); // 1 to 12
    const [jDay, setJDay] = useState<number>(1); // 1 to 31

    useEffect(() => {
        if (value && open) {
            let m = moment(value, "YYYY-MM-DD", true);
            if (!m.isValid()) {
                m = moment(value, "jYYYY/jMM/jDD", true);
            }
            if (m.isValid()) {
                setJYear(m.jYear());
                setJMonth(m.jMonth() + 1);
                setJDay(m.jDate());
            }
        }
    }, [value, open]);

    const getDaysInMonth = (year: number, month: number) => {
        return moment.jDaysInMonth(year, month - 1);
    };

    const daysCount = getDaysInMonth(jYear, jMonth);
    const DAYS = Array.from({ length: daysCount }, (_, i) => i + 1);

    // Adjust day if month changes and previously selected day is a 31st but new month has 30 days
    useEffect(() => {
        if (jDay > daysCount) {
            setJDay(daysCount);
        }
    }, [jYear, jMonth, daysCount, jDay]);

    const handleConfirm = () => {
        const m = moment(`${jYear}/${jMonth}/${jDay}`, "jYYYY/jM/jD");
        onChange(m.format("YYYY-MM-DD"));
        onClose();
    };

    return (
        <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <SheetContent side="bottom" className="pb-6 z-[100] max-w-xl mx-auto bg-[#1a1a1a] border-t border-white/10 rounded-t-[24px]">
                <SheetHeader className="pb-4 border-b border-white/10">
                    <SheetTitle className="text-white text-center">{title}</SheetTitle>
                </SheetHeader>

                <div className="py-6 flex justify-between items-center px-4 h-[250px] relative">
                    {/* Highlight Box representing selection (center) */}
                    <div className="absolute top-1/2 left-0 right-0 h-12 bg-white/5 border-y border-primary-main/20 -translate-y-1/2 pointer-events-none rounded-lg mx-4" />

                    <ScrollColumn
                        items={YEARS}
                        selectedValue={jYear}
                        onSelect={setJYear}
                        labelExtractor={(v) => v.toString()}
                        className="w-1/3"
                    />
                    <ScrollColumn
                        items={Array.from({ length: 12 }, (_, i) => i + 1)}
                        selectedValue={jMonth}
                        onSelect={setJMonth}
                        labelExtractor={(v: number) => MONTHS[v - 1]}
                        className="w-1/3"
                    />
                    <ScrollColumn
                        items={DAYS}
                        selectedValue={jDay}
                        onSelect={setJDay}
                        labelExtractor={(v) => v.toString()}
                        className="w-1/3"
                    />
                </div>

                <SheetFooter className="px-4 pt-4">
                    <Button
                        onClick={handleConfirm}
                        className="w-full rounded-full bg-primary-main text-white hover:bg-primary-main/90 font-bold h-12"
                    >
                        تایید
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

// ScrollColumn Helper Component
type ScrollColumnProps<T> = {
    items: T[];
    selectedValue: T;
    onSelect: (val: T) => void;
    labelExtractor: (val: T) => string;
    className?: string;
};

function ScrollColumn<T>({ items, selectedValue, onSelect, labelExtractor, className = "" }: ScrollColumnProps<T>) {
    const listRef = useRef<HTMLDivElement>(null);
    const isUserScrolling = useRef(false);
    const scrollTimeout = useRef<any>(null);

    // Scroll snapping calculation
    useEffect(() => {
        if (!listRef.current || isUserScrolling.current) return;
        const index = items.indexOf(selectedValue);
        if (index !== -1) {
            // center the selected item
            const itemHeight = 48; // h-12
            // Small timeout to allow the sheet to mount its DOM elements fully before scrolling
            setTimeout(() => {
                if (listRef.current && !isUserScrolling.current) {
                    listRef.current.scrollTo({ top: index * itemHeight, behavior: "smooth" });
                }
            }, 100);

        }
    }, [selectedValue, items]);

    return (
        <div
            ref={listRef}
            className={`h-full overflow-y-auto scroll-smooth snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ${className}`}
            onScroll={(e) => {
                isUserScrolling.current = true;
                const target = e.target as HTMLDivElement;

                clearTimeout(scrollTimeout.current);
                scrollTimeout.current = setTimeout(() => {
                    isUserScrolling.current = false;
                    const index = Math.round(target.scrollTop / 48);
                    if (items[index] && items[index] !== selectedValue) {
                        onSelect(items[index]);
                    }
                }, 150);
            }}
        >
            {/* Empty space to allow first and last items to reach the center */}
            <div className="h-[calc(50%-24px)]" />
            {items.map((item, index) => {
                const isSelected = item === selectedValue;
                return (
                    <div
                        key={index}
                        className={`h-12 flex items-center justify-center snap-center cursor-pointer transition-all ${isSelected ? "text-primary-main font-bold text-lg" : "text-white/50 text-base"}`}
                        onClick={() => onSelect(item)}
                    >
                        {labelExtractor(item)}
                    </div>
                );
            })}
            <div className="h-[calc(50%-24px)]" />
        </div>
    );
}
