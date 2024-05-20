<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $token = htmlspecialchars(trim($_POST["token"]));
    $password = htmlspecialchars(trim($_POST["password"]));
    
    // Database connection (replace with your actual database credentials)
    $servername = "localhost";
    $username_db = "root";
    $password_db = "";
    $dbname = "your_database";

    // Create connection
    $conn = new mysqli($servername, $username_db, $password_db, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if token is valid and not expired
    $sql = "SELECT * FROM users WHERE reset_token='$token' AND reset_expiry > NOW()";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Hash the new password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Update the user's password
        $sql = "UPDATE users SET password='$hashed_password', reset_token=NULL, reset_expiry=NULL WHERE reset_token='$token'";

        if ($conn->query($sql) === TRUE) {
            echo "Password has been reset successfully.";
        } else {
            echo "Error updating record: " . $conn->error;
        }
    } else {
        echo "Invalid or expired token.";
    }

    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <link rel="stylesheet" href="scripts/reset.css">
</head>
<body>
    <div class="container">
        <h2>Reset Password</h2>
        <form action="reset_password.php" method="POST">
            <input type="hidden" name="token" value="<?php echo htmlspecialchars($_GET['token']); ?>">
            <div class="form-group">
                <label for="password">New Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit" class="btn">Reset Password</button>
        </form>
    </div>
</body>
</html>
