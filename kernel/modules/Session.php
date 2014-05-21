<?php

class Session {

    private $kernel;
    private $sessionID;

    public function __construct(Kernel $kernel)
    {
        $this->kernel=$kernel;
        $this->getSession();
        $this->eraseSessions();
        //$this->user_id = 0;
        if(strlen(isset($_COOKIE['user'])) > 64 || !isset($_COOKIE['user']))
        {
            $_COOKIE['user'] = NULL;
            //$user_id = 0;
        }
        if (!isset($_COOKIE["user"])){
            $this->createSession(0);
            return;
        }

        $stmt = $this->kernel->modules('database')->select("sessions", '`session_id` = \''.$_COOKIE['user'].'\'');
        foreach($stmt as $row)
        {
            $user_id = $row['session_user'];
            
        }
       //var_dump($user_id);
       if(!isset($user_id )) $user_id  = 0;
        $this->kernel->modules('data')->setData('user_id', $user_id);
    }
    public function createSession($user_id)
    {
        setcookie("user", $this->sessionID, time()+86400);
        $stmt = $this->kernel->modules('database')->insert("sessions", array(
            "session_id" => $this->sessionID,
            "session_user" => $user_id,
            "session_ip" => $_SERVER['REMOTE_ADDR'],
            "session_browser" => $_SERVER['HTTP_USER_AGENT'],
            "session_time" => time()+86400
        ));
        $this->kernel->modules('data')->setData('user_id', $user_id);
    }
    private function eraseSessions()
    {
        $this->kernel->modules('database')->delete('sessions', '`session_time` < \''.(time()-86400).'\'');
    }
    public function eraseSession($cookie)
    {
        setcookie("user", "", time()-86400);
        $stmt = $this->kernel->modules('database')->delete('sessions', '`session_id` = \''.$cookie.'\'');
    }
    private function getSession()
    {
        $this->sessionID = sha1(uniqid(rand(), true));
    }





}







?>