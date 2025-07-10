"use client";
// Import React and useState from the 'react' library
import React, { useState } from "react";

// A type for the variables that Counter accepts
type CounterVar = {
  initial?: number; // initial is an optional number var to set the starting count
};

// Counter function that received an optional 'initial' var
export default function Counter({ initial = 0 }: CounterVar) {
  // UseState hook that initializes the 'count' state with 'initial'
  const [count, setCount] = useState(initial);

  // Renders a button that increments the count state when clicked
  return (
    <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
  );
}
