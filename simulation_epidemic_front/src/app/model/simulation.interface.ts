export interface SimulationInterface {
  id: number;
  simulationName: string;
  populationSize: number;
  initialInfectedPeople: number;
  virusReproductionRate: number;
  mortalityRate: number;
  daysFromInfectionUntilRecovery: number;
  daysFromInfectionToDeath: number;
  simulationDays: number;
}
