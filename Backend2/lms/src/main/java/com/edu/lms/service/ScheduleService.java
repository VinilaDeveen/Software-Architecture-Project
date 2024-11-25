package com.edu.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.edu.lms.entity.Schedule;

@Service
public interface ScheduleService {
    Schedule createSchedule(Schedule schedule);
    Schedule getScheduleById(Long id);
    List<Schedule> getAllSchedules();
    Schedule updateSchedule(Long id, Schedule schedule);
    void deleteSchedule(Long id);
}
