package com.example.simulation_epidemic.manager;


import com.example.simulation_epidemic.repository.SimulationRepository;
import com.example.simulation_epidemic.repository.entity.Simulation;
import com.example.simulation_epidemic.repository.entity.SimulationStep;
import com.example.simulation_epidemic.request.SimulationRequest;
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

    public void addSimulation(SimulationRequest simulationRequest) {
        Simulation simulation = new Simulation(simulationRequest.getSimulationName(),
                simulationRequest.getPopulationSize(), simulationRequest.getInitialInfectedPeople(),
                simulationRequest.getVirusReproductionRate(), simulationRequest.getMortalityRate(),
                simulationRequest.getDaysFromInfectionUntilRecovery(), simulationRequest.getDaysFromInfectionToDeath(),
                simulationRequest.getSimulationDays());

        simulation.simulationGeneration();
        simulationRepository.save(simulation);
    }

    public Simulation updateSimulation(SimulationRequest simulationRequest){
        Optional<Simulation> simulationOptional = simulationRepository.findById(simulationRequest.getId());
        Simulation simulation = simulationOptional.get();
        simulation.setSimulation(simulationRequest);
        return simulationRepository.save(simulation);
    }

    public void deleteSimulation(Long id) {
        simulationRepository.deleteById(id);
    }

}

