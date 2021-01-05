package com.example.simulation_epidemic.repository.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class SimulationStep {

    @Id
    @GeneratedValue
    private long id;
    private int daySimulation;
    private long infectedPeople;
    private long healthyPeople;
    private long diedPeople;
    private long recoveredPeople;

    public SimulationStep(int daySimulation, long infectedPeople,
                          long healthyPeople, int diedPeople, long recoveredPeople) {
        this.daySimulation = daySimulation;
        this.infectedPeople = infectedPeople;
        this.healthyPeople = healthyPeople;
        this.diedPeople = diedPeople;
        this.recoveredPeople = recoveredPeople;
    }
}
