import { useTranslation } from "react-i18next";
import { Filter } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import type { Gender, GymLevel } from "~/types";

type HomeFilterSheetProps = {
    selectedGenders: Gender[];
    setSelectedGenders: React.Dispatch<React.SetStateAction<Gender[]>>;
    selectedLevels: GymLevel[];
    setSelectedLevels: React.Dispatch<React.SetStateAction<GymLevel[]>>;
};

export const HomeFilterSheet = ({
    selectedGenders,
    setSelectedGenders,
    selectedLevels,
    setSelectedLevels
}: HomeFilterSheetProps) => {
    const { t } = useTranslation();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="cursor-pointer bg-[#202020] text-white rounded-full w-12 h-12 flex items-center justify-center relative">
                    <Filter />
                    {(selectedGenders.length > 0 || selectedLevels.length > 0) && (
                        <span className="absolute top-0 right-0 w-3 h-3 bg-primary-main rounded-full border-2 border-[#121314]"></span>
                    )}
                </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="pb-6 z-[100] max-w-xl min-h-[500px] mx-auto bg-[#1a1a1a] border-t border-white/10 rounded-t-[24px]">
                <SheetHeader className="pb-4 border-b border-white/10">
                    <SheetTitle className="text-white text-right">فیلترها</SheetTitle>
                </SheetHeader>

                <div className="py-6 flex flex-col gap-6 px-4">
                    {/* Gender Filter */}
                    <div className="flex flex-col gap-3">
                        <p className="text-white font-medium text-sm text-right">جنسیت</p>
                        <div className="flex gap-3 flex-wrap justify-end">
                            {(["Male", "Female"] as Gender[]).map((gender) => {
                                const isActive = selectedGenders.includes(gender);
                                return (
                                    <button
                                        key={gender}
                                        onClick={() => setSelectedGenders(prev =>
                                            isActive ? prev.filter(g => g !== gender) : [...prev, gender]
                                        )}
                                        className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive ? "bg-primary-main text-black" : "bg-[#2B2B2B] text-white"
                                            }`}
                                    >
                                        {t("gym.gender." + gender)}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Level Filter */}
                    <div className="flex flex-col gap-3">
                        <p className="text-white font-medium text-sm text-right">سطح باشگاه</p>
                        <div className="flex gap-3 flex-wrap justify-end">
                            {(["Basic", "Intermediate", "Advanced", "Professional"] as GymLevel[]).map((level) => {
                                const isActive = selectedLevels.includes(level);
                                return (
                                    <button
                                        key={level}
                                        onClick={() => setSelectedLevels(prev =>
                                            isActive ? prev.filter(l => l !== level) : [...prev, level]
                                        )}
                                        className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive ? "bg-primary-main text-white" : "bg-[#2B2B2B] text-white"
                                            }`}
                                    >
                                        {t("gym.level." + level)}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <SheetFooter className="flex-row gap-3 pt-4 grid grid-cols-2">
                    <Button
                        variant="outline"
                        className="w-full rounded-full border-white/20 text-white bg-transparent"
                        onClick={() => {
                            setSelectedGenders([])
                            setSelectedLevels([])
                        }}
                    >
                        حذف فیلترها
                    </Button>
                    <SheetClose asChild>
                        <Button className="w-full rounded-full bg-primary-main text-white hover:bg-primary-main/90 font-bold">
                            اعمال
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};
