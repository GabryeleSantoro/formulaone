"use client";

import React, { useState } from "react";
import NextRaceCard from "@/components/next-race";
import DriverStandingsCard from "@/components/driver-standing";
import ConstructorStandingsCard from "@/components/constructors-standing";
import F1CalendarCard from "@/components/calendar-card";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen p-4 md:p-6 gap-6">
      <header className="flex flex-col">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-lg text-gray-600">
          Stay updated with the latest Formula 1 standings and race information
        </p>
      </header>
      <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 justify-center">
        <NextRaceCard />
        <DriverStandingsCard />
        <ConstructorStandingsCard />
      </div>
    </div>
  );
}
