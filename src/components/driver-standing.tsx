"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface DriverStanding {
  position: string;
  points: string;
  Driver: {
    givenName: string;
    familyName: string;
    nationality: string;
  };
  Constructors: {
    name: string;
  }[];
}

export default function DriverStandingsCard() {
  const [standings, setStandings] = useState<DriverStanding[]>([]);

  useEffect(() => {
    fetch("https://api.jolpi.ca/ergast/f1/current/driverStandings.json")
      .then((res) => res.json())
      .then((data) => {
        const standingsData =
          data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings;
        if (standingsData) {
          setStandings(standingsData);
        } else {
          console.warn("No driver standings data found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching driver standings:", error);
      });
  }, []);

  if (standings.length === 0) {
    return (
      <p className="text-center mt-6 text-muted-foreground">
        Loading driver standings...
      </p>
    );
  }

  return (
    <Card className="max-w-md min-w-md mx-auto mt-10 shadow-lg bg-white dark:bg-[#1E1E1E] text-gray-800 border rounded-lg overflow-hidden">
      <CardHeader className="p-6">
        <CardTitle className="text-3xl font-bold flex items-center gap-3 text-gray-800 dark:text-white">
          <Trophy className="h-8 w-8 text-yellow-500" />
          Driver Standings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {standings.slice(0, 10).map((driver) => (
          <div key={driver.position} className="flex justify-between">
            <span className="text-gray-800 dark:text-white">
              {driver.position}. {driver.Driver.givenName}{" "}
              {driver.Driver.familyName} ({driver.Constructors[0]?.name})
            </span>
            <span className="text-gray-800 dark:text-white">
              {driver.points} pts
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
