package com.example.simulation_epidemic.repository.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "SIMULATION_STEP")
public class SimulationStep {

    @Id
    @GeneratedValue
    private long id;
    private int daySimulation;
    private int infectedPeople;
    private int healthyPeople;
    private int diedPeople;
    private int recoveredPeople;

    public SimulationStep(int daySimulation, int infectedPeople,
                          int healthyPeople, int diedPeople, int recoveredPeople) {
        this.daySimulation = daySimulation;
        this.infectedPeople = infectedPeople;
        this.healthyPeople = healthyPeople;
        this.diedPeople = diedPeople;
        this.recoveredPeople = recoveredPeople;
    }
}
