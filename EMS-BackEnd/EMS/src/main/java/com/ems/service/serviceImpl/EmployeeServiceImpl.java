package com.ems.service.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ems.dto.EmployeeDto;
import com.ems.entity.Employee;
import com.ems.exception.ResourceNotFoundException;
import com.ems.mapper.EmployeeMApper;
import com.ems.repository.EmployeeRepository;
import com.ems.service.EmployeeService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
       
        Employee employee = EmployeeMApper.mapToEmployee(employeeDto);
        
       
        Employee savedEmployee = employeeRepository.save(employee);
        
        
        return EmployeeMApper.mapToEmployeeDto(savedEmployee);
    }

	@Override
	public EmployeeDto getEmployeeById(Long employeeId) {
	    Employee employee = employeeRepository.findById(employeeId)
	        .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with given id: " + employeeId));
	    
	    return EmployeeMApper.mapToEmployeeDto(employee);
	}

	@Override
	public List<EmployeeDto> getAllEmployees() {
		List<Employee> employees=employeeRepository.findAll();
		return employees.stream().map((employee) -> EmployeeMApper.mapToEmployeeDto(employee))
				.collect(Collectors.toList());
	}

	public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee) {
	    if (employeeId == null) {
	        throw new IllegalArgumentException("Employee ID must not be null");
	    }

	    Employee employee = employeeRepository.findById(employeeId).orElseThrow(
	        () -> new ResourceNotFoundException("Employee does not exist with given id: " + employeeId)
	    );

	    employee.setFirstName(updateEmployee.getFirstName());
	    employee.setLastName(updateEmployee.getLastName());
	    employee.setEmail(updateEmployee.getEmail());

	    Employee updatedEmployeeObj = employeeRepository.save(employee);
	    return EmployeeMApper.mapToEmployeeDto(updatedEmployeeObj);
	}

	@Override
	public void deleteEmployee(Long employeeId) {
		
		

	    Employee employee = employeeRepository.findById(employeeId).orElseThrow(
	        () -> new ResourceNotFoundException("Employee does not exist with given id: " + employeeId)
	    );
	    employeeRepository.deleteById(employeeId);
	}


}
