<?php include("header.html"); ?>
<div class="modal">
    <div class="modal-button modal-close" type="button" onClick="closeModal();"></div>
    <div class="modal-content"></div>
</div>
<nav>
    <div onClick="openModal(this.id);" id="am" class="nav-item"></div>
    <div onClick="openModal(this.id);" id="ve" class="nav-item"></div>
    <div onClick="openModal(this.id);" id="wp" class="nav-item"></div>
    <div onClick="openModal(this.id);" id="dm" class="nav-item"></div>
    <div onClick="openModal(this.id);" id="rp" class="nav-item"></div>
    <div onClick="openModal(this.id);" id="tm" class="nav-item"></div>
</nav>
<script src="js/v2.3/javascript.js"></script>
<?php include("footer.html"); ?>
