import { Check } from "lucide-react";

type TrendButtonProps = {
  title: string;
  price: number;
  icon?: string;
  selected: boolean;
  onClick: () => void;
};

const TrendButton = ({
  title,
  price,
  icon,
  selected,
  onClick,
}: TrendButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full border border-[#A0A0A0] rounded-[12px] p-3 flex justify-between items-center"
    >
      <div className="flex gap-4">
        <div className="w-14 h-14 bg-primary-700/8 rounded-[8px] flex items-center justify-center">
          <img
            src={icon || "/images/mock/defaultTrendPurple.png"}
            alt={title}
            className="w-6 h-6"
          />
        </div>

        <div className="flex flex-col items-start gap-1">
          <div className="text-primary-700">{title}</div>
          <div className="text-white text-sm">
           از {price.toLocaleString("fa-IR")} تومان
          </div>
        </div>
      </div>

      <div
        className={`border ${
          selected
            ? "bg-primary-700 border-primary-700"
            : "border-[#A0A0A0]"
        } w-5 h-5 rounded-full flex items-center justify-center`}
      >
        {selected && <Check className="w-3 h-3" />}
      </div>
    </button>
  );
};


export default TrendButton;