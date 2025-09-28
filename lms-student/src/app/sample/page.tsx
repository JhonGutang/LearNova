'use client'

import React, { useState } from "react";

const sampleCourse = {
  id: "1",
  creatorName: "Jane Doe",
  title: "Sample Course",
  tagline: "Learn something new!",
  description: "This is a sample course description.",
  categories: ["Math", "Science"],
  createdAt: new Date().toISOString(),
};

const SamplePage: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <button
        className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        onClick={() => setOpen(true)}
      >
        Show Course Modal
      </button>
     
    </div>
  );
};

export default SamplePage;

