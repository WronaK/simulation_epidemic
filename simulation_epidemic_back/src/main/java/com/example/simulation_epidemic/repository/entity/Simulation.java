package com.example.simulation_epidemic.repository.entity;

import com.example.simulation_epidemic.request.SimulationRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static java.lang.Math.min;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="SIMULATION")
public class Simulation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String simulationName;
    private int populationSize;
    private int initialInfectedPeople;
    private float virusReproductionRate;
    private float mortalityRate;
    private int daysFromInfectionUntilRecovery;
    private int daysFromInfectionToDeath;
    private int simulationDays;
    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<SimulationStep> simulationSteps;

    public Simulation(String simulationName, int populationSize,
                      int initialNumberInfectedPeople, float virusReproductionRate,
                      float mortalityRate, int daysFromInfectionUntilRecovery,
                      int daysFromInfectionToDeath, int numberSimulationDays) {
        this.simulationName = simulationName;
        this.populationSize = populationSize;
        this.initialInfectedPeople = initialNumberInfectedPeople;
        this.virusReproductionRate = virusReproductionRate;
        this.mortalityRate = mortalityRate;
        this.daysFromInfectionUntilRecovery = daysFromInfectionUntilRecovery;
        this.daysFromInfectionToDeath = daysFromInfectionToDeath;
        this.simulationDays = numberSimulationDays;
        this.simulationSteps = new ArrayList<>();
    }

    public void setSimulation(SimulationRequest simulationRequest) {
        this.id = simulationRequest.getId();
        this.populationSize = simulationRequest.getPopulationSize();
        this.initialInfectedPeople = simulationRequest.getInitialInfectedPeople();
        this.virusReproductionRate = simulationRequest.getVirusReproductionRate();
        this.mortalityRate = simulationRequest.getMortalityRate();
        this.daysFromInfectionUntilRecovery = simulationRequest.getDaysFromInfectionUntilRecovery();
        this.daysFromInfectionToDeath = simulationRequest.getDaysFromInfectionToDeath();
        this.simulationDays = simulationRequest.getSimulationDays();
    }

    public void simulationGeneration() {
        List<Integer> newInfections = new ArrayList<>();

        int infectedPeople = this.initialInfectedPeople;
        int healthyPeople = this.populationSize - infectedPeople;
        int diedPeople = 0;
        int recoveredPeople = 0;

        newInfections.add(infectedPeople);
        this.simulationSteps.add(
                new SimulationStep(
                    1,
                    infectedPeople,
                    healthyPeople,
                    diedPeople,
                    recoveredPeople));

        for(int day = 1; day < this.simulationDays; day++) {
            if (day >= this.daysFromInfectionToDeath) {
                int newDied = (int) (newInfections.get(day - this.daysFromInfectionToDeath) * this.mortalityRate);
                diedPeople += newDied;
                infectedPeople -= newDied;
            }

            if (day >= this.daysFromInfectionUntilRecovery){
                int wasDied = (int) (newInfections.get(day - this.daysFromInfectionUntilRecovery) * this.mortalityRate);
                int newRecovered = newInfections.get(day - this.daysFromInfectionUntilRecovery) - wasDied;
                recoveredPeople += newRecovered;
                infectedPeople -= newRecovered;
            }

            int newInfection = min(healthyPeople, (int) (infectedPeople * virusReproductionRate));

            infectedPeople += newInfection;
            healthyPeople -= newInfection;
            newInfections.add(newInfection);

            this.simulationSteps.add(
                    new SimulationStep(day + 1,
                            infectedPeople,
                            healthyPeople,
                            diedPeople,
                            recoveredPeople));
        }

    }
}
