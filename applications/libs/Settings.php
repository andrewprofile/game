<?php
class Settings {

    public function __construct(Kernel $kernel)
    {
        $this->kernel = $kernel;
    }

    public function getMap()
    {
        $user_id = $this->kernel->modules('data')->getData('user_id');
        $stmt = $this->kernel->modules('database')->select('users', '`user_id` = \''.$user_id.'\'');

        foreach($stmt as $row)
        {
            $map = $row['user_map'];
        }
        return $map;
    }
    public function getMapCord($cord)
    {
        $user_id = $this->kernel->modules('data')->getData('user_id');
        $stmt = $this->kernel->modules('database')->select('users', '`user_id` = \''.$user_id.'\'');

        foreach($stmt as $row)
        {
            $cord = $row['user_pos'.$cord];
        }
        return $cord;
    }
    public function getMapCord2($cord)
    {
        $user_id = $this->kernel->modules('data')->getData('user_id');
        $stmt = $this->kernel->modules('database')->select('users', '`user_id` = \''.$user_id.'\'');

        foreach($stmt as $row)
        {
            $cord = $row['user_map'.$cord];
        }
        return $cord;
    }
    public function getSkin()
    {
        $user_id = $this->kernel->modules('data')->getData('user_id');
        $stmt = $this->kernel->modules('database')->select('users', '`user_id` = \''.$user_id.'\'');

        foreach($stmt as $row)
        {
            $skin = $row['user_skin'];
        }
        return $skin;
    }
    public function getDoors()
    {
        $map = $this->getMap();
        $doors = null;

        $stmt = $this->kernel->modules('database')->select("doors", '`map` = \''.$map.'\'');

        foreach($stmt as $row)
        {
            $doors .= <<<END
<div id="{$row['id']}" class="door" style="left:{$row['x']}px; top:{$row['y']}px; background-image:url(https://cdn1.iconfinder.com/data/icons/orb/32/7.png);"></div>
END;
        }
        return $doors;
    }
    public function getItems()
    {
        $items = null;
        $name_item = null;
        $user_id = $this->kernel->modules('data')->getData('user_id');
        //$stmt = $this->kernel->modules('database')->select('items_users', '`user` = \''.$user_id.'\' AND `in_equip` = \'0\'  ORDER BY ID DESC LIMIT 56');
        $stmt = $this->kernel->modules('database')->select('items_users', '`user` = \''.$user_id.'\' AND `in_equip` = \'0\'  ORDER BY ID DESC LIMIT 56');

        foreach($stmt as $row)
        {
            $name_item = $row['name'];
            $eq = $row['in_equip'];
            $number = $row['number'];

            $stmt = $this->kernel->modules('database')->select('items', '`name` = \''.$name_item.'\'');

            foreach($stmt as $row)
            {
                if($row['rank'] == 'Prosty') $rank = '<b>'.$row['rank'].'</b>';
                if($row['rank'] == 'Elitarny') $rank = '<b style="color:#0094b3;">'.$row['rank'].'</b>';

                    $items .= '<li class="item'.$row['type'].'"><img data-item="'.$row['type'].'" class="item" id="'.$row['id'].'" src="public/items/'.$row['image'].'.png"/>
                    <span><p>
                    <b>'.$row['name'].'</b>
                    <br />'.$rank.'
                    <br /><b>Typ:</b> '.$row['type'].'
                    <br /><b>Wymagany poziom: </b>'.$row['level'].'
                    <br /><b>Wartość: </b>'.$row['price'].'
                    <br /><b class="'.$row['id'].'">Ilość: '.$number.'</b>
                    </p></span>

                    </li>';
            }
        }
        return $items;
    }
    public function getItem($name)
    {
        $item = null;
        $name_item = null;
        $user_id = $this->kernel->modules('data')->getData('user_id');
        $stmt = $this->kernel->modules('database')->select('items_users', '`user` = \''.$user_id.'\' AND `in_equip` = \'1\'');

        foreach($stmt as $row)
        {
            $name_item = $row['name'];
            $stmt = $this->kernel->modules('database')->select('items', '`name` = \''.$name_item.'\' AND `type` = \''.$name.'\'');

            foreach($stmt as $row)
            {
                $item .= '<img data-item="'.$row['type'].'" class="item_eq '.$row['type'].'" id="'.$row['id'].'" src="public/items/'.$row['image'].'.png">
                <span>test</span></img>';
            }
        }
        return $item;
    }
    public function getMonsters()
    {
        $map = $this->getMap();
        $monsters = null;

        $stmt = $this->kernel->modules('database')->select("monsters", '`map` = \''.$map.'\'');

        foreach($stmt as $row)
        {
            $monsters .= <<<END
<div class="tip"><div id="{$row['id']}" data-name="{$row['name']}" class="monster {$row['name']}" style="width:{$row['width']}px; height:{$row['height']}px; left:{$row['x']}px; top:{$row['y']}px; background-image:url(public/outfits/{$row['image']});"><span class="tool"><p>{$row['name']} [{$row['level']}]<br /> {$row['rank']}</p></span></div></div>
END;
        }
        return $monsters;
    }
    public function getSkills()
    {
        $skills = null;
        $user_id = $this->kernel->modules('data')->getData('user_id');
        $stmt = $this->kernel->modules('database')->select('skills_users', '`user` = \''.$user_id.'\'');

        foreach($stmt as $row)
        {
            $name = $row['name'];

            $stmt = $this->kernel->modules('database')->select('skills', '`name` = \''.$name.'\'');

            foreach($stmt as $row)
            {
                $skills .= <<<END
<li class="skill" id="{$row['name']}" title="{$row['name']}"><img src="public/skills/{$row['image']}.png"/></li>
END;
            }
        }
        return $skills;
    }
    public function getNpcs()
    {
        $map = $this->getMap();
        $npcs = null;

        $stmt = $this->kernel->modules('database')->select("npcs", '`map` = \''.$map.'\'');

        foreach($stmt as $row)
        {
            $npcs .= <<<END
<div class="tip"><div id="{$row['id']}" data-name="{$row['name']}" class="npc {$row['name']}" style="width:{$row['width']}px; height:{$row['height']}px; left:{$row['x']}px; top:{$row['y']}px; background-image:url(public/outfits/{$row['image']});"><span class="tool"><p>{$row['name']} [{$row['level']}]<br /> {$row['rank']}</p></span></div></div>
END;
        }
        return $npcs;
    }
    public function getStat($what)
    {
        $user_id = $this->kernel->modules('data')->getData('user_id');
        $stmt = $this->kernel->modules('database')->select('users', '`user_id` = \''.$user_id.'\'');

        if($what == 'exp')
        {
            $stmt = $this->kernel->modules('database')->select('users', '`user_id` = \''.$user_id.'\'');
            foreach($stmt as $row)
            {
                $stat = $row['user_exp'];
            }
            $level = $this->kernel->modules('User')->checkLevel() +1;
            $stmt = $this->kernel->modules('database')->select('exp', '`level` = \''.$level.'\'');
            foreach($stmt as $row)
            {
                $fullstat = $row['tolevel'];
                $stat = $stat/$fullstat * 100;
            }
            return $stat;
        } else {
            foreach($stmt as $row)
            {
                $fullstat = $row['user_full'.$what];
                $stat = $row['user_'.$what];
                $stat = $stat/$fullstat * 100;
            }
            return $stat;
        }
    }

}
?>