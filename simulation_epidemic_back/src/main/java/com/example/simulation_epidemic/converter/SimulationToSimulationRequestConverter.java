package com.example.simulation_epidemic.converter;

import com.example.simulation_epidemic.repository.entity.Simulation;
import com.example.simulation_epidemic.request.SimulationRequest;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class SimulationToSimulationRequestConverter {
    public SimulationRequest toDto (Simulation simulation){
        return  SimulationRequest.builder()
                .id(simulation.getId())
                .simulationName(simulation.getSimulationName())
                .populationSize(simulation.getPopulationSize())
                .initialInfectedPeople(simulation.getInitialInfectedPeople())
                .virusReproductionRate(simulation.getVirusReproductionRate())
                .mortalityRate(simulation.getMortalityRate())
                .daysFromInfectionUntilRecovery(simulation.getDaysFromInfectionUntilRecovery())
                .daysFromInfectionToDeath(simulation.getDaysFromInfectionToDeath())
                .simulationDays(simulation.getSimulationDays())
                .build();
    }

    public Simulation toEntity(SimulationRequest simulationRequest) {
        return Simulation.builder()
                .id(simulationRequest.getId())
                .simulationName(simulationRequest.getSimulationName())
                .populationSize(simulationRequest.getPopulationSize())
                .initialInfectedPeople(simulationRequest.getInitialInfectedPeople())
                .virusReproductionRate(simulationRequest.getVirusReproductionRate())
                .mortalityRate(simulationRequest.getMortalityRate())
                .virusReproductionRate(simulationRequest.getVirusReproductionRate())
                .mortalityRate(simulationRequest.getMortalityRate())
                .daysFromInfectionUntilRecovery(simulationRequest.getDaysFromInfectionUntilRecovery())
                .daysFromInfectionToDeath(simulationRequest.getDaysFromInfectionToDeath())
                .simulationDays(simulationRequest.getSimulationDays())
                .simulationSteps(new ArrayList<>())
                .build();
    }
}
