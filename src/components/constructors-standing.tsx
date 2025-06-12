"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

interface ConstructorStanding {
  position: string;
  points: string;
  Constructor: {
    name: string;
    nationality: string;
  };
}

export default function ConstructorStandingsCard() {
  const [standings, setStandings] = useState<ConstructorStanding[]>([]);

  useEffect(() => {
    fetch("https://api.jolpi.ca/ergast/f1/current/constructorStandings.json")
      .then((res) => res.json())
      .then((data) => {
        const standingsData =
          data?.MRData?.StandingsTable?.StandingsLists?.[0]
            ?.ConstructorStandings;
        if (standingsData) {
          setStandings(standingsData);
        } else {
          console.warn("No constructor standings data found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching constructor standings:", error);
      });
  }, []);

  if (standings.length === 0) {
    return (
      <p className="text-center mt-6 text-muted-foreground">
        Loading constructor standings...
      </p>
    );
  }

  return (
    <Card className="max-w-md min-w-md mx-auto mt-10 shadow-lg bg-white dark:bg-[#1E1E1E] text-gray-800 border rounded-lg overflow-hidden">
      <CardHeader className="p-6">
        <CardTitle className="text-3xl font-bold flex items-center gap-3 text-gray-800 dark:text-white">
          <Shield className="h-8 w-8 text-blue-500" />
          Constructor Standings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {standings.slice(0, 10).map((team, index) => (
          <div key={team.position} className="flex justify-between">
            <span className={`flex items-center gap-2 text-gray-800 dark:text-white ${index === 0 ? 'font-bold' : ''}`}>
              {team.position}. {team.Constructor.name}
            </span>
            <span className={`text-gray-800 dark:text-white ${index === 0 ? 'font-bold' : ''}`}>
              {team.points} pts
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
