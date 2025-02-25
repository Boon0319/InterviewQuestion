<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'functions.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    exit(0);
}

if ($method === 'GET') {
    if (isset($_GET['id'])) {
        $employee = getEmployeeById($_GET['id']);
        if ($employee) {
            echo json_encode($employee);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Employee not found.']);
        }
    } else {
        $employees = getEmployees();
        echo json_encode($employees);
    }
} elseif ($method === 'POST') {  
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data === null) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON data.']);
        exit;
    }

    $errors = validateEmployeeData($data);
    

    if (!empty($errors)) {
        http_response_code(422);
        echo json_encode(['errors' => $errors]);
        exit; 
    } else {
        $employees = getEmployees();
        $data['id'] = uniqid();
        $employees[] = $data;
        saveEmployees($employees);
        http_response_code(201);
        echo json_encode($data);
    }
} elseif ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;

    if ($id) {
        $success = deleteEmployee($id);
        if ($success) {
            http_response_code(204);
            echo json_encode(['message' => "Successfully Deleted"]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Employee not found.']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Employee ID is required.']);
    }
} elseif ($method === 'PUT') {
    $id = $_GET['id'] ?? null;
    $data = json_decode(file_get_contents('php://input'), true);
    if ($id === null || $data === null) {
        http_response_code(400);
        echo json_encode(['error' => 'Employee ID and data are required']);
        exit;
    }

    $errors = validateEmployeeData($data);
    if (!empty($errors)) {
        http_response_code(422);
        echo json_encode(['errors' => $errors]);
        exit;
    }

    $updatedEmployee = updateEmployee($id, $data);
    if ($updatedEmployee) {
        http_response_code(200);
        echo json_encode($updatedEmployee);
    } else {
        http_response_code(404);
        echo json_encode(['error' => "Employee not found."]);
    }

} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
}
?>