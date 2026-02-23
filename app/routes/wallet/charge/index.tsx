import Navigator from "~/components/shared/Navigator";
import TextInput from "~/components/ui/TextInput";
import { useState } from "react";
import PriceOptionButton from "~/components/wallet/PriceOptionButton";
import { Button } from "~/components/ui/button";
import { useCreateDeposit } from "~/reactQuery/deposit/hooks";
import { Spinner } from "~/components/ui/spinner";
import { useNavigate } from "react-router";

const priceOptions = [1_000_000, 2_000_000, 5_000_000, 10_000_000];

const ChargeWalletPage = () => {
    const navigate = useNavigate();
    const [price, setPrice] = useState<string>("");
    const { mutateAsync: createDeposit, isPending: createDepositLoading } = useCreateDeposit()
    const handlePay = async () => {
        const res = await createDeposit({ amount: parseInt(price) });
        console.log(res)
        navigate(`/wallet/charge/receipt?status=success&amount=${price}`); //todo: get real status from response
    }
    return (
        <div className="w-full h-[100svh] bg-[#121314] p-4">
            <Navigator title={"شارژ کیف پول"} className="mb-4" />
            <div className="w-full h-[calc(100%-80px)] flex flex-col items-center justify-between">
                <div className="w-full">
                    <TextInput value={price} onChange={setPrice} label={"مبلغ"} placeholder={"مبلغ شارژ کیف پول"}
                        leftIcon={<p>تومان</p>} />

                    <div className="mt-10 w-full grid grid-cols-2 gap-4">
                        {priceOptions.map((value) => (
                            <PriceOptionButton
                                key={value}
                                value={value}
                                active={price === value.toString()}
                                onSelect={setPrice}
                            />
                        ))}

                    </div>
                </div>
                <Button onClick={() => handlePay()}
                    disabled={createDepositLoading}
                    className="w-full max-w-[300px] h-12 bg-primary-main !opacity-100 rounded-full mt-10 !flex  text-white">

                    {
                        createDepositLoading ? <Spinner /> : "پرداخت و شارژ کیف پول"
                    }
                </Button>

            </div>


        </div>
    )
}

export default ChargeWalletPage
