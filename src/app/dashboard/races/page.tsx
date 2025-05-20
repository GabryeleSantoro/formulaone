"use client";
import React, { useState, useEffect, use } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Race } from "@/lib/models/races";
import { Result } from "@/lib/models/results";
import RaceResults from "./_components/raceResults";
import { Qualifying } from "@/lib/models/qualifying";
import { SprintResults } from "@/lib/models/sprint_results";

export default function RacesPage() {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState<String>("");

  const [races, setRaces] = useState<Race[]>([]);
  const [selectedRace, setSelectedRace] = useState<String>("");

  const [results, setResults] = useState<Result[]>([]);
  const [qualifying, setQualifying] = useState<Qualifying[]>([]);

  const [sprintRaceResults, setSprintRaceResults] = useState<SprintResults[]>(
    []
  );

  useEffect(() => {
    const fetchYears = async () => {
      const response = await fetch("/api/years/getAllYears");
      const data = await response.json();
      setYears(data);
    };

    fetchYears();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      const fetchRaces = async () => {
        const response = await fetch(
          "/api/races/getRacesByYear/" + selectedYear
        );
        const data = await response.json();
        setRaces(data);
      };
      fetchRaces();
    }
  }, [selectedYear]);

  useEffect(() => {
    if (selectedRace) {
      const fetchResults = async () => {
        const response = await fetch(
          "/api/results/getResultsByRace/" + selectedRace
        );
        const data = await response.json();
        setResults(data);
      };

      const fetchQualifying = async () => {
        const response = await fetch(
          "/api/qualifying/getQualifyingByRace/" + selectedRace
        );
        const data = await response.json();
        setQualifying(data);
      };

      const fetchSprintResults = async () => {
        const response = await fetch(
          "/api/results/getSprintResultsByRace/" + selectedRace
        );
        const data = await response.json();
        setSprintRaceResults(data);
      };

      fetchQualifying();
      fetchResults();

      if (
        races.find((r) => r._id.toString() === selectedRace)?.sprint_date !==
        "\\N"
      ) {
        fetchSprintResults();
      }
    }
  }, [selectedRace]);

  return (
    <>
      <div className="container mx-auto h-full w-full sm:p-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Formula 1 Race Results</h1>
          <p className="text-gray-600">
            View historical race results by selecting a year from the dropdown
            below.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <div className="flex flex-col justify-center h-full gap-4">
            <Label>Select a year</Label>
            <Select onValueChange={(value) => setSelectedYear(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem
                    key={year}
                    value={year}
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedYear && (
            <div className="flex flex-col justify-center h-full gap-4">
              <Label>Select a Race</Label>
              <Select onValueChange={(value) => setSelectedRace(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  {races.map((race) => (
                    <SelectItem
                      key={race._id}
                      value={race._id.toString()}
                      onClick={() => setSelectedRace(race._id.toString())}
                    >
                      <span>
                        {race.name} - {race.circuitId.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        {/**Race components */}
        {selectedRace &&
          races.find((r) => r._id.toString() === selectedRace) && (
            <RaceResults
              results={results}
              race={races.find((r) => r._id.toString() === selectedRace)!}
              qualifying={qualifying}
              sprintRaceResults={sprintRaceResults}
            />
          )}
      </div>
    </>
  );
}
