import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const SearchInput = ({ value, onChange, placeholder = "جستجو" }: Props) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // focus when open
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [open]);

  const openSearch = () => setOpen(true);

  const closeSearch = () => {
    setOpen(false);
    onChange("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      closeSearch();
    }
  };

  return (
    <div
      className={`flex items-center gap-3 p-3 h-12 overflow-hidden rounded-full bg-[#202020]
        transition-[width] duration-300 ease-out
        ${open ? "w-[268px]" : "w-12"}
      `}
    >
      <button
        type="button"
        onClick={openSearch}
        className="flex h-12 w-12 items-center justify-center text-white"
        aria-label="باز کردن جستجو"
      >
        <Search className="h-6 w-6" />
      </button>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => value === "" && setOpen(false)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="h-12 w-full bg-transparent text-white outline-none placeholder:text-white/50"
      />
    </div>
  );
};

export default SearchInput;
