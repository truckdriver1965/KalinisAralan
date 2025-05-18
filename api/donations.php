<?php
// Set headers to allow cross-origin requests and specify content type
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Only POST requests are allowed']);
    exit();
}

// Get the raw POST data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Check if data was successfully decoded
if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data: ' . json_last_error_msg()]);
    exit();
}

// Validate required fields
if (empty($data['amount'])) {
    echo json_encode(['success' => false, 'message' => 'Donation amount is required']);
    exit();
}

if (empty($data['donor']['firstName']) || empty($data['donor']['lastName']) || empty($data['donor']['email'])) {
    echo json_encode(['success' => false, 'message' => 'Donor information is incomplete']);
    exit();
}

// Process payment based on payment method
$paymentSuccess = false;
$paymentMessage = '';

switch ($data['paymentMethod']) {
    case 'creditCard':
        // In a real application, you would integrate with a payment gateway here
        // For this demo, we'll simulate a successful payment
        $paymentSuccess = true;
        break;
    case 'bankTransfer':
        // Validate bank transfer reference number
        if (empty($data['paymentDetails']['referenceNumber'])) {
            $paymentSuccess = false;
            $paymentMessage = 'Bank transfer reference number is required';
        } else {
            $paymentSuccess = true;
        }
        break;
    case 'gcash':
        // Validate GCash details
        if (empty($data['paymentDetails']['gcashNumber']) || empty($data['paymentDetails']['gcashName'])) {
            $paymentSuccess = false;
            $paymentMessage = 'GCash details are incomplete';
        } else {
            $paymentSuccess = true;
        }
        break;
    default:
        $paymentSuccess = false;
        $paymentMessage = 'Invalid payment method';
}

// If payment was successful, generate reference number and return success
if ($paymentSuccess) {
    // Generate a unique reference number
    $referenceNumber = 'DON-' . rand(100000, 999999);
    
    /*
    // In a real application, you would store the donation in a database
    $conn = new mysqli("localhost", "username", "password", "database");
    
    if ($conn->connect_error) {
        $paymentSuccess = false;
        $paymentMessage = 'Database connection failed';
    } else {
        $stmt = $conn->prepare("INSERT INTO donations (reference_number, amount, payment_method, donor_first_name, donor_last_name, donor_email) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sdssss", $referenceNumber, $data['amount'], $data['paymentMethod'], $data['donor']['firstName'], $data['donor']['lastName'], $data['donor']['email']);
    
        if ($stmt->execute()) {
            $paymentSuccess = true;
        } else {
            $paymentSuccess = false;
            $paymentMessage = 'Failed to record donation';
        }
    
        $stmt->close();
        $conn->close();
    }
    */
    
    // Return success response without sending email
    echo json_encode([
        'success' => true, 
        'message' => 'Donation processed successfully',
        'referenceNumber' => $referenceNumber
    ]);
} else {
    // Return error response
    echo json_encode([
        'success' => false, 
        'message' => $paymentMessage ?: 'Payment processing failed'
    ]);
}
?>