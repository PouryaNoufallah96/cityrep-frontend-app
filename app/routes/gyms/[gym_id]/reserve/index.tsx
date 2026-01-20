import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

type reserveGymSteps = "trend" | "dateTime" | "checkout" | "result";
const ReserveGym = () => {
        const { t } = useTranslation();
    
    const steps:{name: reserveGymSteps, title:string, component: ReactNode}[] = [{
        name:"trend",
        title:t("gym.reserve.steps.trend"),
        component:<div>trend</div>
    },{
        name:"dateTime",
        title:t("gym.reserve.steps.dateTime"),
        component:<div>date time</div>
    },{
        name:"checkout",
        title:t("gym.reserve.steps.checkout"),
        component:<div>checkout</div>   
    },{
        name:"result",
        title:t("gym.reserve.steps.result"),
        component:<div>result</div>
    }];
    const { gym_id } = useParams<{ gym_id: string }>();
    const [step,setStep] = useState<reserveGymSteps>("trend");

    return (    
        <div>
            {steps.find(s=>s.name===step)?.component}
        </div> 

    )   
};
export default ReserveGym;