<?php

require_once 'db.php';

$feedback = ConnectDB::getInstance();

if (isset($_POST['form_data'])) {
    $form_data = json_decode($_POST['form_data'], true);
    $validate_data = [];
    foreach ($form_data as $key => $value) {
        $validate_data[$key] = htmlspecialchars($value);
    }
    $feedback->addFeedbackData($validate_data);
    echo json_encode(['data' => ['name' => $validate_data['name'], 'email' => $validate_data['email'], 'text' => $validate_data['text']]]);
}

if (isset($_GET['get_data'])) {
    echo $feedback->getMessageData();
}