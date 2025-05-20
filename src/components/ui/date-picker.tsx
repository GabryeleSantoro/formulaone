"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "d MMMM yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          locale={"it"}
          selected={date}
          onSelect={setDate}
          initialFocus
          disabled={(date) => date > new Date()}
          captionLayout="dropdown"
          fromDate={new Date(1970, 0, 1)}
          toDate={new Date(2025, 11, 31)}
        />
      </PopoverContent>
    </Popover>
  );
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function CustomDatePicker() {
  const currentDate = new Date();
  const [date, setDate] = React.useState<Date>();
  const [visibleMonth, setVisibleMonth] = React.useState(
    currentDate.getMonth()
  );
  const [visibleYear, setVisibleYear] = React.useState(
    currentDate.getFullYear()
  );

  const years = Array.from(
    { length: 100 },
    (_, i) => currentDate.getFullYear() - 99 + i
  );

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVisibleMonth(Number(e.target.value));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVisibleYear(Number(e.target.value));
  };

  const goToPreviousMonth = () => {
    const newDate = new Date(visibleYear, visibleMonth - 1);
    setVisibleMonth(newDate.getMonth());
    setVisibleYear(newDate.getFullYear());
  };

  const goToNextMonth = () => {
    const newDate = new Date(visibleYear, visibleMonth + 1);
    setVisibleMonth(newDate.getMonth());
    setVisibleYear(newDate.getFullYear());
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "d MMM yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="flex justify-between items-center mb-2">
          <Button variant="ghost" size="icon" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-2 items-center">
            <select
              className="border rounded px-2 py-1 text-sm"
              value={visibleMonth}
              onChange={handleMonthChange}
            >
              {months.map((m, i) => (
                <option key={i} value={i}>
                  {m}
                </option>
              ))}
            </select>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={visibleYear}
              onChange={handleYearChange}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <Button variant="ghost" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          month={new Date(visibleYear, visibleMonth)}
          disabled={(date) => {
            // Disable dates before today
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
          }}
          onMonthChange={() => {}} // Needed for controlled month
          className="rounded-md border"
          classNames={{
            nav_button_previous: "hidden",
            nav_button_next: "hidden",
            caption: "hidden",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
