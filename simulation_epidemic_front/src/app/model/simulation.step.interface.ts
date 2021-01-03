export interface SimulationStepInterface {
  id: number;
  daySimulation: number;
  infectedPeople: number;
  healthyPeople: number;
  diedPeople: number;
  recoveredPeople: number;
}
