package com.mabud.hyperscaledatacenter.repository;

import com.mabud.hyperscaledatacenter.model.Datacenter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface DatacenterRepository extends JpaRepository<Datacenter, UUID> {//JpaRepository takes 2 parameter the entity(Datacenter) and the type of it's @Id field(Id) which is UUID here
    List<Datacenter> findByCity(String city);

}
