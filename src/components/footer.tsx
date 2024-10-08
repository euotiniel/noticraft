"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { calculateTimeElapsed } from "@/lib/time";

export default function Footer() {
  const [timeElapsed, setTimeElapsed] = useState("");
  const [timeUnit, setTimeUnit] = useState("");

  useEffect(() => {
    const storedStartTime = sessionStorage.getItem("startTime");
    const currentTime = new Date().getTime();

    const startTime = storedStartTime
      ? parseInt(storedStartTime, 10)
      : currentTime;
    if (!storedStartTime) {
      sessionStorage.setItem("startTime", currentTime.toString());
    }

    const updateTime = () => {
      const elapsedTime = calculateTimeElapsed(startTime);
      const newTimeUnit = getTimeUnit(elapsedTime);
      setTimeElapsed(elapsedTime);
      setTimeUnit(newTimeUnit);
    };

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTimeUnit = (elapsedTime: any) => {
    const [unit] = elapsedTime.split(" ");
    return unit;
  };

  return (
    <footer className="w-full flex flex-col md:flex-row items-center justify-between text-neutral-600 dark:text-neutral-400">
      <div>
        <p className="text-[13.5px] font-normal leading-none text-center">
          2024 &copy;{" "}
          <Link
            href="https://twitter.com/euotiniel"
            className="font-medium underline underline-offset-4"
          >
            euotiniel
          </Link>{" "}
          . The source code is available on{" "}
          <Link
            href={"https://github.com/euotiniel/noticraft"}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
        </p>
      </div>
      <div className="mt-4 flex items-center text-center">
        <div className="mr-2 h-2 w-2 rounded-full bg-green-300 dark:bg-green-800 animate-pulse"></div>
        <div>
          <motion.p className="text-[13.5px]">
            It's been on for{" "}
            <motion.span
              key={timeElapsed}
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.4 }}
            >
              {timeElapsed}
            </motion.span>
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
