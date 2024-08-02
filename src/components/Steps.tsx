"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    name: "Step 1 : Add image",
    description: "Choose an image for your case",
    url: "/upload",
  },
  {
    name: "Step 2 : Customize design",
    description: "Make the case yours",
    url: "/design",
  },
  {
    name: "Step 3 : Summary",
    description: "Review your final design",
    url: "/preview",
  },
];
const Steps = () => {
  const pathname = usePathname();
  return (
    <ol
      className="rounded-md bg-white lg:flex lg:border-none lg:border-r 
    lg:border-l lg:border-gray-200"
    >
      {STEPS.map((step, i) => {
        const isCurrent = pathname.endsWith(step.url);
        const isCompleted = STEPS.slice(i + 1).some((step) =>
          pathname.endsWith(step.url)
        );
        const imgPth = `/snake-${i + 1}.png`;
        return (
          <li key={i} className="relative overflow-hidden lg:flex-1">
            <div>
              <span
                className={cn(
                  `absolute left-0 top-0 h-full w-1 bg-zinc-400
              lg:bottom-0 lg:top-auto lg:h-1 lg:w-full`,
                  {
                    "bg-zinc-700": isCurrent,
                    "bg-primary": isCompleted,
                  }
                )}
                aria-hidden="true"
              />

              <span
                className={cn(
                  i !== 0 ? "lg:pl-9" : "",
                  "flex items-center px-6 py-4 text-sm font-medium"
                )}
              >
                <span className="flex-shrink-0">
                  <img
                    src={imgPth}
                    className={cn(
                      "flex h-20 w-20 object-contain items-center justify-center",
                      {
                        "border-none": isCompleted,
                        "border-x-zinc-700": isCurrent,
                      }
                    )}
                  />
                </span>
                <span className="ml-4 h-full mt-0.5 flex flex-col justify-center min-w-0">
                  <span
                    className={cn(`text-sm text-zinc-700 font-semibold`, {
                      "text-primary": isCompleted,
                      "text-zinc-700": isCurrent,
                    })}
                  >
                    {step.name}
                  </span>
                  <span className="text-sm text-zinc-500">
                    {step.description}
                  </span>
                </span>
              </span>

              {/* separator */}
              {/* {i ! == 0 ? <div className="absolute inset-0 hidden lg:block w-3 border-l-2">
                
              </div> : null} */}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default Steps;
