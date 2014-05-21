<?php

class user_index_login {

    private $kernel;

    public function __construct(Kernel $kernel)
    {
        $this->kernel = $kernel;
        if($this->kernel->modules('User')->checkGroup() != 'guest') header("Location: ?section=game");
        $this->index();
    }
    public function index()
    {
        $this->kernel->modules('template')->getTemp('header');

        if(isset($_POST['submit']))
        {
            $this->login($_POST['login'], $_POST['password']);
        } else {
            echo <<<END
<form action="" method="post">
<input type="text" name="login" value="Login"/><br />
<input type="password" name="password" value="Login"/><br />
<input type="submit" name="submit" value="Zaloguj"/>
</form>
END;
        }


    }
    public function login($login, $password)
    {
        $login = $this->kernel->modules('data')->getData('post')['login'];
        $password = sha1($password);

        $stmt = $this->kernel->modules('database')->select("users",'`user_login` = \''.$login.'\' AND `user_password` = \''.$password.'\'');

        foreach($stmt as $row)
        {
            $user_id = $row['user_id'];
        }

        if($stmt->rowCount() == 1)
        {
            $this->kernel->modules('session')->erasesession($_COOKIE['user']);
            $this->kernel->modules('session')->createSession($user_id);
        } else {
            echo "Zły login bądź hasło";
        }

    }





}






?>