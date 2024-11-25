package com.edu.lms.service;

import com.edu.lms.entity.Attendance;

import java.util.List;
import java.util.Optional;

public interface AttendanceService {
    public List<Attendance> getAllAttendDetails();
    public Optional<Attendance> getAttendDetail(String id);
    public Attendance createAttend(Attendance attendance);
    public Attendance updateAttend(Attendance attendance);
    public void deleteAttend();
    public void deleteAttendById(String id);
}
