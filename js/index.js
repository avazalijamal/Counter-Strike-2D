
window.addEventListener("load",function(){
    
    const loadding=document.querySelector("#loadding");

    const sound_1=new Audio("./audio/g3sg1_slide.mp3");
    const sound_2=new Audio("./audio/letsgo.mp3");
    
    const w=window.innerWidth;
    const h=window.innerHeight;
    var X,Y;

    const screen=document.querySelector("#screen");
    const killCount=document.querySelector("#kill");
    const bullet=document.querySelector("#bullet");
    const gun=document.querySelector("#gun");
    const cursor=document.querySelector("#cursor");


    window.setTimeout(function(){

        loadding.classList.add('hidden');
        Start();

    },5000);

    //start game
    function Start(){

           
            
            window.setTimeout(function(){
                sound_1.play();

                window.setTimeout(function(){
                    sound_2.play();
                },500);

            },500);

            
            let bulletCount=11;
            killCount.innerText="0";

            gunFill(bulletCount);
            
            // fill the gun
            function gunFill(n){
                bullet.innerHTML="";
                for(let i=0;i<n;i++){
                    let b=document.createElement("img");
                    b.setAttribute("src","./img/bullet.png");
                    bullet.appendChild(b);
                }
            }


            //cursor move
            screen.addEventListener("mousemove",function(e){

                let x=e.pageX;
                let y=e.pageY;

                if((x>100) && x<(w-100) && y<(h-100) && (y>100) ){
                    X=x;
                    Y=y;
                } 
                
                cursor.style.left=`${X-15}px`;
                cursor.style.top=`${Y-15}px`;
            

            });

            //attack gun
            screen.addEventListener("click",function(e){

                if(bulletCount>0){

                    let x=e.pageX;
                    let y=e.pageY;
                    
                    if((x>100) && x<(w-100) && y<(h-100) && (y>100) ){
                        X=x;
                        Y=y;
                    } 

                    gun.setAttribute("src","./img/atac.png");

                    (new Audio("./audio/galil-1.mp3")).play();

                    window.setTimeout(function(){
                        gun.setAttribute("src","./img/gun.png");
                    },200);
                        
                        let injury=document.createElement("img");
                        injury.setAttribute("src","./img/injury.png");
                        injury.classList.add("injury");
                        injury.style.left=`${X-15}px`;
                        injury.style.top=`${Y-15}px`;
                        screen.appendChild(injury);

                        window.setTimeout(function(){
                            screen.removeChild(injury);
                        },3000);

                        
                        gunFill(--bulletCount);

                }else{
                    (new Audio("./audio/galil_boltpull.mp3")).play();
                }

            });





            //enemy create

            const enemyInterval_1=window.setInterval(function(){
                let enemy=document.createElement("img");
                enemy.setAttribute("src","./img/enemy.gif");
                enemy.classList.add("enemy","enemy-1");
                screen.appendChild(enemy);
                
                let kill=window.setTimeout(function(){
                    screen.removeChild(enemy);
                },3000);
                
                enemy.addEventListener("click",function(){
                    if(bulletCount>0){
                        window.clearTimeout(kill);
                        screen.removeChild(enemy);
                        killCount.innerText=`${parseInt(killCount.innerText)+1}`;
                    }
                });
                
            },6000);
            
            const enemyInterval_2=window.setInterval(function(){
                let enemy=document.createElement("img");
                enemy.setAttribute("src","./img/enemy.gif");
                enemy.classList.add("enemy","enemy-2");
                screen.appendChild(enemy);

                let kill=window.setTimeout(function(){
                    screen.removeChild(enemy);
                },3000);
                
                enemy.addEventListener("click",function(){
                    if(bulletCount>0){
                        window.clearTimeout(kill);
                        screen.removeChild(enemy);
                        killCount.innerText=`${parseInt(killCount.innerText)+1}`;
                    }
                });      

            },10000);

    }

});