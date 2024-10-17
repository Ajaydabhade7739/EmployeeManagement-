package com.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.dto.EmployeeDto;
import com.ems.service.EmployeeService;

import lombok.AllArgsConstructor;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
@AllArgsConstructor
public class EmployeeController {
	   @Autowired
	private EmployeeService employeeService;
	@PostMapping
	public ResponseEntity<EmployeeDto>createEmployee(@RequestBody EmployeeDto employeeDto){
		EmployeeDto saveEmployee = employeeService.createEmployee(employeeDto);
		return new  ResponseEntity<> (saveEmployee,HttpStatus.CREATED);
	}
	@GetMapping("{id}")
	public ResponseEntity<EmployeeDto>getEmployeeById(@PathVariable("id")Long employeeId){
		EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);
		return new ResponseEntity<>(employeeDto, HttpStatus.OK);

	}
	@GetMapping
	public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
	List<EmployeeDto> employees=employeeService.getAllEmployees();
		return ResponseEntity.ok(employees);
		}
	@PutMapping("{id}")
	public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId, @RequestBody EmployeeDto updatedEmployee) {
	    if (employeeId == null) {
	        throw new IllegalArgumentException("Employee ID must not be null");
	    }
	    EmployeeDto employeeDto = employeeService.updateEmployee(employeeId, updatedEmployee);
	    return ResponseEntity.ok(employeeDto);
	}
	@DeleteMapping("{id}")
	public ResponseEntity<String>deleteEmployee(@PathVariable("id") Long employeeId){
		employeeService.deleteEmployee(employeeId); 
		return ResponseEntity.ok("Employee Deleted Successfully .");
		
	}
	

}
