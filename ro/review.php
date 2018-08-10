<?php 
 
$sendto   = "kids.library.apps@gmail.com";
$username = $_POST['name'];
$usermail = $_POST['email'];
$userapp = $_POST['app']; 
$usersystem = $_POST['system']; 
$usermessage = $_POST['message'];

// Формирование заголовка письма
$subject  = "Kids' Library Apps: Review";
$headers  = "From: " . strip_tags($usermail) . "\r\n";
$headers .= "Reply-To: ". strip_tags($usermail) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
 
// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Отзыв с сайта.</h2>\r\n";
$msg .= "<p><strong>От кого:</strong> ".$username."</p>\r\n";
$msg .= "<p><strong>Почта:</strong> ".$usermail."</p>\r\n";
$msg .= "<p><strong>Приложение:</strong> ".$userapp."</p>\r\n";
$msg .= "<p><strong>Платформа:</strong> ".$usersystem."</p>\r\n";
$msg .= "<p><strong>Cообщение:</strong> ".$usermessage."</p>\r\n";
$msg .= "</body></html>";
 
// отправка сообщения
@mail($sendto, $subject, $msg, $headers);
 
try {
    header("Location: ./support.html");
} catch (Exception $e) {
    echo 'Выброшено исключение: ',  $e->getMessage(), "\n";
}

exit;
?>