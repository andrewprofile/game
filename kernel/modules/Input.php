<?php

class Input {

    private $kernel;

    public function __construct(Kernel $kernel)
    {
        $this->kernel=$kernel;
        $this->Router();
    }
    public function Router()
    {
        $this->HTTP($_GET, INPUT_GET, 'get');
        $this->HTTP($_POST, INPUT_POST, 'post');
        $this->HTTP($_COOKIE, INPUT_COOKIE, 'cookie');
        $this->HTTP($_SERVER, INPUT_SERVER, 'server');
    }
    public function HTTP($data, $type, $name)
    {
        if(is_array($data))
        {
            foreach($data as $key => $value)
            {
                $data[$key] = filter_input($type, $key, FILTER_SANITIZE_SPECIAL_CHARS);
                $this->kernel->modules('data')->setData($name, $data);
            }
        }

    }





}







?>