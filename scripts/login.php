<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $emailUsername = $_POST['email-username'];
    $password = $_POST['password'];

    // Database connection
    $servername = "localhost";
    $username = "root";
    $passwordDB = "";
    $dbname = "your_database_name";

    $conn = new mysqli($servername, $username, $passwordDB, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $emailUsername = $conn->real_escape_string($emailUsername);
    $password = $conn->real_escape_string($password);

    $sql = "SELECT id, password FROM users WHERE email='$emailUsername' OR username='$emailUsername'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            $_SESSION['user_id'] = $row['id'];
            header("Location: dashboard.php");
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "No user found with this email or username.";
    }

    $conn->close();
}
?>
