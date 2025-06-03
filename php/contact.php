<?php
header('Content-Type: application/json');

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get form data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$subject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';

// Validate inputs
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo json_encode([
        'success' => false,
        'message' => 'All fields are required'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email format'
    ]);
    exit;
}

// Your email address
$to = "zihowaa@gmail.com";

// Email headers
$headers = "From: $name <$email>" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";
$headers .= "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";

// Email content
$emailContent = "
<html>
<head>
    <title>New Contact Form Submission</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f5f5f5; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <p class='label'>Name:</p>
                <p>" . htmlspecialchars($name) . "</p>
            </div>
            <div class='field'>
                <p class='label'>Email:</p>
                <p>" . htmlspecialchars($email) . "</p>
            </div>
            <div class='field'>
                <p class='label'>Subject:</p>
                <p>" . htmlspecialchars($subject) . "</p>
            </div>
            <div class='field'>
                <p class='label'>Message:</p>
                <p>" . nl2br(htmlspecialchars($message)) . "</p>
            </div>
        </div>
    </div>
</body>
</html>
";

// Send email
$mailSent = mail($to, "New Contact Form Submission: $subject", $emailContent, $headers);

if ($mailSent) {
    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send message'
    ]);
}
?> 