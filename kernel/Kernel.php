<?php

class Kernel {

    public $modules = array();
    public $libs = array();
    public function autoload($class)
    {
        $file = 'kernel/modules/'.$class.'.php';
        if (file_exists($file) && is_readable($file) && !class_exists($class, false)){
            require_once($file);
        }else{
            return false;
        }
    }
    public function __construct()
    {
        spl_autoload_register(array($this,'autoload'));

        $this->modules('data');
        $this->modules('session');
        $this->modules('input');
        $this->startApplication();
    }
    public function modules($module)
    {
        $module = ucfirst($module);
        if(isset($this->modules[$module]))
        {
            return $this->modules[$module];
        } else {
            $this->modules[$module] = new $module($this);
            return $this->modules[$module];
        }
    }
    public function libs($lib)
    {
        if(file_exists("applications/libs/$lib.php"))
        {
            require_once "applications/libs/$lib.php";
            $lib = ucfirst($lib);
            $this->libs[$lib] = new $lib($this);
            return $this->libs[$lib];
        } else
        {
            trigger_error('There are the library!', E_USER_ERROR);
        }
    }
    public function startApplication()
    {
        $app = $this->modules('data')->getData('app_default');
        $module = $this->modules('data')->getData('module_default');
        $section = $this->modules('data')->getData('section_default');

        if(isset($_GET['app'])) $app = $this->modules('data')->getData('get')['app'];
        if(isset($_GET['module'])) $module = $this->modules('data')->getData('get')['module'];
        if(isset($_GET['section'])) $section = $this->modules('data')->getData('get')['section'];

        $this->modules('data')->setData('app', $app);
        $this->modules('data')->setData('module', $module);
        $this->modules('data')->setData('section', $section);

        if(!file_exists(root."/applications/$app/modules/$module/sections/$section.php"))
        {
            trigger_error('There are no such section!', E_USER_ERROR);
        } else {
            require_once(root."/applications/$app/modules/$module/sections/$section.php");
            $class = $app.'_'.$module.'_'.$section;
            new $class($this);
        }

    }



















}








?>