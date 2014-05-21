<?php

class Template {

    private $kernel;
    public $content = NULL;
    public $title = NULL;
    public $activeTemplate = NULL;

    public function __construct(Kernel $kernel)
    {
        $this->kernel=$kernel;

    }
    public function templateDir()
    {
        return 'public/'.$this->activeTemplate();
    }
    public function activeTemplate()
    {
        $stmt = $this->kernel->modules('database')->select("settings");

        foreach($stmt as $row)
        {
            $this->activeTemplate = $row['template'];
        }
        return $this->activeTemplate;
    }
    public function getTemp($name)
    {
        require_once($this->templateDir().'/'.$name.'.php');
    }





}







?>