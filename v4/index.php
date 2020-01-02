<?php include("header.html"); ?>
<div class="projects">
    <div class="project" type="button" id="maths24" onClick="openProject(this.id);">
        <p class="project-summary"><span class="project-title">Maths24</span>
            A poker game that was popular when I was a kid in Shanghai.
            I made this game to memorize my childhood and completed the programming through JavaScript.
        </p>
        <div><img class="project-pic" src="media/maths24.png" alt="Game Maths24" /></div>
    </div>
    <div class="project middle" type="button" id="happy" onClick="openProject(this.id);">      
        <p class="project-summary"><span class="project-title">Happy 123</span>
            An online event at 45R to celebrate the chief designer's birthday on January 23rd. 
            Customers can get a handcrafted bag with $300 online purchase on 1-23.
        </p>
        <div><img class="project-pic" src="media/happy-0.png" alt="Happy 123 Project" /></div>
    </div>
    <div class="project" type="button" id="roland" onClick="openProject(this.id);">       
        <p class="project-summary"><span class="project-title">Roland DG Fab12</span>
            A product exhibition targeting digital makers to promote Roland DG’s fabrication machines 
            in a yearly event, “Fab12” hosted by MIT in Shenzhen, China.
        </p>
        <div><img class="project-pic" src="media/roland-0.png" alt="Roland DG Fab12 Project" /></div>
    </div>

</div>
<?php include("footer.html"); ?>