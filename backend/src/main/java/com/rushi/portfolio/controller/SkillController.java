package com.rushi.portfolio.controller;

import com.rushi.portfolio.model.Skill;
import com.rushi.portfolio.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillRepository skillRepository;

    @GetMapping
    public List<Skill> getAllSkills() {
        return skillRepository.findAllByOrderByDisplayOrderAsc();
    }

    @GetMapping("/grouped")
    public Map<String, List<Skill>> getSkillsGroupedByCategory() {
        return skillRepository.findAllByOrderByDisplayOrderAsc().stream()
                .collect(Collectors.groupingBy(
                        Skill::getCategory,
                        java.util.LinkedHashMap::new,
                        Collectors.toList()
                ));
    }
}
