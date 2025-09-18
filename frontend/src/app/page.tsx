"use client";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="tracking-[-.01em]">
            1. **Challenge 1** — Data Processing & Rendering (50,000+ records)
          </li>
          <li className="tracking-[-.01em]">
            2. **Challenge 2** — Tree & Hierarchy Rendering
          </li>
          <li className="tracking-[-.01em]">
            3. **Challenge 3** — Real-time Dashboard
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="challenge-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Challenge 1
          </a>
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="challenge-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Challenge 2
          </a>
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="challenge-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            Challenge 3
          </a>
        </div>
      </main>
    </div>
  );
}
