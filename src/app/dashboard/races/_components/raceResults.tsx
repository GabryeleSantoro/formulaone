import { Race } from "@/lib/models/races";
import { Result } from "@/lib/models/results";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Qualifying } from "@/lib/models/qualifying";
import { ResultsTable } from "./resultsTable";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SprintResults } from "@/lib/models/sprint_results";
import { title } from "process";

export default function RaceResults({
  results,
  race,
  qualifying,
  sprintRaceResults = [],
}: {
  results: Result[];
  race: Race;
  qualifying: Qualifying[];
  sprintRaceResults: SprintResults[];
}) {
  const formatDateTime = (date: string, time: string) => {
    const d = new Date(date);

    if (d.getTime() === 0) {
      return "";
    }

    let timeString = "";

    if (time != "\\N") {
      timeString += ` ${time}`;
    }

    timeString += ` ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

    return timeString;
  };

  return (
    <>
      <div className="flex flex-row w-full mt-10">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{race.name}</CardTitle>
            <CardDescription>
              <a href={race.circuitId.url}>{race.circuitId.name}</a> -{" "}
              {race.circuitId.location}
            </CardDescription>
            <CardDescription>
              {race.fp1_date != "\\N" && (
                <span>
                  FP1: {formatDateTime(race.fp1_date, race.fp1_time)}
                  <br />
                </span>
              )}
              {race.fp2_date != "\\N" && (
                <span>
                  FP2: {formatDateTime(race.fp2_date, race.fp2_time)}
                  <br />
                </span>
              )}
              {race.fp3_date != "\\N" && (
                <span>
                  FP3: {formatDateTime(race.fp3_date, race.fp3_time)}
                  <br />
                </span>
              )}
              {race.quali_date != "\\N" && (
                <span>
                  Qualifiche: {formatDateTime(race.quali_date, race.quali_time)}
                  <br />
                </span>
              )}
              {race.sprint_date != "\\N" && (
                <span>
                  Sprint: {formatDateTime(race.sprint_date, race.sprint_time)}
                  <br />
                </span>
              )}
              {(race.date as unknown as string) != "\\N" && (
                <span>
                  Gara:{" "}
                  {formatDateTime(race.date as unknown as string, race.time)}
                  <br />
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              {/** Qualifiche */}
              {qualifying.length > 0 && (
                <div className="flex flex-col gap-4 p-12">
                  <CardTitle>Qualifiche</CardTitle>
                  <Accordion type="single" collapsible className="w-full">
                    {/** Q1 */}
                    {qualifying.some((q) => q.q1 !== "" && q.q1 !== "\\N") && (
                      <AccordionItem value="q1">
                        <AccordionTrigger>
                          <div className="flex flex-row justify-between w-full">
                            Q1{" "}
                            <span className="text-sm text-purple-500">
                              Best Lap{" "}
                              {(() => {
                                const fastestQ1 = qualifying
                                  .filter((q) => q.q1 != "\\N" && q.q1 != "")
                                  .sort((a, b) => a.q1.localeCompare(b.q1))[0];

                                return fastestQ1
                                  ? `${fastestQ1.q1} - ${
                                      fastestQ1.driverId.code !== "\\N"
                                        ? fastestQ1.driverId.code
                                        : `${fastestQ1.driverId.forename} ${fastestQ1.driverId.surname}`
                                    }`
                                  : "No times set";
                              })()}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ResultsTable
                            columns={[
                              { key: "position", title: "Pos" },
                              { key: "driver", title: "Driver" },
                              { key: "code", title: "Code" },
                              { key: "driverNumber", title: "Driver Number" },
                              { key: "constructor", title: "Constructor" },
                              { key: "lap", title: "Lap" },
                            ]}
                            data={qualifying
                              .filter((q) => q.q1 != "\\N" && q.q1 != "")
                              .sort((a, b) => a.q1.localeCompare(b.q1))
                              .map((q, index) => ({
                                position: index + 1,
                                driver: `${q.driverId.forename} ${q.driverId.surname}`,
                                code:
                                  q.driverId.code != "\\N"
                                    ? q.driverId.code
                                    : "",
                                driverNumber: q.number,
                                constructor: q.constructorId.name,
                                lap: q.q1,
                              }))}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    )}
                    {/** Q2 */}
                    {qualifying.some((q) => q.q2 !== "" && q.q2 !== "\\N") && (
                      <AccordionItem value="q2">
                        <AccordionTrigger>
                          <div className="flex flex-row justify-between w-full">
                            Q2{" "}
                            <span className="text-sm text-purple-500">
                              Best Lap{" "}
                              {(() => {
                                const fastestQ2 = qualifying
                                  .filter((q) => q.q2 != "\\N" && q.q2 != "")
                                  .sort((a, b) => a.q2.localeCompare(b.q2))[0];

                                return fastestQ2
                                  ? `${fastestQ2.q2} - ${fastestQ2.driverId.code}`
                                  : "No times set";
                              })()}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ResultsTable
                            columns={[
                              { key: "position", title: "Pos" },
                              { key: "driver", title: "Driver" },
                              { key: "code", title: "Code" },
                              { key: "driverNumber", title: "Driver Number" },
                              { key: "constructor", title: "Constructor" },
                              { key: "lap", title: "Lap" },
                            ]}
                            data={qualifying
                              .filter((q) => q.q2 != "\\N" && q.q2 != "")
                              .sort((a, b) => a.q2.localeCompare(b.q2))
                              .map((q, index) => ({
                                position: index + 1,
                                driver: `${q.driverId.forename} ${q.driverId.surname}`,
                                code:
                                  q.driverId.code != "\\N"
                                    ? q.driverId.code
                                    : "",
                                driverNumber: q.number,
                                constructor: q.constructorId.name,
                                lap: q.q2,
                              }))}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    )}
                    {/** Q3 */}
                    {qualifying.some((q) => q.q3 !== "" && q.q3 !== "\\N") && (
                      <AccordionItem value="q3">
                        <AccordionTrigger>
                          <div className="flex flex-row justify-between w-full">
                            Q3{" "}
                            <span className="text-sm text-purple-500">
                              Best Lap{" "}
                              {(() => {
                                const fastestQ3 = qualifying
                                  .filter((q) => q.q3 != "\\N" && q.q3 != "")
                                  .sort((a, b) => a.q3.localeCompare(b.q3))[0];

                                return fastestQ3
                                  ? `${fastestQ3.q3} - ${fastestQ3.driverId.code}`
                                  : "No times set";
                              })()}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ResultsTable
                            columns={[
                              { key: "position", title: "Pos" },
                              { key: "driver", title: "Driver" },
                              { key: "code", title: "Code" },
                              { key: "driverNumber", title: "Driver Number" },
                              { key: "constructor", title: "Constructor" },
                              { key: "lap", title: "Lap" },
                            ]}
                            data={qualifying
                              .filter((q) => q.q3 != "\\N" && q.q3 != "")
                              .sort((a, b) => a.q3.localeCompare(b.q3))
                              .map((q, index) => ({
                                position: index + 1,
                                driver: `${q.driverId.forename} ${q.driverId.surname}`,
                                code:
                                  q.driverId.code != "\\N"
                                    ? q.driverId.code
                                    : "",
                                driverNumber: q.number,
                                constructor: q.constructorId.name,
                                lap: q.q3,
                              }))}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>
                </div>
              )}

              {/** Sprint Race */}
              {race.sprint_date != "\\N" && (
                <div className="flex flex-col gap-4 p-12">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="sprint">
                      <AccordionTrigger>
                        <div className="flex flex-row justify-between w-full">
                          <CardTitle>Sprint Race</CardTitle>{" "}
                          <span className="text-sm text-purple-500">
                            Winner{" "}
                            {(() => {
                              const winnerSprint = sprintRaceResults.sort(
                                (a, b) => a.position - b.position
                              )[0];

                              return winnerSprint
                                ? `${winnerSprint.driverId.code}`
                                : "No times set";
                            })()}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ResultsTable
                          columns={[
                            { key: "position", title: "Pos" },
                            { key: "grid", title: "Grid" },
                            { key: "driver", title: "Driver" },
                            { key: "driverNumber", title: "Driver Number" },
                            { key: "constructor", title: "Constructor" },
                            { key: "bestLap", title: "Best Lap" },
                            { key: "time", title: "Time" },
                            { key: "laps", title: "Laps" },
                            { key: "points", title: "Points" },
                          ]}
                          data={sprintRaceResults
                            .sort((a, b) => a.position - b.position)
                            .map((r) => ({
                              position: r.position,
                              grid: r.grid,
                              driver: `${r.driverId.forename} ${r.driverId.surname}`,
                              driverNumber: r.number,
                              constructor: r.constructorId.name,
                              bestLap: r.fastestLapTime,
                              time:
                                r.time != "\\N" ? r.time : r.statusId.status,
                              laps: r.laps,
                              points: r.points,
                            }))}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}

              {/** Gara */}
              <div className="flex flex-col gap-4 p-12">
                <Accordion
                  type="single"
                  defaultValue="race"
                  collapsible
                  className="w-full"
                >
                  <AccordionItem value="race">
                    <AccordionTrigger>
                      <div className="flex flex-row justify-between w-full">
                        <CardTitle>Race</CardTitle>{" "}
                        <span className="text-sm text-purple-500">
                          Winner{" "}
                          {(() => {
                            const winner = results.sort(
                              (a, b) => a.position - b.position
                            )[0];

                            if (!winner) {
                              return "No times set";
                            }

                            return winner?.driverId.code != "\\N"
                              ? `${winner.driverId.code} - ${winner.constructorId.name}`
                              : `${winner.driverId.forename} ${winner.driverId.surname} - ${winner.constructorId.name}`;
                          })()}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ResultsTable
                        columns={[
                          { key: "position", title: "Pos" },
                          { key: "grid", title: "Grid" },
                          { key: "driver", title: "Driver" },
                          { key: "code", title: "Code" },
                          { key: "driverNumber", title: "Driver Number" },
                          { key: "constructor", title: "Constructor" },
                          { key: "bestLap", title: "Best Lap" },
                          { key: "time", title: "Time" },
                          { key: "laps", title: "Laps" },
                          { key: "points", title: "Points" },
                        ]}
                        data={results
                          .sort((a, b) => a.positionOrder - b.positionOrder)
                          .map((r) => ({
                            position: r.position,
                            grid: r.grid,
                            driver: `${r.driverId.forename} ${r.driverId.surname}`,
                            code:
                              r.driverId.code != "\\N" ? r.driverId.code : "",
                            driverNumber: r.number,
                            constructor: r.constructorId.name,
                            bestLap:
                              r.fastestLapTime != "\\N" ? r.fastestLapTime : "",
                            time: r.time != "\\N" ? r.time : r.statusId.status,
                            laps: r.laps,
                            points: r.points,
                          }))}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* <ResultsTable
                columns={[
                  "Pos",
                  "Driver",
                  "Driver Number",
                  "Constructor",
                  "Lap",
                ]}
                data={qualifying
                  .filter((q) => q.q2 != "\\N")
                  .map((q) => ({
                    Pos: q.position,
                    Driver: `${q.driverId.forename} ${q.driverId.surname}`,
                    DriverNumber: q.number,
                    Constructor: q.constructorId.name,
                    Lap: q.q2,
                  }))}
              />
              <CardDescription>Q3</CardDescription>
              <ResultsTable
                columns={[
                  "Pos",
                  "Driver",
                  "Driver Number",
                  "Constructor",
                  "Lap",
                ]}
                data={qualifying
                  .filter((q) => q.q3 != "\\N")
                  .map((q) => ({
                    Pos: q.position,
                    Driver: `${q.driverId.forename} ${q.driverId.surname}`,
                    DriverNumber: q.number,
                    Constructor: q.constructorId.name,
                    Lap: q.q3,
                  }))}
              /> */}
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </>
  );
}
