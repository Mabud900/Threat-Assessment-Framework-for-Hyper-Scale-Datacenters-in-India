package com.mabud.hyperscaledatacenter.model;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Table(name="data_centers")
@Entity
@Getter
@Setter
public class Datacenter {
    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    private UUID id;

    @Column
    private String name;

    @Column
    private String city;

    @Column
    private String state;

    @Column
    private double latitude;

    @Column
    private double longitude;

    @Column
    @CreationTimestamp
    private LocalDateTime createdAt;
}
