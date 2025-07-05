"use client";

import Link from "next/link";
import { Check, Crown, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";// Import directly for server-side fallback

type Props = {
    id: number;
    index: number;
    totalCount: number;
    locked?: boolean;
    current?: boolean;
    percentage: number;
};

// Dynamically import CircularProgress for client-side rendering to avoid SSR issues.
const DynamicCircularProgress = dynamic(() => import('@mui/material/CircularProgress'), {
    ssr: false,
});

export const LessonButton = ({
    id,
    index,
    totalCount,
    locked,
    current,
    percentage
}: Props) => {
    // --- All your existing logic for positioning and state is preserved ---
    const cycleLength = 8;
    const cycleIndex = index % cycleLength;

    let indentationLevel;
    if (cycleIndex <= 2) {
        indentationLevel = cycleIndex;
    } else if (cycleIndex <= 4) {
        indentationLevel = 4 - cycleIndex;
    } else if (cycleIndex <= 6) {
        indentationLevel = 4 - cycleIndex;
    } else {
        indentationLevel = cycleIndex - 8;
    }

    const rightPosition = indentationLevel * 40;
    const isFirst = index === 0;
    const isLast = index === totalCount;
    const isFullyCompleted = percentage === 100 && !current;
    const isCompleted = locked ? false : isFullyCompleted;
    const Icon = isCompleted ? Check : (isLast ? Crown : Star);
    const href = isCompleted ? `/lesson/${id}` : "/lesson";

    // This state is still useful to ensure client-side-only components render correctly.
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <Link
            href={href}
            aria-disabled={locked}
            style={{ pointerEvents: locked ? "none" : "auto" }}
            className="focus:outline-none"
        >
            <div
                className="relative" // Parent container for positioning
                style={{
                    right: `${rightPosition}px`,
                    marginTop: isFirst && !isCompleted ? 60 : 24,
                }}
            >
                {/* "START" bubble - absolutely positioned relative to the parent */}
                {current && (
                    <div className="absolute -top-[25px] left-2.5 w-auto whitespace-nowrap">
                        <div className="relative px-4 py-2.5 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-bounce tracking-wide z-10">
                            Start
                            <div
                                className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2"
                                
                            />
                        </div>
                    </div>
                )}

                {/* Main circular button and progress container */}
                <div className="relative w-[90px] h-[90px] flex items-center justify-center">
                    {/* Render progress rings ONLY if current and on the client */}
                    {isClient && current ? (
                        <>
                            {/* Background Track: The faint, full circle */}
                            <DynamicCircularProgress
                                variant="determinate"
                                value={100}
                                size={90}
                                thickness={4}
                                sx={{
                                    color: '#E5E7EB', // Tailwind's gray-200
                                    position: 'absolute',
                                }}
                            />
                            {/* Foreground Progress: The actual progress indicator */}
                            <DynamicCircularProgress
                                variant="determinate"
                                value={Number.isNaN(percentage) ? 0 : percentage}
                                size={90}
                                thickness={4}
                                sx={{
                                    color: '#4ADE80', // Tailwind's green-400
                                    position: 'absolute',
                                    '& .MuiCircularProgress-circle': {
                                        strokeLinecap: 'round',
                                    },
                                }}
                            />
                        </>
                    ) : (
                    // Default fallback or "Something" for server rendering or non-current state
                    <div>

                       

                    </div>

                   ) 
                  }

                    {/* The core button - always rendered */}
                    <Button
                        size="rounded"
                        variant={locked ? "locked" : "default"}
                        className={cn(
                            "h-[70px] w-[70px] border-b-8",
                            isCompleted && "bg-emerald-500 hover:bg-emerald-600 border-emerald-700",
                            current && "bg-green-500 hover:bg-green-600 border-green-700",
                            !isCompleted && !current && "bg-gray-200 border-gray-300 text-gray-400"
                        )}
                    >
                        <Icon
                            className={cn(
                                "h-10 w-10",
                                locked ? "fill-neutral-400 text-neutral-400 stroke-neutral-400" : "fill-white text-white",
                                isCompleted && "stroke-white stroke-[4]"
                            )}
                        />
                    </Button>
                </div>
            </div>
        </Link>
    );
};
