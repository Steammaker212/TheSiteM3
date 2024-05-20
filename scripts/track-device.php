<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "repair_depot";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $trackingCode = $_POST['tracking-code'];

    $stmt = $conn->prepare("SELECT status FROM submissions WHERE tracking_code = ?");
    $stmt->bind_param("s", $trackingCode);
    $stmt->execute();
    $stmt->bind_result($status);

    if ($stmt->fetch()) {
        echo "<p>Status: " . htmlspecialchars($status) . "</p>";
    } else {
        echo "<p>Invalid tracking code. Please try again.</p>";
    }

    $stmt->close();
} else {
    echo "<p>Invalid request method. Please submit the form.</p>";
}

$conn->close();
?>
