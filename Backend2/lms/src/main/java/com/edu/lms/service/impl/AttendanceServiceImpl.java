package com.edu.lms.service.impl;

import com.edu.lms.entity.Attendance;
import com.edu.lms.repository.AttendanceRepo;
import com.edu.lms.service.*;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AttendanceServiceImpl implements AttendanceService {
    @Autowired
    private AttendanceRepo attendanceRepo;

    @Override
    public List<Attendance> getAllAttendDetails(){
        List<Attendance>getAllAttendDetails=attendanceRepo.findAll();
        return getAllAttendDetails;
    }

    @Override

    public Optional<Attendance> getAttendDetail(String id) {
        return attendanceRepo.findByCardId(id);
    }

    @Override

    public Attendance createAttend(Attendance attendance) {
        return attendanceRepo.save(attendance);
    }

    @Override

    public Attendance updateAttend(Attendance attendance) {
        return attendanceRepo.save(attendance);
    }
    @Override


    public void deleteAttend() {
        attendanceRepo.deleteAll();
    }

    @Override

    public void deleteAttendById(String id) {
        attendanceRepo.deleteAllByCardid(id);
    }
}
