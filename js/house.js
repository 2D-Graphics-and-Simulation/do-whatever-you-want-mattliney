class House {
    constructor (pPosition, pScale, pRotation) {
        this.mPosition = pPosition;
        this.setScale(pScale);
        this.setRotation(pRotation);
        this.initialiseSceneGraph();
        this.mVelocity = new Vector(150,0,1);
        this.mRotationRate = 5;
    }

    getPosition() {
        return this.mPosition;
    }

    setPosition(pPosition) {
        this.mPosition = pPosition;
    }

    setScale(pScale) {
        this.mScale = pScale;
    }

    getScale() {
        return this.mScale;
    }

    setRotation(pRotation) {
        this.mRotation = pRotation;
    }

    getRotation() {
        return this.mRotation;
    }

    setNode(pNode) {
        this.mNode = pNode;
    }

    getNode() {
        return this.mNode;
    }

    initialiseSceneGraph() {
        var translation, rotation, scale, translationNode, rotationNode, scaleNode, 
        wallTransformation, roofTranslation, doorTranslation, windowTranslation1, windowTranslation2,
        wallTransformationNode, roofTranslationNode, doorTranslationNode, windowTranslation1Node, windowTranslation2Node;

        translation = Matrix.createTranslation(this.mPosition);
        translationNode = new SceneGraphNode(translation);

        rotation = Matrix.createRotation(this.getRotation());
        rotationNode = new SceneGraphNode(rotation);

        scale = Matrix.createScale(this.getScale());
        scaleNode = new SceneGraphNode(scale);

        translationNode.addChild(rotationNode);
        rotationNode.addChild(scaleNode);

        wallTransformation = Matrix.createTranslation(new Vector(0,0));
        roofTranslation = Matrix.createTranslation(new Vector(0, -125));
        doorTranslation = Matrix.createTranslation(new Vector(0, 25));
        windowTranslation1 = Matrix.createTranslation(new Vector(60, 0));
        windowTranslation2 = Matrix.createTranslation(new Vector(-60, 0));

        wallTransformationNode = new SceneGraphNode(wallTransformation);
        roofTranslationNode = new SceneGraphNode(roofTranslation);
        doorTranslationNode = new SceneGraphNode(doorTranslation);
        windowTranslation1Node = new SceneGraphNode(windowTranslation1);
        windowTranslation2Node = new SceneGraphNode(windowTranslation2);

        scaleNode.addChild(wallTransformationNode);
        scaleNode.addChild(roofTranslationNode);
        scaleNode.addChild(doorTranslationNode);
        scaleNode.addChild(windowTranslation1Node);
        scaleNode.addChild(windowTranslation2Node);

        wallTransformationNode.addChild(new Polygon('#ffffff', this.drawWall()));
        roofTranslationNode.addChild(new Polygon('#ff0000', this.drawRoof()));
        doorTranslationNode.addChild(new Polygon('#964B00', this.drawDoor()));
        windowTranslation1Node.addChild(new Polygon('#add8e6', this.drawDoor()));
        windowTranslation2Node.addChild(new Polygon('#add8e6', this.drawDoor()));
        windowTranslation1Node.addChild(new Polygon('#add8e6', this.drawWindow()));
        windowTranslation2Node.addChild(new Polygon('#add8e6', this.drawWindow()));

        this.setNode(translationNode);
    }

    update(pDeltaTime) {
        var newPosition, newRotation, newScale, newMatrix;

        newPosition = this.getPosition().add((this.mVelocity.multiply(pDeltaTime)));
        this.setPosition(newPosition);
        newMatrix = Matrix.createTranslation(newPosition);

        newScale = this.getScale().add(new Vector(0.5,-0.5,0).multiply(pDeltaTime));
        this.setScale(newScale);
        newMatrix = newMatrix.multiply(Matrix.createScale(newScale));

        newRotation = this.getRotation() + (this.mRotationRate * pDeltaTime);
        this.setRotation(newRotation);
        newMatrix = newMatrix.multiply(Matrix.createRotation(newRotation));

        this.getNode().setLocalMatrix(newMatrix);
    }

    drawWall() {
        var vectors = [];

        vectors.push(new Vector(-100, -75));
        vectors.push(new Vector(-100, 75));
        vectors.push(new Vector(100, 75));
        vectors.push(new Vector(100, -75));
        vectors.push(new Vector(-100, -75));

        return vectors;
    }

    drawRoof() {
        var vectors = [];

        vectors.push(new Vector(-100, 50));
        vectors.push(new Vector(100, 50));
        vectors.push(new Vector(0, -50));
        vectors.push(new Vector(-100, 50));

        return vectors;
    }

    drawDoor() {
        var vectors = [];

        vectors.push(new Vector(-20, -50));
        vectors.push(new Vector(-20, 50));
        vectors.push(new Vector(20, 50));
        vectors.push(new Vector(20, -50));
        vectors.push(new Vector(-20, -50));

        return vectors;
    }

    drawWindow() {
        var vectors = [];
        
        vectors.push(new Vector(0, -50));
        vectors.push(new Vector(0, 50));
        vectors.push(new Vector(0, 0));
        vectors.push(new Vector(-20, 0));
        vectors.push(new Vector(20, 0));

        return vectors;
    }
}