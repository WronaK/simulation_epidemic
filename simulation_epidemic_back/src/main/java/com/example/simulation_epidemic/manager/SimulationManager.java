package com.example.simulation_epidemic.manager;


import com.example.simulation_epidemic.repository.SimulationRepository;
import com.example.simulation_epidemic.repository.entity.Simulation;
import com.example.simulation_epidemic.repository.entity.SimulationStep;
import org.omg.PortableInterceptor.SYSTEM_EXCEPTION;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SimulationManager {

    private SimulationRepository simulationRepository;

    @Autowired
    public SimulationManager(SimulationRepository simulationRepository) {
        this.simulationRepository = simulationRepository;
    }

    public Iterable<Simulation> findAll() {
        return simulationRepository.findAll();
    }

    public Optional<Simulation> findById(Long id) {
        return simulationRepository.findById(id);
    }

    public List<SimulationStep> findStepSimulations(Long id) {
        Optional<Simulation> simulation = this.findById(id);
        return simulation.get().getSimulationSteps();
    }

    public void addSimulation(Simulation simulation) {
        simulation.simulationGeneration();
        simulationRepository.save(simulation);
    }

    public void updateSimulation(Simulation simulation){
        Optional<Simulation> simulationOptional = simulationRepository.findById(simulation.getId());
        Simulation simulationFind = simulationOptional.get();
        simulationFind.deleteStepSimulation();
        simulation.simulationGeneration();
        simulationRepository.save(simulation);
    }

    public void deleteSimulation(Long id) {
        simulationRepository.deleteById(id);
    }
}

