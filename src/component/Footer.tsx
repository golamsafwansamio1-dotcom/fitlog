
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#24272c] bg-[#090a0c]">
      <div className="mx-auto flex min-h-19 max-w-350 flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row">
        
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/shanj.png"
            alt="FitLog Logo"
            width={24}
            height={24}
            className="object-contain"
          />

          <span className="text-xs font-black tracking-wide text-white">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

       
        <p className="text-center text-[10px] tracking-wide text-gray-500 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
