<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8" />
    <title>Mleneso</title>
    <link rel="stylesheet" type="text/css" href="<?php echo $this->kernel->modules('template')->templateDir() ?>/style/style.css" media="screen">
    <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
    <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
    <script src="public/js/popup.js"></script>
    <script>
        jQuery(window).load(function(){
            jQuery('#loading').fadeOut(1000);
        });
    </script>
</head>
<body>
<div id="loading">
    <div id="loading-center">
        <div class="loading-wrap">
            <div class="triangle1"></div>
            <div class="triangle2"></div>
            <div class="triangle3"></div>
        </div>
    </div>
</div>


