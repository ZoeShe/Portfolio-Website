<?php
header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
?>

<?php include("header.html"); ?>

<nav>
    <a href="#artwork_manufacturing">
        <div class="nav-item am">
        </div>
    </a>
    <a href="#video_editing">
        <div class="nav-item ve">
        </div> 
    </a>
    <a href="#website_productions">
        <div class="nav-item wp">
        </div>
    </a>
    <a href="#digital_marketing">
        <div class="nav-item dm">
        </div>
    </a>
    <a href="#research_presentations">
        <div class="nav-item rp">
        </div>
    </a>
    <a href="#3d_modeling">
        <div class="nav-item tm">
        </div>
    </a>

</nav>


<div class="popup" id="video_editing">
    <div class="popup_container">
        <?php include("video_editing.html"); ?>
    </div>
</div>

<div class="popup" id="website_productions">
    <div class="popup_container">
        <?php include("website_productions.html"); ?>
    </div>
</div>

<div class="popup" id="research_presentations">
    <div class="popup_container">
        <?php include("research_presentations.html"); ?>
    </div>
</div>

<div class="popup" id="digital_marketing">
    <div class="popup_container">
        <?php include("digital_marketing.html"); ?>
    </div>
</div>

<div class="popup" id="exhibition_booths">
    <div class="popup_container">
        <?php include("exhibition_booths.html"); ?>
    </div>
</div>

<div class="popup" id="3d_modeling">
    <div class="popup_container">
        <?php include("3d_modeling.html"); ?>
    </div>
</div>

<div class="popup" id="artwork_manufacturing">
    <div class="popup_container">
        <?php include("artwork_manufacturing.html"); ?>
    </div>
</div>



<?php include("footer.html"); ?>