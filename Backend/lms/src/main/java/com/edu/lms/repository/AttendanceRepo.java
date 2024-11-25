package com.edu.lms.repository;

import com.edu.lms.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AttendanceRepo extends JpaRepository<Attendance ,Integer> {
    @Query(value = "SELECT * FROM attendance_entity WHERE student_id=?1",nativeQuery = true)
    Optional<Attendance> findByCardId(String id);

    @Modifying
    @Query(value = "DELETE FROM attendance_entity WHERE student_id = ?1", nativeQuery = true)
    void deleteAllByCardid(String cardid);
}
