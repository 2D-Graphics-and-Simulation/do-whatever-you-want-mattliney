function onLoad() {
    var mainCanvas, mainContext, origin, originMatrix, manPosition, men, i, negative, 
    rootNode, manAngle, thisTime, lastTime, deltaTime, user, string, background, mouseX, mouseY, visitor,
    debug, circle, infectedCount, secondCanvas, secondContext, circle2, square;
    function initialiseCanvasContext() {
        mainCanvas = document.getElementById('mainCanvas');
        secondCanvas = document.getElementById('secondCanvas');
        if (!mainCanvas) {
            alert('Error: I cannot find the canvas element. whoops');
            return;
        }

        mainContext = mainCanvas.getContext('2d');
        if (!mainContext) {
            alert('Error: failed to get context');
            return;
        }

        secondContext = secondCanvas.getContext('2d');
        if (!secondContext) {
            alert('Error: failed to get context');
            return;
        }

        //#region event listeners
        mainCanvas.addEventListener('mousemove', mouse, false);

        window.addEventListener("keydown" , (event) => {
            var key = event.code;

            if(key == 'ArrowRight') {
                user.setAcceleration(new Vector(10,0,0));
                user.setRotationRate(0.7);
            }
            if(key == 'ArrowDown') {
                user.setAcceleration(new Vector(0,10,0));
                user.setRotationRate(0.7);
            }
            if(key == 'ArrowLeft') {
                user.setAcceleration(new Vector(-10,0,0));
                user.setRotationRate(0.7);
            }
            if(key == 'ArrowUp') {
                user.setAcceleration(new Vector(0,-10,0));
                user.setRotationRate(0.7);
            }
            if(key == 'Space') {
                string += " ";
            }
            if(!event.repeat) {
                if(event.key.length == 1) {
                    string += event.key;
                }
            }
            if(key == 'Backspace') {
                try {
                    string = string.substring(0,string.length-1)
                }
                catch {

                }
            }
            if(key == 'Enter') {
                if(Number.isInteger(parseInt(string)) && string != 0) {
                    user.setMass(string);
                }
                string = "";
            }
            if(key == 'ShiftLeft') {
                if(debug == false) {
                    debug = true;
                }
                else {
                    debug = false;
                }
            }
        });

        window.addEventListener("keyup" , () => {
            user.setAcceleration(new Vector(0, 0,1));
            user.setRotationRate(0);
            user.setRotation(0);
        });
        
        window.addEventListener("mousedown", () => {
            man = new Man(new Vector(mouseX,mouseY), new Vector(0.3,0.3,1),0,'#ffffff');
            men.push(man);
            rootNode.addChild(man.getNode());
        });

        function mouse(pEvent) {
            var rect = pEvent.target.getBoundingClientRect();
            mouseX = Math.round((pEvent.clientX - rect.left) - mainCanvas.width/2) + 1;
            mouseY = Math.round((pEvent.clientY - rect.top) - mainCanvas.height/2) + 1;
        }
        //#endregion

        string = "";
        infectedCount = 0;

        origin = new Vector(mainCanvas.width * 0.5, mainCanvas.height * 0.5);
        originMatrix = Matrix.createTranslation(origin);
        rootNode = initialiseSceneGraph(originMatrix);
        visitor = new RenderVisitor(mainContext);
        generateMen(10);

        debug = false;
        circle = new BouncyBall(new Vector(-200,-200,1), 50, new Vector(randomNumber(),randomNumber(),1));
        circle2 = new BouncyBall(new Vector(200,-200,1), 75, new Vector(randomNumber(),randomNumber(),1));
        square = new Square(150, new Vector(0,0,1));
        lastTime = Date.now()
    }

    function initialiseSceneGraph(pOriginMatrix) {
        var rootNode;
        rootNode = new TransformNode(pOriginMatrix);
        background = new Background(new Vector(0,0,1), new Vector(1,1,1), 0);
        rootNode.addChild(background.getNode());
        user = new player(new Vector(0,0,1), new Vector(0.3,0.3,1), 0, 1, '#a4d17d'); //'#FF69B4'
        rootNode.addChild(user.getNode());
        return rootNode;
    }

    function generateMen(pAmmountOfMen) {
        men = [];
        negative = true;
        manAngle = 0;
        for(i = 0; i < pAmmountOfMen; i+=1) { //creates several men and gives them random positions.
            if(negative == true) {
                manPosition = new Vector(-Math.floor(Math.random() * 501), Math.floor(Math.random() * 101), 1)
                negative = false;
            }
            else {
                manPosition = new Vector(Math.floor(Math.random() * 501), Math.floor(Math.random() * 101), 1)
                negative = true;
            }
            man = new Man(manPosition, new Vector(0.3,0.3,1),manAngle, '#ffffff');
            men.push(man);
        }

        for(i = 0; i < men.length; i += 1) {
            rootNode.addChild(men[i].getNode());
        }
    }

    function randomNumber() {
        return Math.floor(Math.random() * 500);
    }

    function update(pDeltaTime) {
        for(i = 0; i < men.length; i += 1) {
            men[i].update(pDeltaTime);
            if(men[i].getPosition().getX() > mainCanvas.width/2)
            {
                men[i].setPosition(new Vector(-mainCanvas.width/2,Math.random()*200,1));
            }
            else if(men[i].getPosition().getX() < -mainCanvas.width/2)
            {
                men[i].setPosition(new Vector(mainCanvas.width/2,Math.random()*200,1));
            }
        }

        user.update(pDeltaTime);
        if(user.getPosition().getX() > mainCanvas.width/2) {
            user.setPosition(new Vector(-mainCanvas.width/2,user.getPosition().getY(),1));
        }
        else if(user.getPosition().getX() < -mainCanvas.width/2) {
            user.setPosition(new Vector(mainCanvas.width/2,user.getPosition().getY(),1));
        }
        else if(user.getPosition().getY() > mainCanvas.height/2) {
            user.setPosition(new Vector(user.getPosition().getX(), -mainCanvas.height/2,1));
        }
        else if(user.getPosition().getY() < -mainCanvas.height/2) {
            user.setPosition(new Vector(user.getPosition().getX(), mainCanvas.height/2,1));
        }

        checkCollision();
        circle.update(pDeltaTime, secondCanvas);
        circle2.update(pDeltaTime, secondCanvas);
    }

    function checkCollision() {
        var distX, distY, distance;

        for(i = 0; i < men.length; i += 1) {
            distX = men[i].getPosition().getX() - user.getPosition().getX();
            distY = men[i].getPosition().getY() - user.getPosition().getY();
            distance = new Vector(distX,distY,1);
            distance = distance.magnitude();
    
            if(distance <= user.getCollision().checkCollision(men[i].getCollision())) {
                if(men[i].getColour() != user.getColour())
                {
                    men[i].setColour(user.getColour());
                    infectedCount++;
                }
            }
        }

        circle.checkCircleCollision(circle2);
        circle2.checkCircleCollision(circle);

        circle.checkSquareCollision(square);
        circle2.checkSquareCollision(square);
    }

    function drawDistanceVector() {
        secondContext.beginPath();
        secondContext.strokeStyle = "#00ff00";
        secondContext.lineWidth = 5;
        secondContext.lineJoin = 'round';

        secondContext.moveTo(circle.getPosition().getX(), circle.getPosition().getY());
        secondContext.lineTo(circle2.getPosition().getX(), circle2.getPosition().getY());

        secondContext.stroke();
        secondContext.strokeStyle = "#000000";
    }

    function animationLoop() {
        thisTime = Date.now();
        deltaTime = (thisTime - lastTime) / 1000;
        
        update(deltaTime);
        draw();
        lastTime = thisTime;
        requestAnimationFrame(animationLoop);
    }

    function draw() {
        secondContext.fillStyle = "#ffffff";
        secondContext.fillRect(-secondCanvas.width, -secondCanvas.height, secondCanvas.width*2, secondCanvas.height*2);

        visitor.visit(rootNode);

        originMatrix.setTransform(mainContext);
        originMatrix.setTransform(secondContext);
        
        circle.draw(secondContext);
        circle2.draw(secondContext);
        square.draw(secondContext);
        drawDistanceVector();
        
        mainContext.fillStyle = "#000000";
        mainContext.font = "20pt Helvetica";
        mainContext.fillText(string, user.getPosition().getX() - string.length*5, user.getPosition().getY() - 50);
        if(debug == true) {
            mainContext.fillText("X: " + mouseX, -mainCanvas.width*0.49, -mainCanvas.height*0.45);
            mainContext.fillText("Y: " + mouseY, -mainCanvas.width*0.49, -mainCanvas.height*0.4);
            mainContext.fillText("Number of Men: " + men.length, -mainCanvas.width*0.49, -mainCanvas.height*0.35);
            mainContext.fillText("Number of Infected Men: " + infectedCount, -mainCanvas.width*0.49, -mainCanvas.height*0.3);
            mainContext.fillText("Speed: " + Math.round(user.getVelocity()), -mainCanvas.width*0.49, -mainCanvas.height*0.25);
            mainContext.fillText("Current Mass: " + user.getMass(), -mainCanvas.width*0.49, -mainCanvas.height*0.2);
        }
    }
    initialiseCanvasContext();
    animationLoop();
}
window.addEventListener('load',onLoad,false);