"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Room from "@/components/Room";

class Environment {
  // The rooms are either dirty(true) or clean(false).
  rooms: boolean[];

  constructor() {
    this.rooms = [false, false];
  }

  applyAction(action: string, agentPosition: number): number {
    switch (action) {
      case "SUCK":
        this.rooms[agentPosition] = false;
        break;
      case "MOVE_LEFT":
        return 0;
      case "MOVE_RIGHT":
        return 1;
    }
    return agentPosition;
  }

  randomize() {
    this.rooms[0] = Math.random() < 0.3;
    this.rooms[1] = Math.random() < 0.3;
  }
}

export default function Home() {
  const [environment, setEnvironment] = useState<Environment>(
    new Environment()
  );
  const [agentPosition, setAgentPosition] = useState<number>(0);
  const [action, setAction] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [stepCount, setStepCount] = useState<number>(0);
  const [totalDirt, setTotalDirt] = useState<number>(0);

  const step = useCallback(() => {
    const perceive = () => {
      return {
        position: agentPosition,
        isDirty: environment.rooms[agentPosition],
      };
    };

    const newEnvironment = new Environment();
    newEnvironment.rooms = [...environment.rooms];

    // Randomize the state of the rooms at every 5 steps.
    if (stepCount % 5 === 0) {
      newEnvironment.randomize();
    }

    const perception = perceive();
    const newAction = act(perception);

    setAction(newAction);
    if (newAction === "SUCK") {
      setTotalDirt((prev) => prev + 1);
    }

    const newPosition = newEnvironment.applyAction(newAction, agentPosition);

    setEnvironment(newEnvironment);
    setAgentPosition(newPosition);
    setStepCount((prev) => prev + 1);
  }, [environment, agentPosition, stepCount]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        step();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, step]);

  const act = (perception: { position: number; isDirty: boolean }): string => {
    if (perception.isDirty) {
      return "SUCK";
    } else if (perception.position === 0) {
      return "MOVE_RIGHT";
    } else {
      return "MOVE_LEFT";
    }
  };

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setEnvironment(new Environment());
    setAgentPosition(0);
    setAction("");
    setIsRunning(false);
    setStepCount(0);
    setTotalDirt(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl text-center font-bold mb-6">
        Vacuum Cleaner Simulation
      </h1>
      <div className="flex space-x-4 mb-6">
        <Room isDirty={environment.rooms[0]} isActive={agentPosition === 0} />
        <Room isDirty={environment.rooms[1]} isActive={agentPosition === 1} />
      </div>
      <div className="mt-6 space-y-2">
        <p className="text-lg">Step: {stepCount}</p>
        <p className="text-lg">Action: {action}</p>
        <p className="text-lg">Total Dirt Cleaned: {totalDirt}</p>
      </div>
      <div className="mt-6 space-x-4">
        <Button onClick={startStop}>{isRunning ? "Stop" : "Start"}</Button>
        <Button onClick={step} disabled={isRunning}>
          Step
        </Button>
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  );
}
