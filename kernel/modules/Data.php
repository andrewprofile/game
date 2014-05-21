<?php

class Data {

    public $data = array();

    public function __construct(Kernel $kernel)
    {
        require_once("Config.php");
    }

    public function setData($name, $value)
    {
        $data = $this->data[$name] = $value;
        return $data;
    }
    public function getData($name)
    {
        return $this->data[$name];
    }





}







?>