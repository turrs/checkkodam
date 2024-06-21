import Image from "next/image";
import TextInput from "./TextInput";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-night-sky-top to-night-sky-bottom">
      <div className="relative z-10 flex flex-col items-center justify-between w-full max-w-5xl p-8 mx-auto">
        <TextInput />

        <div className="absolute inset-0 z-0 pointer-events-none"></div>

        <div className="absolute inset-0 z-0 pointer-events-none animate-stars"></div>
      </div>
    </div>
  );
}
