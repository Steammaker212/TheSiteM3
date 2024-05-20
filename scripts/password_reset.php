<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = htmlspecialchars(trim($_POST["email"]));
    
    // Validate reCAPTCHA
    $recaptchaSecret = 'your_secret_key';
    $recaptchaResponse = $_POST['g-recaptcha-response'];
    $recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha = file_get_contents($recaptchaUrl . '?secret=' . $recaptchaSecret . '&response=' . $recaptchaResponse);
    $recaptcha = json_decode($recaptcha);
    
    if ($recaptcha->success && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Check if email exists in the database
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

        $sql = "SELECT * FROM users WHERE email='$email'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            // Generate a unique token
            $token = bin2hex(random_bytes(50));

            // Save the token in the database with an expiration time
            $expiry = date("Y-m-d H:i:s", strtotime('+1 hour'));
            $sql = "UPDATE users SET reset_token='$token', reset_expiry='$expiry' WHERE email='$email'";

            if ($conn->query($sql) === TRUE) {
                // Send password reset email
                $resetLink = "http://yourwebsite.com/scripts/reset_password.php?token=$token";
                $subject = "Password Reset Request";
                $message = "Click on the following link to reset your password: $resetLink";
                $headers = "From: no-reply@yourwebsite.com";

                if (mail($email, $subject, $message, $headers)) {
                    echo "Password reset email sent successfully.";
                } else {
                    echo "Failed to send email.";
                }
            } else {
                echo "Error updating record: " . $conn->error;
            }
        } else {
            echo "No account found with that email address.";
        }

        $conn->close();
    } else {
        echo "Invalid email or reCAPTCHA verification failed.";
    }
}
?>
