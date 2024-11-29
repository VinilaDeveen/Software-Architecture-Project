package com.edu.lms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.lms.entity.Schedule;
import com.edu.lms.exception.InvalidScheduleException;
import com.edu.lms.exception.ScheduleNotFoundException;
import com.edu.lms.repository.ScheduleRepository;
import com.edu.lms.service.ScheduleService;


@Service
public class ScheduleServiceImpl implements ScheduleService {
    @Autowired
    private ScheduleRepository scheduleRepository;

    public Schedule createSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    public void deleteSchedule(Long id) {
        if (!scheduleRepository.existsById(id)) {
            throw new ScheduleNotFoundException("Schedule with ID " + id + " not found.");
        }
        scheduleRepository.deleteById(id);
    }

    public Schedule getScheduleById(Long id) {
        return scheduleRepository.findById(id)
                .orElseThrow(() -> new ScheduleNotFoundException("Schedule with ID " + id + " not found."));
    }

    public Schedule updateSchedule(Long id, Schedule schedule) {
        if (!scheduleRepository.existsById(id)) {
            throw new ScheduleNotFoundException("Schedule with ID " + id + " not found.");
        }
        if (schedule.getDate() == null || schedule.getTime_from() == null || schedule.getTime_to() == null) {
            throw new InvalidScheduleException("Schedule details are invalid.");
        }
        Schedule existingSchedule = scheduleRepository.findById(id).get();

        existingSchedule.setDate(schedule.getDate());
        existingSchedule.setTime_from(schedule.getTime_from());
        existingSchedule.setTime_to(schedule.getTime_to());
        existingSchedule.setDescription(schedule.getDescription());

        return scheduleRepository.save(existingSchedule);
    }
}

