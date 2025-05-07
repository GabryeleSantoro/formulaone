"use client";

import React from "react";

export default function ConstructorsPage() {
  const [constructors, setConstructors] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/constructors/getAllConstructors");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Constructors data:", data);
        setConstructors(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Formula 1 Constructors</h1>
      <div className="grid gap-4">
        <p>Welcome to the constructors page.</p>
      </div>
    </div>
  );
}
