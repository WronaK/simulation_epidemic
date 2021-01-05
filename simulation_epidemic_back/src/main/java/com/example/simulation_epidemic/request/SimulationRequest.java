package com.example.simulation_epidemic.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
@Builder
@Setter
public class SimulationRequest {
    private Long id;
    private String simulationName;
    private long populationSize;
    private long initialInfectedPeople;
    private float virusReproductionRate;
    private float mortalityRate;
    private int daysFromInfectionUntilRecovery;
    private int daysFromInfectionToDeath;
    private int simulationDays;
}
