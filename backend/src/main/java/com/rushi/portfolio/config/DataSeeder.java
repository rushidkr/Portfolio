package com.rushi.portfolio.config;

import com.rushi.portfolio.model.Project;
import com.rushi.portfolio.model.Skill;
import com.rushi.portfolio.repository.ProjectRepository;
import com.rushi.portfolio.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Populates the database with starter content the first time the app runs
 * against an empty schema. Edit the arrays below to update your own content
 * -- changes only apply to a fresh/empty database, not on every restart.
 */
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;

    @Override
    public void run(String... args) {
        if (projectRepository.count() == 0) {
            seedProjects();
        }
        if (skillRepository.count() == 0) {
            seedSkills();
        }
    }

    private void seedProjects() {
        Project veriChain = new Project();
        veriChain.setTitle("VeriChain — Tamper-Evident Credential Verification");
        veriChain.setDescription(
                "A system for issuing and verifying academic/professional credentials that can't be silently " +
                "altered. Each credential is linked into a private hash chain and signed with RSA digital " +
                "signatures, so any tampering breaks the chain and is instantly detectable. Includes a Spring " +
                "Boot backend, a React (Vite + Tailwind) verification dashboard, and a Python/FastAPI " +
                "microservice that OCRs uploaded certificates for quick lookup.");
        veriChain.setTechStack(List.of("Spring Boot", "Java", "React", "Vite", "Tailwind CSS", "FastAPI", "Python", "RSA", "REST API"));
        veriChain.setGithubUrl("https://github.com/rushidkr/VeriChain");
        veriChain.setLiveUrl("");
        veriChain.setFeatured(true);
        veriChain.setDisplayOrder(1);
        projectRepository.save(veriChain);

        Project cems = new Project();
        cems.setTitle("CEMS — College Event Management System");
        cems.setDescription(
                "A six-entity Spring Boot REST backend for managing college events end to end, with JWT " +
                "authentication and role-based access control across three roles: Admin, Organizer, and " +
                "Student. Organizers submit events for approval, admins moderate submissions, and students " +
                "browse and register. Paired with a React 18 + Vite + Tailwind frontend.");
        cems.setTechStack(List.of("Spring Boot", "Spring Security", "JWT", "MySQL", "React", "Vite", "Tailwind CSS"));
        cems.setGithubUrl("https://github.com/rushidkr/cems");
        cems.setLiveUrl("");
        cems.setFeatured(true);
        cems.setDisplayOrder(2);
        projectRepository.save(cems);

        Project durgsetu = new Project();
        durgsetu.setTitle("DurgSetu AI");
        durgsetu.setDescription(
                "A four-person academic ML/computer-vision project analyzing historical fort structures from " +
                "imagery. Combines OpenCV, TensorFlow, and ResNet50 for feature extraction, AKAZE for keypoint " +
                "matching, DBSCAN for clustering, and YOLO for object detection, served through a Django REST " +
                "Framework backend. Built with a team of four, guided by Prof. Y. S. Patil.");
        durgsetu.setTechStack(List.of("Python", "OpenCV", "TensorFlow", "ResNet50", "YOLO", "Django REST Framework"));
        durgsetu.setGithubUrl("https://github.com/mitpatil07/DurgSetu-AI");
        durgsetu.setLiveUrl("https://durgsetuai.vercel.app");
        durgsetu.setFeatured(false);
        durgsetu.setDisplayOrder(3);
        projectRepository.save(durgsetu);


    }

    private void seedSkills() {
        List<Skill> skills = List.of(
                // BACKEND
                new Skill(null, "Java", "Backend", 5, 1),
                new Skill(null, "Spring Boot", "Backend", 5, 2),
                new Skill(null, "Spring Security", "Backend", 4, 3),
                new Skill(null, "Spring Data JPA / Hibernate", "Backend", 4, 4),
                new Skill(null, "REST API Design", "Backend", 5, 5),

                // FRONTEND
                new Skill(null, "React", "Frontend", 4, 1),
                new Skill(null, "JavaScript", "Frontend", 4, 2),
                new Skill(null, "Tailwind CSS", "Frontend", 4, 3),
                new Skill(null, "HTML / CSS", "Frontend", 5, 4),

                // DATABASE
                new Skill(null, "MySQL", "Database", 4, 1),
                new Skill(null, "PostgreSQL", "Database", 3, 2),
                new Skill(null, "JDBC", "Database", 4, 3),

                // TOOLS
                new Skill(null, "Git & GitHub", "Tools", 5, 1),
                new Skill(null, "Maven", "Tools", 4, 2),
                new Skill(null, "Docker", "Tools", 3, 3),
                new Skill(null, "Postman", "Tools", 4, 4)
        );
        skillRepository.saveAll(skills);
    }
}
