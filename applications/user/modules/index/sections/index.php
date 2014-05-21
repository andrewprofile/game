<?php

class user_index_index {

    private $kernel;

    public function __construct(Kernel $kernel)
    {
        $this->kernel = $kernel;
        $this->index();
    }
    public function index()
    {
        $this->kernel->modules('template')->getTemp('header');
        //erasesession(cookie) potem $this->kernel->modules('session')->createSession(1);


        echo '<h1><a href="?section=game&account=1">Konto 1</a>';
        echo '<h1><a href="?section=game&account=2">Konto 2</a>';
        echo '<h1><a href="?section=game&account=3">Konto 3</a>';


    }





}






?>