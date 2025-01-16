import React, { useState, useMemo, ChangeEvent } from "react";

const ExpensiveComputation = ({ num }: { num: number }) => {
  const expensiveCalculation = (n: number): number => {
    console.log("Running expensive calculation...");
    // Simulate expensive calculation
    let result = 0;
    for (let i = 0; i < 1; i++) {
      console.log("i", i);
      result += n;
    }
    return result;
  };

  const calculatedValue = useMemo(() => {
    return expensiveCalculation(num);
  }, [num]);

  return (
    <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
      <p>
        Calculated Value:{" "}
        <span className="font-medium text-white">{calculatedValue}</span>
      </p>
    </div>
  );
};

const Home = () => {
  const [number, setNumber] = useState<number>(1);
  const [increment, setIncrement] = useState<number>(0);

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setNumber(value);
  };

  const handleIncrement = () => {
    setIncrement((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-gray-900 rounded-lg shadow-xl text-gray-100">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">useMemo Example</h1>
      </div>

      {/* Input Section */}
      <div className="mb-8">
        <div className="flex gap-4 mb-2">
          <input
            type="number"
            value={number}
            onChange={handleNumberChange}
            placeholder="Enter a number..."
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleIncrement}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Increment Counter
          </button>
        </div>
        <p className="text-sm text-gray-400">
          Change the number to trigger the expensive calculation. The increment
          button won't trigger a recalculation.
        </p>
      </div>

      {/* Result Display Section */}
      <div className="mb-8">
        <div className="space-y-2 mb-2">
          <ExpensiveComputation num={number} />
          <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
            <p>
              Unrelated Counter:{" "}
              <span className="font-medium text-white">{increment}</span>
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          Notice how the expensive calculation only runs when the number
          changes, not when the counter increments.
        </p>
      </div>

      {/* Learning Points */}
      <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h3 className="text-lg font-medium text-white mb-2">
          Key Learning Points:
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
          <li>
            useMemo memoizes expensive calculations to improve performance
          </li>
          <li>It only recalculates when specified dependencies change</li>
          <li>
            Useful for preventing unnecessary recalculations in React components
          </li>
          <li>
            The memoized value persists between renders unless dependencies
            change
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
