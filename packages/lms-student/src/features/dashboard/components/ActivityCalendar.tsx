"use client";

import React, { useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { format } from "date-fns";
import { DayButton } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActivityCalendarProps {
  activeDates?: Date[];
}

const ActivityCalendar: React.FC<ActivityCalendarProps> = ({
  activeDates = [],
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  // Generate some mock active dates if none provided
  const activeDatesList = useMemo(() => {
    if (activeDates.length > 0) {
      return activeDates;
    }
    // Generate consistent dates for the current month as mock data
    // Using a seeded approach based on month/year for consistency
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const dates: Date[] = [];

    // Simple seeded random function for consistent results
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // Generate dates with activity (simulating learning activity)
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const seed = currentYear * 12 + currentMonth;

    for (let i = 1; i <= daysInMonth; i++) {
      // Use seeded random for consistency - about 60% of days have activity
      if (seededRandom(seed + i) > 0.4) {
        dates.push(new Date(currentYear, currentMonth, i));
      }
    }
    return dates;
  }, [activeDates]);

  // Create a set for quick lookup
  const activeDatesSet = useMemo(() => {
    return new Set(activeDatesList.map((date) => format(date, "yyyy-MM-dd")));
  }, [activeDatesList]);

  const modifiers = {
    active: activeDatesList,
  };

  const modifiersClassNames = {
    active: "bg-blue-50",
  };

  // Custom DayButton component
  const CustomDayButton = ({
    day,
    modifiers: dayModifiers,
    ...props
  }: React.ComponentProps<typeof DayButton>) => {
    const isToday = dayModifiers.today;
    const dateStr = format(day.date, "yyyy-MM-dd");
    const isActiveDate = activeDatesSet.has(dateStr);

    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "relative w-full h-10 aspect-square flex flex-col items-center justify-center",
          isToday &&
            "bg-blue-500 text-white hover:bg-blue-600 hover:text-white",
          isActiveDate && !isToday && "bg-blue-50 hover:bg-blue-100",
          !isToday && !isActiveDate && "hover:bg-gray-100"
        )}
        {...props}
      >
        <span className="text-sm">{format(day.date, "d")}</span>
        {isActiveDate && !isToday && (
          <Check className="absolute bottom-0.5 w-3 h-3 text-blue-600" />
        )}
      </Button>
    );
  };

  return (
    <Card className="p-6 bg-white border-2 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900">
        Activity Calendar
      </h3>
      <div className="flex flex-col items-start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-lg border [--cell-size:--spacing(13)] md:[--cell-size:--spacing(15)]"
          buttonVariant="ghost"
        />
        <div className="flex gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-600">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Today</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ActivityCalendar;
