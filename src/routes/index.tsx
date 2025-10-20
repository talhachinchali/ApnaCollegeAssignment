import React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          DSA Sheet Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Arrays</h2>
            <p className="text-gray-600 mb-4">
              Master array operations and algorithms
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Start Learning
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Linked Lists</h2>
            <p className="text-gray-600 mb-4">
              Understand linked list operations
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Start Learning
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Trees</h2>
            <p className="text-gray-600 mb-4">Master binary trees and BST</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
