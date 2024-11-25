package com.edu.lms.controller;


import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.edu.lms.entity.Schedule;
import com.edu.lms.service.ScheduleService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/schedule")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ScheduleController {
    @Autowired
    private ScheduleService scheduleService;

    @PostMapping("")
    public Schedule postSchedule(@RequestBody Schedule schedule){

        return scheduleService.createSchedule(schedule);
    }

    @GetMapping("")
    public List<Schedule> getAllSchedules(){
        return scheduleService.getAllSchedules();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSchedule(@PathVariable long id){
        try{
            scheduleService.deleteSchedule(id);
            return new ResponseEntity<>("Schedule with ID " + id + " deleted successfully", HttpStatus.OK);
        } catch (EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> gerScheduleById(@PathVariable Long id){
        Schedule schedule = scheduleService.getScheduleById(id);
        if(schedule == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(schedule);
    }

    @PutMapping("/{id}")
    public  ResponseEntity<?> updateSchedule(@PathVariable Long id, @RequestBody Schedule schedule){
        Schedule updateSchedule = scheduleService.updateSchedule(id, schedule);

        if(updateSchedule == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return  ResponseEntity.ok(updateSchedule);
    }
}
