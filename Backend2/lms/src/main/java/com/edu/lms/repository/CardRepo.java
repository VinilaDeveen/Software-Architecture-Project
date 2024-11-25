package com.edu.lms.repository;

import com.edu.lms.entity.
Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CardRepo extends JpaRepository<Card ,Integer> {
    @Query(value = "SELECT * FROM card WHERE stu_id=?1",nativeQuery = true)

    Optional<Card> findByCardId(String id);
    @Modifying
    @Query(value = "DELETE FROM card WHERE stu_id = ?1",nativeQuery = true)
    void deleteByCardId(String card_id);


}
