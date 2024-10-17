package com.ems.service;

import java.util.List;

import com.ems.dto.EmployeeDto;

public interface EmployeeService {
	//Add single Employee
	EmployeeDto createEmployee(EmployeeDto employeeDto);
	//get single Employee by Id 
	EmployeeDto getEmployeeById(Long employeeId);
	
	//getAll Method
	List<EmployeeDto> getAllEmployees();
	
	//update method 
	EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee );
	//Delete Employee
	void deleteEmployee(Long employeeId);
	
}

