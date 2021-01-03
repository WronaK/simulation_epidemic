package com.example.simulation_epidemic.repository;

import com.example.simulation_epidemic.repository.entity.Simulation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SimulationRepository extends CrudRepository<Simulation, Long> {

}
