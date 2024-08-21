"use client";
import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import Image from "next/image";
import Png from "@/components/png";
import Header from "@/components/header";
import Footer from "@/components/footer";
import icons from "@/data/icons";

type DayOfWeek = "sun" | "mon" | "tues" | "wed" | "thurs" | "fri" | "sat" | "";

export default function Home() {
  const [mainImage, setMainImage] = useState({
    src: "/icons/message.png",
    alt: "iMessage",
  });
  const [description, setDescription] = useState("");
  const [time, setTime] = useState({ hour: "Now", minute: "", second: "" });
  const [day, setDay] = useState<DayOfWeek>("");
  const captureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    setTime((prevTime) => ({
      ...prevTime,
      hour: hours,
      minute: minutes,
      second: seconds,
    }));
  }, []);

  function handleTimeChange(e: any) {
    const { name, value } = e.target;
    setTime((prevTime) => ({
      ...prevTime,
      [name]: value,
    }));
  }

  function getTimeDisplay() {
    const daysOfWeek: Record<DayOfWeek, string> = {
      sun: "Sun",
      mon: "Mon",
      tues: "Tues",
      wed: "Wed",
      thurs: "Thurs",
      fri: "Fri",
      sat: "Sat",
      "": "",
    };

    const dayName = daysOfWeek[day];
    const timePart = `${time.hour}:${time.minute}`;

    if (time.second) return `${time.second}s`;
    if (dayName && time.hour && time.minute) return `${dayName}, ${timePart}`;
    if (time.hour && time.minute) return `${time.hour}:${time.minute}`;
    if (time.minute) return `${time.minute}min`;
    if (time.hour) return `${time.hour}h`;
    return "Now";
  }

  function truncateText(text: string, maxLength: number) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

  const descriptionText =
    description ||
    "Yes! Noticraft is the most elegant way to share your notifications with the world";
  const truncatedDescription = truncateText(descriptionText, 120);

  const handleDownloadImage = async () => {
    if (captureRef.current) {
      const captureElement = captureRef.current;

      captureElement.style.position = "absolute";
      captureElement.style.left = "-9999px";
      captureElement.style.display = "block";

      const canvas = await html2canvas(captureElement, {
        useCORS: true,
        scale: 2,
        logging: false,
      });

      captureElement.style.display = "none";

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "noticraf-image.png";
      link.click();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-y-16 p-6 md:p-10 lg:p-24">
      <Header />
      <div className="w-full flex flex-col lg:flex-row justify-between gap-5 p-4 md:p-6 border dark:border-neutral-700/25 rounded-xl h-full">
        <aside className="w-full lg:w-1/3 p-4 md:p-6 border dark:border-neutral-700/50 rounded-xl flex-grow">
          <div className="flex flex-col gap-y-3">
            <div>
              <label className="text-sm text-neutral-300 font-semibold mb-2">
                Icon
              </label>
              <div className="bg-neutral-950/55 p-2 mt-2 border border-neutral-700/30 rounded-xl">
                <ul className="grid grid-cols-4 list-none">
                  {icons.map((i, index) => (
                    <li key={index} className="relative">
                      <Image
                        src={i.src}
                        alt={i.alt}
                        width={20}
                        height={20}
                        className="h-auto w-full object-none cursor-pointer filter grayscale opacity-30"
                        onClick={() => setMainImage({ src: i.src, alt: i.alt })}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <label className="text-sm text-neutral-300 font-semibold">
                Message
              </label>
              <textarea
                className="p-2 w-full mt-2 placeholder:text-neutral-400 text-neutral-300 bg-transparent h-20 text-sm rounded-lg resize-none focus:outline-none border border-neutral-700/40"
                placeholder="Type your message here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <label className="text-sm text-neutral-300 font-semibold">
              Time
            </label>
            <div className="flex flex-col gap-y-2 bg-neutral-950/55 p-2 border border-neutral-700/30 rounded-xl">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  name="hour"
                  placeholder="Hour"
                  value={time.hour}
                  onChange={handleTimeChange}
                  className="w-full px-2 py-1.5 placeholder:text-neutral-400 text-neutral-300 bg-transparent text-sm rounded-lg focus:outline-none border border-neutral-700/40"
                />
                <input
                  type="text"
                  name="minute"
                  placeholder="Min"
                  value={time.minute}
                  onChange={handleTimeChange}
                  className="w-full px-2 py-1.5 placeholder:text-neutral-400 text-neutral-300 bg-transparent text-sm rounded-lg focus:outline-none border border-neutral-700/40"
                />
                <input
                  type="text"
                  name="second"
                  placeholder="Sec"
                  value={time.second}
                  onChange={handleTimeChange}
                  className="w-full px-2 py-1.5 placeholder:text-neutral-400 text-neutral-300 bg-transparent text-sm rounded-lg focus:outline-none border border-neutral-700/40"
                />
              </div>
              <div>
                <select
                  className="bg-transparent p-2 w-full rounded-lg focus:outline-none border border-neutral-700/40"
                  name="day"
                  id="day-select"
                  value={day}
                  onChange={(e) => setDay(e.target.value as DayOfWeek)}
                >
                  <option className="custom-option" value="">
                    Select Day
                  </option>
                  <option className="custom-option" value="sun">
                    Sun
                  </option>
                  <option className="custom-option" value="mon">
                    Mon
                  </option>
                  <option className="custom-option" value="tues">
                    Tues
                  </option>
                  <option className="custom-option" value="wed">
                    Wed
                  </option>
                  <option className="custom-option" value="thurs">
                    Thurs
                  </option>
                  <option className="custom-option" value="fri">
                    Fri
                  </option>
                  <option className="custom-option" value="sat">
                    Sat
                  </option>
                </select>
              </div>
            </div>
          </div>
        </aside>
        <main className="relative w-full flex flex-col items-center justify-center lg:w-2/3 p-4 md:p-6 border border-neutral-700/50 rounded-xl">
          <div className="absolute top-4 right-6 w-full flex items-center justify-between">
            <span></span>
            <button
              type="submit"
              className="flex gap-2 items-center rounded-md bg-gradient-to-t px-4 py-2 text-xs bg-neutral-900"
              onClick={handleDownloadImage}
            >
              <Download />
              <span className="hidden lg:block">Export</span>
            </button>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="bg-black relative min-h-[350px] max-w-xl mx-auto p-14 flex flex-col items-center justify-center border border-neutral-700/50 rounded-3xl shadow-lg">
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
                <div>
                  <div className="flex justify-between">
                    <h1 className="text-white font-semibold">
                      {mainImage.alt}
                    </h1>
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
            <Png
              ref={captureRef}
              mainImage={mainImage}
              getTimeDisplay={getTimeDisplay}
              truncatedDescription={truncatedDescription}
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

function Download() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-download"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}
