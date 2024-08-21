import Image from "next/image";
export default function header() {
  return (
    <header className="flex flex-col items-center justify-center gap-5">
      <Image src="/noticraft.png" alt="Logo" height={50} width={50} className="opacity-15 select-none" />
      <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-b from-neutral-100 to-neutral-700 text-transparent bg-clip-text select-none">
        Noticraft
      </h1>
      <p className="text-neutral-400 my-5 text-lg text-center">
        The most elegant way to share your notifications with the world
      </p>
    </header>
  );
}
