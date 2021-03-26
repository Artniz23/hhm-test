<?php

class ConnectDB {

    private $pdo;
    private $database_host = 'localhost';
    private $database_user = 'user';
    private $database_pass = '230597';
    private $database_db = 'web_developer';
    private $database_charset = 'utf8';

    private static $instance;

    private function __construct()
    {
        $dsn = "mysql:host=$this->database_host;dbname=$this->database_db;charset=$this->database_charset";
        
        $opt = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ];

        try {
            $this->pdo = new PDO($dsn, $this->database_user, $this->database_pass, $opt);
        } catch(PDOException $e) {
            die("Connect Error" . $e);
        }
    }

    private function __clone()
    {
        
    }

    private function __wakeup()
    {
        
    }

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new static();
        }

        return self::$instance;
    }

    public function addFeedbackData($data)
    {
        $sql = "INSERT INTO `feedback` (name, email, text) VALUES (:name, :email, :text)";
        $stmt = self::$instance->pdo->prepare($sql);
        $stmt->bindValue(':name', $data['name'], PDO::PARAM_STR);
        $stmt->bindValue(':email', $data['email'], PDO::PARAM_STR);
        $stmt->bindValue(':text', $data['text'], PDO::PARAM_STR);
        $stmt->execute();
    }

    public function getMessageData()
    {
        $sql = "SELECT `name`, `email`, `text` FROM `feedback`";
        $stmt = self::$instance->pdo->prepare($sql);
        $stmt->execute();

        return json_encode(['data' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
    }
}