<?php
use PHPMailer\PHPMailer\PHPMailer;
require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $to = "sai143seven@gmail.com";
    $subject = "New Address Submission";

    $body = "";
    foreach ($_POST as $key => $value) {
        $body .= ucfirst($key) . ": " . htmlspecialchars($value) . "\n";
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.resend.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'resend';
        $mail->Password = 're_id1tMrwr_9BC81gfMgjANLSq1NF78VUmb';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('onboarding@resend.dev', 'Address Form');
        $mail->addAddress($to);
        $mail->Subject = $subject;
        $mail->Body = $body;

        $mail->send();
        header("Location: order.html");
        exit;
    } catch (Exception $e) {
        echo "Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
