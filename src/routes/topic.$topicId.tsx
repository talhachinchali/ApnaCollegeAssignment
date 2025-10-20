import React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/topic/$topicId")({
  component: TopicPage,
});

function TopicPage() {
  const { topicId } = Route.useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
            ← Back
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Topic: {topicId}
        </h1>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Problems</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Problem 1: Two Sum</h3>
                <p className="text-sm text-gray-600">
                  Find two numbers that add up to target
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  Easy
                </span>
                <input type="checkbox" className="h-4 w-4" />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">
                  Problem 2: Best Time to Buy Stock
                </h3>
                <p className="text-sm text-gray-600">
                  Find maximum profit from stock trading
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                  Medium
                </span>
                <input type="checkbox" className="h-4 w-4" />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Problem 3: Maximum Subarray</h3>
                <p className="text-sm text-gray-600">
                  Find contiguous subarray with maximum sum
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                  Hard
                </span>
                <input type="checkbox" className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
