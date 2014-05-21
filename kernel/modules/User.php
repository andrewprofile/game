<?php

class User {

    private $kernel;
    private $group;
    private $login;
    private $level;
    private $gold;

    public function __construct(Kernel $kernel)
    {
        $this->kernel=$kernel;
    }
    public function checkLogin()
    {
        $user_id = $this->kernel->modules('data')->getData('user_id');
        $stmt = $this->kernel->modules('database')->select('users', '`user_id` = \''.$user_id.'\'');

        foreach($stmt as $row)
        {
            $this->login = $row['user_login'];
        }
        return $this->login;
    }
    public function checkLevel()
    {
        $user_id = $this->kernel->modules('data')->getData('user_id');
        $stmt = $this->kernel->modules('database')->select('users', '`user_id` = \''.$user_id.'\'');

        foreach($stmt as $row)
        {
            $this->level = $row['user_level'];
        }
        return $this->level;
    }
    public function checkGold()
    {
        $user_id = $this->kernel->modules('data')->getData('user_id');
        $stmt = $this->kernel->modules('database')->select('users', '`user_id` = \''.$user_id.'\'');

        foreach($stmt as $row)
        {
            $this->gold = $row['user_gold'];
        }
        return $this->gold;
    }
    public function checkGroup()
    {
        $user_id = $this->kernel->modules('data')->getData('user_id');
        $stmt = $this->kernel->modules('database')->select('users', '`user_id` = \''.$user_id.'\'');

        foreach($stmt as $row)
        {
            $this->group = $row['user_group'];
        }
        return $this->group;
    }





}







?>