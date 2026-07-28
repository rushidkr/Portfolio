package com.rushi.portfolio.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "skills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    // e.g. BACKEND, FRONTEND, DATABASE, TOOLS, ML_CV
    @Column(nullable = false)
    private String category;

    // 1-5, used to render a simple proficiency indicator on the frontend
    private int proficiency;

    @Column(name = "display_order")
    private int displayOrder;
}
