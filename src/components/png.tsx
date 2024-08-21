import React, { forwardRef } from "react";
import Image from "next/image";

type CaptureAreaProps = {
  mainImage: {
    src: string;
    alt: string;
  };
  getTimeDisplay: () => string;
  truncatedDescription: string;
};

const CaptureArea = forwardRef<HTMLDivElement, CaptureAreaProps>(
  ({ mainImage, getTimeDisplay, truncatedDescription }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute left-[-9999px] top-0 hidden bg-black"
        style={{ position: "absolute" }}
      >
        <div className="flex bg-black relative min-h-[350px] max-w-xl mx-auto p-14 flex-col items-center justify-center border border-neutral-700/50 rounded-3xl shadow-lg">
          <div
            className="absolute h-full w-full"
            style={{
              backgroundImage: "url('/bg.png')",
              backgroundPosition: "center",
              maskImage:
                "radial-gradient(ellipse 50% 50% at 50% 50%, #000 50%, transparent 100%)",
            }}
          ></div>
          <div className="relative z-10 bg-transparent p-4 border border-neutral-700/50 rounded-3xl shadow-lg w-[385px] flex flex-row items-center justify-center gap-3 max-w-md bg-gradient-to-b to-neutral-950 from-neutral-900/95">
            <div className="rounded-xl bg-transparent border-none">
              <Image
                src={mainImage.src}
                width={48}
                height={50}
                alt={mainImage.alt}
                className="h-auto w-full object-none"
              />
            </div>
            <div className="-mt-[18px]">
              <div className="flex justify-between">
                <h1 className="text-white font-semibold">{mainImage.alt}</h1>
                <span className="text-neutral-400/70 text-sm">
                  {getTimeDisplay()}
                </span>
              </div>
              <p className="text-neutral-300 tracking-normal text-[14.8px] break-words w-[calc(29ch)]">
                {truncatedDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default CaptureArea;
