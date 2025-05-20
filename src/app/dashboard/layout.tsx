"use server";
import "../globals.css";

import { ThemeProvider } from "@/components/theme-provider";
// import { usePathname } from "next/navigation";

import { cookies, headers } from "next/headers";
import { parse } from "url";

// import { useEffect, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@/lib/models/users";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-pathname");

  const isHome = pathname === "/dashboard" || pathname === "/dashboard/";
  const isRaces = pathname === "/dashboard/races";
  const isChampionships = pathname === "/dashboard/championships";

  const cookie = (await cookies()).get("session")?.value;
  const sessionData = cookie
    ? (JSON.parse(Buffer.from(cookie, "base64").toString("utf-8")) as User)
    : null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <nav className="bg-white dark:bg-black border-gray-200 py-2.5 sticky top-0 z-50">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <a href="#" className="flex items-center order-0">
            <div className="text-4xl font-bold text-black dark:text-white">
              F1<span className="text-red-700 dark:text-red-700">.</span>
            </div>
          </a>

          <div
            className="items-center justify-between w-full lg:flex lg:w-auto order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="/"
                  className={`block py-2 pl-3 pr-4 ${
                    isHome
                      ? "rounded lg:bg-transparent dark:text-white text-black font-bold border-b border-red-700"
                      : "text-gray-400 border-b hover:bg-gray-50 lg:hover:bg-transparent"
                  }`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/races"
                  className={`block py-2 pl-3 pr-4 ${
                    isRaces
                      ? "rounded lg:bg-transparent dark:text-white text-black font-bold border-b border-red-700"
                      : "text-gray-400 border-b hover:bg-gray-50 lg:hover:bg-transparent"
                  } `}
                >
                  Races
                </a>
              </li>
              {/* <li>
                <a
                  href="/dashboard/championships"
                  className={`block py-2 pl-3 pr-4 ${
                    isChampionships
                      ? "rounded lg:bg-transparent dark:text-white text-black font-bold border-b border-red-700"
                      : "text-gray-400 border-b hover:bg-gray-50 lg:hover:bg-transparent"
                  }`}
                >
                  Championships
                </a>
              </li> */}
            </ul>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center order-3">
                <div className="ml-auto">
                  <button
                    type="button"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-label="User profile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600 dark:text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </PopoverTrigger>

            <PopoverContent className="w-56">
              <div className="flex flex-col p-4">
                <div className="flex items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-600 dark:text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="ml-3">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      <span>
                        {sessionData?.name} {sessionData?.surname}
                      </span>
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400"></p>
                  </div>
                </div>
                <a
                  href={`/dashboard/profile/${sessionData?._id}`}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  View Profile
                </a>
                <a
                  href="/api/auth/logout"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  Logout
                </a>
              </div>
            </PopoverContent>
          </Popover>

          <div className="flex items-center hidden">
            <div className="hidden mt-2 mr-4 sm:inline-block">
              <span></span>
            </div>

            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="true"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div className="p-8">{children}</div>
    </ThemeProvider>
  );
}
