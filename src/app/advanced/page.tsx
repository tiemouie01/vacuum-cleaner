"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Building from "./_components/Building";
import { Environment } from "@/models/Environment";
import { Schedule } from "@/models/Schedule";
import { LearningAgent } from "@/models/LearningAgent";

export default function AdvancedPage() {
  const [environment, setEnvironment] = useState(new Environment(3, 3, 2)); // 3x3 rooms, 2 floors
  const [schedule, setSchedule] = useState(new Schedule(environment));
  const [agent, setAgent] = useState(new LearningAgent(environment, schedule));
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalDirtCleaned, setTotalDirtCleaned] = useState(0);

  const step = useCallback(() => {
    const { newEnvironment, newAgent, dirtCleaned } = agent.act(
      environment,
      currentTime
    );
    setEnvironment(newEnvironment);
    setAgent(newAgent);
    setCurrentTime(currentTime + 1);
    setTotalDirtCleaned(totalDirtCleaned + dirtCleaned);
  }, [agent, environment, currentTime, totalDirtCleaned]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        step();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, step]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setEnvironment(new Environment(3, 3, 2));
    setSchedule(new Schedule(environment));
    setAgent(new LearningAgent(environment, schedule));
    setCurrentTime(0);
    setIsRunning(false);
    setTotalDirtCleaned(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Advanced Vacuum Cleaner Simulation
      </h1>
      <div className="grid md:grid-cols-2 gap-2 md:gap-8">
        <Building
          environment={environment}
          agentPosition={agent.position}
          schedule={schedule}
        />
        <div className="row-span-2 self-center">
          <div className="mt-6 space-y-2">
            <p className="text-lg">Time: {currentTime}</p>
            <p className="text-lg">Total Dirt Cleaned: {totalDirtCleaned}</p>
            <p className="text-lg">
              Current Room: ({agent.position.x}, {agent.position.y}, Floor{" "}
              {agent.position.floor + 1})
            </p>
          </div>
          <div className="mt-6 space-x-4">
            <Button onClick={startStop}>{isRunning ? "Stop" : "Start"}</Button>
            <Button onClick={step} disabled={isRunning}>
              Step
            </Button>
            <Button onClick={reset}>Reset</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
