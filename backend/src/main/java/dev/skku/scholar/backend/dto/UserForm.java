package dev.skku.scholar.backend.dto;


import dev.skku.scholar.backend.domain.EEnrollment;
import dev.skku.scholar.backend.domain.ESex;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserForm {
    private Long id;
    private String email;
    private ESex sex;
    private LocalDateTime birth;
    private String username;
    private String password;
    private String major;
    private Integer semester;
    private Integer incomeBracket;
    private Integer gpa;
    private Integer lastSemGpa;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ESex getSex() {
        return sex;
    }

    public void setSex(ESex sex) {
        this.sex = sex;
    }

    public LocalDateTime getBirth() {
        return birth;
    }

    public void setBirth(LocalDateTime birth) {
        this.birth = birth;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public Integer getIncomeBracket() {
        return incomeBracket;
    }

    public void setIncomeBracket(Integer incomeBracket) {
        this.incomeBracket = incomeBracket;
    }

    public Integer getGpa() {
        return gpa;
    }

    public void setGpa(Integer gpa) {
        this.gpa = gpa;
    }

    public Integer getLastSemGpa() {
        return lastSemGpa;
    }

    public void setLastSemGpa(Integer lastSemGpa) {
        this.lastSemGpa = lastSemGpa;
    }

    public String getResidence() {
        return residence;
    }

    public void setResidence(String residence) {
        this.residence = residence;
    }

    public EEnrollment getEnrollStatus() {
        return enrollStatus;
    }

    public void setEnrollStatus(EEnrollment enrollStatus) {
        this.enrollStatus = enrollStatus;
    }

    private String residence;
    private EEnrollment enrollStatus;



}
