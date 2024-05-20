<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST['first-name'];
    $lastName = $_POST['last-name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $city = $_POST['city'];
    $state = $_POST['state'];
    $zip = $_POST['zip'];
    $referredBy = $_POST['referred-by'];
    $issueSubject = $_POST['issue-subject'];
    $issueDetails = $_POST['issue-details'];
    $deviceMake = $_POST['device-make'];
    $liquidDamaged = $_POST['liquid-damaged'];
    $devicePassword = $_POST['device-password'];
    $country = $_POST['country'];
    $shippingMethod = $_POST['shipping-method'];
    $additionalServices = $_POST['additional-services'];
    $termsAgree = isset($_POST['terms-agree']) ? "Yes" : "No";
    $signatureData = $_POST['signature-data'];

    $to = "support@hardwarerepairdepot.com";
    $subject = "New Device Repair Request from $firstName $lastName";
    $message = "
    <html>
    <head>
    <title>New Device Repair Request</title>
    </head>
    <body>
    <h2>Contact Information</h2>
    <p><strong>Name:</strong> $firstName $lastName</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Phone:</strong> $phone</p>
    <p><strong>Address:</strong> $address</p>
    <p><strong>City:</strong> $city</p>
    <p><strong>State/Province:</strong> $state</p>
    <p><strong>Zip/Postal Code:</strong> $zip</p>
    <p><strong>Referred By:</strong> $referredBy</p>

    <h2>Issue Details</h2>
    <p><strong>Issue Subject:</strong> $issueSubject</p>
    <p><strong>Issue Details:</strong> $issueDetails</p>
    <p><strong>Device Make/Model:</strong> $deviceMake</p>
    <p><strong>Liquid Damaged:</strong> $liquidDamaged</p>
    <p><strong>Device Password:</strong> $devicePassword</p>
    <p><strong>Country:</strong> $country</p>
    <p><strong>Shipping Method:</strong> $shippingMethod</p>
    <p><strong>Additional Services:</strong> $additionalServices</p>

    <h2>Agreement</h2>
    <p><strong>Agreed to Terms:</strong> $termsAgree</p>
    <p><strong>Signature:</strong></p>
    <img src='$signatureData' alt='Signature' />

    </body>
    </html>
    ";

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    $headers .= "From: <$email>" . "\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "<h2>Thank you, your form has been submitted successfully.</h2>";
        echo "<p>You will receive an email with further instructions shortly.</p>";
    } else {
        echo "<h2>Sorry, there was an error processing your request. Please try again later.</h2>";
    }
} else {
    echo "<h2>Invalid request method.</h2>";
}
?>
