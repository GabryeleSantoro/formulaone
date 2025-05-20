"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NextRaceCard from "@/components/next-race";
import DriverStandingsCard from "@/components/driver-standing";
import ConstructorStandingsCard from "@/components/constructors-standing";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

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

      {/* <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="constructors">Constructors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Latest Race Result</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">Monaco Grand Prix 2023</p>
                <div className="mt-2 space-y-1">
                  <p>1. Max Verstappen - Red Bull</p>
                  <p>2. Fernando Alonso - Aston Martin</p>
                  <p>3. Esteban Ocon - Alpine</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Driver Standings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p>1. Max Verstappen - 170 pts</p>
                  <p>2. Sergio Perez - 130 pts</p>
                  <p>3. Fernando Alonso - 99 pts</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Constructor Standings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p>1. Red Bull Racing - 300 pts</p>
                  <p>2. Ferrari - 178 pts</p>
                  <p>3. Aston Martin - 155 pts</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Races</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-md p-3">
                  <p className="font-bold">Canadian Grand Prix</p>
                  <p>Montreal, Canada</p>
                  <p>June 18, 2023</p>
                </div>
                <div className="border rounded-md p-3">
                  <p className="font-bold">Spanish Grand Prix</p>
                  <p>Barcelona, Spain</p>
                  <p>June 25, 2023</p>
                </div>
                <div className="border rounded-md p-3">
                  <p className="font-bold">Austrian Grand Prix</p>
                  <p>Spielberg, Austria</p>
                  <p>July 2, 2023</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Driver Championship</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((position) => (
                  <div
                    key={position}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{position}.</span>
                      <div>
                        <p className="font-medium">
                          {position === 1
                            ? "Max Verstappen"
                            : position === 2
                            ? "Sergio Perez"
                            : position === 3
                            ? "Fernando Alonso"
                            : position === 4
                            ? "Lewis Hamilton"
                            : "Charles Leclerc"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {position === 1
                            ? "Red Bull Racing"
                            : position === 2
                            ? "Red Bull Racing"
                            : position === 3
                            ? "Aston Martin"
                            : position === 4
                            ? "Mercedes"
                            : "Ferrari"}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold">
                      {position === 1
                        ? "170"
                        : position === 2
                        ? "130"
                        : position === 3
                        ? "99"
                        : position === 4
                        ? "87"
                        : "80"}{" "}
                      pts
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="constructors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Constructor Championship</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((position) => (
                  <div
                    key={position}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{position}.</span>
                      <p className="font-medium">
                        {position === 1
                          ? "Red Bull Racing"
                          : position === 2
                          ? "Ferrari"
                          : position === 3
                          ? "Aston Martin"
                          : position === 4
                          ? "Mercedes"
                          : "Alpine"}
                      </p>
                    </div>
                    <span className="font-bold">
                      {position === 1
                        ? "300"
                        : position === 2
                        ? "178"
                        : position === 3
                        ? "155"
                        : position === 4
                        ? "120"
                        : "58"}{" "}
                      pts
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs> */}
    </div>
  );
}
