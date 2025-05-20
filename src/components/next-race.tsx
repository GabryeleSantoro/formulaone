"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Flag } from "lucide-react";
import { useCountdown } from "@/lib/hooks/useCountdown";

interface RaceData {
  raceName: string;
  date: string;
  time?: string;
  Circuit: {
    circuitName: string;
    Location: {
      locality: string;
      country: string;
      lat: string;
      long: string;
    };
  };
}

const fallbackRaceDate = new Date("2100-01-01T00:00:00Z");

export default function NextRaceCard() {
  const [race, setRace] = useState<RaceData | null>(null);

  const raceDate =
    race?.date && race?.time
      ? new Date(`${race.date}T${race.time}`)
      : fallbackRaceDate;

  const { total, days, hours, minutes, seconds } = useCountdown(raceDate);

  useEffect(() => {
    fetch("https://api.jolpi.ca/ergast/f1/current/next.json")
      .then((res) => res.json())
      .then((data) => {
        const races = data?.MRData?.RaceTable?.Races;
        if (races && races.length > 0) {
          setRace(races[0]);
        }
      })
      .catch((err) => console.error("Failed to fetch race:", err));
  }, []);

  return (
    <Card className="max-w-md min-w-md mx-auto mt-10 shadow-lg bg-white dark:bg-[#1E1E1E] text-gray-800 border rounded-lg overflow-hidden">
      <CardHeader className="p-6">
        <CardTitle className="text-3xl font-bold flex items-center gap-3 text-gray-800 dark:text-white">
          <Flag className="h-8 w-8 text-red-500" />
          Next F1 Race
        </CardTitle>
        <p className="text-gray-500 dark:text-white text-sm mt-2">
          {race?.raceName || "Loading race..."}
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {race ? (
          <>
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-gray-500 dark:text-white" />
              <span className="font-medium text-lg text-gray-500 dark:text-white">
                {new Date(race.date).toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-gray-500 dark:text-white" />
              <span className="font-medium text-lg text-gray-500 dark:text-white">
                {race.time
                  ? new Date(`${race.date}T${race.time}`).toLocaleTimeString(
                      "en-GB",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )
                  : "TBA"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-gray-500 dark:text-white" />
              <span className="font-medium text-lg text-gray-500 dark:text-white">
                {race.Circuit.Location.locality},{" "}
                {race.Circuit.Location.country}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Flag className="h-6 w-6 text-gray-500 dark:text-white" />
              <span className="font-medium text-lg text-gray-500 dark:text-white">
                {race.Circuit.circuitName}
              </span>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Loading race data…</p>
        )}

        {total > 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 mt-6">
            <Clock className="h-8 w-8 text-green-500" />
            <p className="text-center text-green-600 font-semibold text-lg gap-1">
              Race starts in:
              <span className="ml-2 inline-flex gap-2 font-mono text-xl">
                <span>{days}d</span>
                <span>{hours}h</span>
                <span>{minutes}m</span>
                <span>{seconds}s</span>
              </span>
            </p>
          </div>
        ) : race ? (
          <p className="text-center text-red-500 font-semibold mt-6 text-lg">
            The race is starting or has already started!
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
