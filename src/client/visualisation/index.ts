import {Observable} from "rxjs";
declare var createjs;

export module Drawing{
    
    let stage;
    let width = 500;
    let height = 600;
    let marbles:any = [];
    let interval:any = null;

    stage = new createjs.Stage("drawing");
    
    export function init(obs:Observable<any>){

        obs        
        .subscribe(source=>{
            if(Array.isArray(source)){
                source.forEach((marble, i) => {
                    marble = getMarble(marble);
                    marbles.push(marble);        
                    marble.y = 20;
                    stage.addChild(marble); 
                });   
            }else{         
                source = getMarble(source);             
                marbles.push(source); 
                source.y = 20;       
                stage.addChild(source); 
            }

        });
        
    }

    export function start(){
       
        interval =  setInterval(()=>{

            let unique = marbles.reduce((r,c)=>{
                    
                    if(r.indexOf(c) === -1)
                        r.push(c);

                    return r;
                },[]);

            for(let i=0;i<unique.length;i++){
                
                let marble = unique[i];
                    marble.y = marble.y + 1.5;

                if(marble.y >  height){
                    let idx = marbles.indexOf(marble);                                
                    marbles.splice(idx,1);
                    stage.removeChild(marble);
                }

            }

            stage.update();

        },25);

    }

    export function clear(){
        marbles = [];
        stage.removeAllChildren();
        stage.update();

        if(interval){
            clearTimeout(interval);
            interval = null;
        }

    }

    export function getMarble(conf:{color:string; x:number, y?:number, txt?:string} = {color:"DeepSkyBlue", x:20}){
        
        var container = new createjs.Container();

        var label = new createjs.Text(conf.txt || "M", "20px Arial", "#000");
        var circle = new createjs.Shape();
            circle.graphics.beginFill(conf.color).drawCircle(0, 0, 30);
            
            container.addChild(circle);
            container.addChild(label);

            var b = label.getBounds();
            label.x = -b.width/2; 
            label.y = -b.height/2;

            container.x = conf.x + 30 
            if(conf.y)
                container.y = conf.y;
            else
                container.y = 20;
            
        return container;
    }

}