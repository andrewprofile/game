<?php

class Database {

    private $kernel;
    private $dbh;
    private $error;

    public function __construct(Kernel $kernel)
    {
        $this->kernel=$kernel;

        $options = array(
            PDO::ATTR_PERSISTENT    => true,
            PDO::ATTR_ERRMODE       => PDO::ERRMODE_EXCEPTION
        );

        $conn = $this->kernel->modules('data')->getData('database');
        $dsn = 'mysql:host=' . $conn['mysql_host'] . ';dbname=' . $conn['mysql_name'];

        try{
            $this->dbh = new PDO($dsn, $conn['mysql_user'], $conn['mysql_pass'], $options);
        }
        catch(PDOException $e){
            $this->error = $e->getMessage();
        }
    }
    public function insert($table, $data)
    {
        $keys = array_keys($data);
        $keys = implode(", ", $keys);
        $data = implode("', '", $data);

        $sql = 'INSERT INTO `'.$table.'` ('.$keys.') VALUES (\''.$data.'\')';
        $this->dbh->query($sql);
    }
    public function update($table, $data, $where='')
    {
        foreach($data as $key=>$value)
        {
            $inputs[] = " $key ='".$value."'";
        }
        if(empty($where)) $sql = 'UPDATE '.$table.' SET '.implode( ',', $inputs ).'';
        else $sql = 'UPDATE '.$table.' SET '.implode( ',', $inputs ).' WHERE '.$where.'';
        $this->dbh->query($sql);
    }
    public function select($table, $where='')
    {
        if(empty($where)) return $this->dbh->query("SELECT * from $table");
        else return $this->dbh->query("SELECT * from $table WHERE $where");
    }
    public function delete($table, $where='')
    {
        if(empty($where)) $this->dbh->query("DELETE from $table");
        else $this->dbh->query("DELETE from $table WHERE $where");
    }





}




?>
