import { ArrowDown } from "lucide-react";

type Props = {
    date: string;
    time: string;
    title: string;
    amount: string;
    type?: "in" | "out";
};

const TransactionCard = ({
                             date,
                             time,
                             title,
                             amount,
                             type = "out",
                         }: Props) => {
    return (
        <div className="w-full bg-[#121314] rounded-[12px] p-4 flex flex-col gap-2">
            <p className="text-gray-400 text-sm">
                {date} | {time}
            </p>

            <div className="w-full rounded-[12px] flex items-center justify-between">
                <div className="flex text-white items-center h-8">
                    <div
                        className={`
              w-8 h-8 ml-2 rounded-full flex items-center justify-center
              ${type === "out" ? "bg-primary-700" : "bg-[#105A2B] text-[#B1FF68]"}
            `}
                    >
                        <ArrowDown
                            className={type === "in" ? "rotate-180" : ""}
                            size={16}
                        />
                    </div>

                    <p className="text-sm">{title}</p>
                </div>

                <p
                    className={`
            text-sm font-medium
            ${type === "out" ? "text-[#E2DAFF]" : "text-[#D5FFAD]"}
          `}
                >
                    {amount} تومان
                </p>
            </div>
        </div>
    );
};

export default TransactionCard;
