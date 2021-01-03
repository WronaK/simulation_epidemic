package com.example.simulation_epidemic.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class SimulationRequest {
    private Long id;
    private String simulationName;
    private int populationSize;
    private int initialInfectedPeople;
    private float virusReproductionRate;
    private float mortalityRate;
    private int daysFromInfectionUntilRecovery;
    private int daysFromInfectionToDeath;
    private int simulationDays;
}
