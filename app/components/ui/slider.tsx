import * as React from "react"

import {cn} from "~/lib/utils"

type SliderProps = Omit<
    React.ComponentProps<"input">,
    "defaultValue" | "max" | "min" | "onChange" | "step" | "type" | "value"
> & {
    value: number
    onValueChange: (value: number) => void
    min?: number
    max?: number
    step?: number
}

function Slider({
    className,
    value,
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    ...props
}: SliderProps) {
    const stepCount = Math.max(0, Math.floor((max - min) / step))
    const steps = Array.from(
        {length: stepCount},
        (_, index) => min + step * (index + 1),
    )
    const trackInsetPercent = stepCount > 0 ? 50 / stepCount : 0
    const centerGapPercent = stepCount > 0 ? 100 / stepCount : 0
    const activeStepIndex = value > min ? (value - min) / step : 0
    const activeWidthPercent =
        activeStepIndex > 1 ? (activeStepIndex - 1) * centerGapPercent : 0

    return (
        <div data-slot="slider" className={cn("relative h-4", className)}>
            <div
                data-slot="slider-track"
                className="absolute top-1/2 h-px -translate-y-1/2 bg-primary-700/35"
                style={{
                    left: `${trackInsetPercent}%`,
                    right: `${trackInsetPercent}%`,
                }}
            />
            {activeWidthPercent > 0 && (
                <div
                    data-slot="slider-track-active"
                    className="absolute top-1/2 h-px -translate-y-1/2 bg-primary-700"
                    style={{
                        left: `${trackInsetPercent}%`,
                        width: `${activeWidthPercent}%`,
                    }}
                />
            )}
            <div
                data-slot="slider-steps"
                className="absolute inset-0 z-1 grid"
                style={{
                    gridTemplateColumns: `repeat(${stepCount}, minmax(0, 1fr))`,
                }}
            >
                {steps.map((item) => (
                    <div key={item} className="flex items-center justify-center">
                        <div
                            data-slot="slider-step"
                            className={cn(
                                "size-3.5 rounded-full border border-primary-700 bg-card",
                                item <= value && "bg-primary-700",
                            )}
                        />
                    </div>
                ))}
            </div>
            <input
                data-slot="slider-input"
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(event) => onValueChange(Number(event.target.value))}
                className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 outline-none"
                {...props}
            />
        </div>
    )
}

export {Slider, type SliderProps}
