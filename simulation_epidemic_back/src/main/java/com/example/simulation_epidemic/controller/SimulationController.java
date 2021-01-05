package com.example.simulation_epidemic.controller;

import com.example.simulation_epidemic.converter.SimulationToSimulationRequestConverter;
import com.example.simulation_epidemic.manager.SimulationManager;
import com.example.simulation_epidemic.repository.entity.Simulation;
import com.example.simulation_epidemic.repository.entity.SimulationStep;
import com.example.simulation_epidemic.request.SimulationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api/simulations")
public class SimulationController {

    private SimulationManager simulationManager;
    private SimulationToSimulationRequestConverter simulationConverter;

    @Autowired
    public SimulationController(SimulationManager simulationManager,
                                SimulationToSimulationRequestConverter simulationConverter) {
        this.simulationManager = simulationManager;
        this.simulationConverter = simulationConverter;
    }

    @GetMapping("/all")
    public List<SimulationRequest> getAll() {
        return StreamSupport
                .stream(this.simulationManager.findAll().spliterator(), false)
                .map(simulation -> simulationConverter.toDto(simulation))
                .collect(Collectors.toList());
    }

    @GetMapping
    public Optional<Simulation> getById(@RequestParam Long id) {
        return this.simulationManager.findById(id);
    }

    @GetMapping("/steps")
    public List<SimulationStep> getSimulationSteps(@RequestParam Long id) {
        return this.simulationManager.findStepSimulations(id);
    }

    @PostMapping
    public void addSimulation(@RequestBody SimulationRequest simulationRequest) {
        this.simulationManager.addSimulation(this.simulationConverter.toEntity(simulationRequest));
    }

    @PutMapping
    public void updateSimulation(@RequestBody SimulationRequest simulationRequest) {
        this.simulationManager.updateSimulation(this.simulationConverter.toEntity(simulationRequest));
    }

    @DeleteMapping
    public void deleteSimulation(@RequestParam Long id) {
        this.simulationManager.deleteSimulation(id);
    }

}
