import { TokenCardBg } from "~/components/shared/svg/TokenCardBg";
import { CardTopLine } from "~/components/shared/svg/cardTopLine";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";


type TokenCardProps = {
    tokenName: string;
    tokenIcon: string;
    leftComponent?: React.ReactNode;
    rightComponent?: React.ReactNode;
}
const TokenCard = ({
    tokenName,
    tokenIcon,
    leftComponent,
    rightComponent
}: TokenCardProps) => {
    return (
        <div className="relative h-[145px] w-full flex items-center justify-center">
            <div className="absolute z-[1] w-full flex flex-col items-center justify-center">
                <CardTopLine className="-mb-5" />
                <TokenCardBg />
            </div>
            <div className="relative z-10 grid grid-cols-3 w-full px-5 pt-10 text-primary-300">
                {leftComponent}
                <div className="flex flex-col items-center justify-center -translate-y-4">
                    <div
                        className=" flex items-center justify-center w-16 h-16 rounded-full bg-[#0C0C0B] shadow-[0px_0px_8px_0px_#FFC65E]">
                        <img className="w-[34px] h-[34px]" src={tokenIcon} alt={tokenName} />
                    </div>
                    <p className="text-white mt-2 font-bold">{tokenName}</p>

                </div>
                {rightComponent}
            </div>

        </div>
    )
}
export default TokenCard