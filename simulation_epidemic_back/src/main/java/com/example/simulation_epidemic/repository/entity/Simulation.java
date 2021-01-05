package com.example.simulation_epidemic.repository.entity;

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
public class Simulation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String simulationName;
    private long populationSize;
    private long initialInfectedPeople;
    private float virusReproductionRate;
    private float mortalityRate;
    private int daysFromInfectionUntilRecovery;
    private int daysFromInfectionToDeath;
    private int simulationDays;

    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<SimulationStep> simulationSteps = new ArrayList<>();

    public void deleteStepSimulation() {
        this.simulationSteps.removeAll(simulationSteps);
    }

    public void simulationGeneration() {
        List<Long> newInfections = new ArrayList<>();

        long infectedPeople = this.initialInfectedPeople;
        long healthyPeople = this.populationSize - infectedPeople;
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
                long newDied = (long) (newInfections.get(day - this.daysFromInfectionToDeath) * this.mortalityRate);
                diedPeople += newDied;
                infectedPeople -= newDied;
            }

            if (day >= this.daysFromInfectionUntilRecovery){
                long wasDied = (long) (newInfections.get(day - this.daysFromInfectionUntilRecovery) * this.mortalityRate);
                long newRecovered = newInfections.get(day - this.daysFromInfectionUntilRecovery) - wasDied;
                recoveredPeople += newRecovered;
                infectedPeople -= newRecovered;
            }

            long newInfection = min(healthyPeople, (long) (infectedPeople * virusReproductionRate));

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
