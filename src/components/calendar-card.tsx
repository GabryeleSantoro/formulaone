import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import countryNameToCode from "@/lib/flags";

const F1CalendarCard = () => {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextRaceIndex, setNextRaceIndex] = useState(null);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const response = await fetch(
          "https://api.jolpi.ca/ergast/f1/current.json"
        );

        const data = await response.json();

        const raceList = data.MRData.RaceTable.Races;

        const now = dayjs();
        const upcomingIndex = raceList.findIndex((race) =>
          dayjs(race.date).isAfter(now)
        );

        setRaces(raceList);
        setNextRaceIndex(upcomingIndex);
      } catch (error) {
        console.error("Error fetching race calendar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, []);

  if (loading) return <div className="p-4">Loading calendar...</div>;

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border shadow-xl rounded-2xl p-6 mx-auto w-full">
      <h2 className="text-xl font-bold mb-4">
        F1 {dayjs().year()} Season Calendar
      </h2>
      <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mb-4">
        {races.map((race, index) => {
          const isNext = index === nextRaceIndex;
          const country = race.Circuit.Location.country;
          const code =
            countryNameToCode[
              country.replace(/\s/g, "") as keyof typeof countryNameToCode
            ] || "UN";
          const flagUrl = `https://flagcdn.com/24x18/${code.toLowerCase()}.png`;

          return (
            <div
              key={race.round}
              className={`p-3 rounded-lg border ${
                isNext
                  ? "bg-green-100 border-green-500 text-green-800 font-semibold"
                  : "bg-gray-50 border-gray-200 dark:bg-customprimarydark"
              }`}
            >
              <img
                src={flagUrl}
                alt={country}
                className="w-6 h-auto rounded-sm"
              />

              <div>{race.raceName}</div>
              <div className="text-sm text-gray-500">
                {dayjs(race.date).format("MMM D")} – {race.Circuit.circuitName}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default F1CalendarCard;
