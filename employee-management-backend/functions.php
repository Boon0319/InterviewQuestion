<?php

function getEmployees() {
    $jsonFilePath = 'employees.json';
    if (file_exists($jsonFilePath)) {
        $json = file_get_contents($jsonFilePath);
        $data = json_decode($json, true);
        return $data === null ? [] : $data; 
    } else {
        return []; 
    }
}

function saveEmployees($employees) {
    $jsonFilePath = 'employees.json';
    file_put_contents($jsonFilePath, json_encode($employees, JSON_PRETTY_PRINT));
}

function validateEmployeeData($data) {
    $errors = [];

    if (empty($data['employee_name'])) {
        $errors['employee_name'] = 'Employee Name is required.';
    }
    

    return $errors;
}


function getEmployeeById($id) {
    $employees = getEmployees();
    foreach ($employees as $employee) {
        if ($employee['id'] == $id) {
            return $employee;
        }
    }
    return null; 
}

// New function: Delete an employee by ID
function deleteEmployee($id) {
    $employees = getEmployees();
    $updatedEmployees = [];
    $deleted = false; 

    foreach ($employees as $employee) {
        if ($employee['id'] != $id) {
            $updatedEmployees[] = $employee;
        } else {
            $deleted = true; 
        }
    }

    if ($deleted) {
        saveEmployees($updatedEmployees);
        return true; 
    } else {
        return false; 
    }
}

// New Function: Update Employee
function updateEmployee($id, $updatedData){
    $employees = getEmployees();
    $updated = false;
    foreach($employees as $index => $employee){
        if($employee['id'] == $id){
            
            $employees[$index] = array_merge($employee, $updatedData);
            $updated = true;
            break; 
        }
    }
    if($updated){
        saveEmployees($employees);
        return $employees[$index]; 
    }
    return false;
}

?>