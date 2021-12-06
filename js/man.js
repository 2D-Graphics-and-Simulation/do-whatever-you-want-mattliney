class Man {
    constructor (pPosition, pScale, pRotation, pColour) {
        this.mPosition = pPosition;
        this.mColour = pColour;
        this.mHeadColourNode;
        this.mBodyColourNode;
        this.setScale(pScale);
        this.setRotation(pRotation);
        this.initialiseSceneGraph();

        this.mVelocity = new Vector(this.randomNumber(-100,100),0,1);
        this.mRotationRate = this.randomNumber(0.3,0.5);
        this.mNegative = false;

        this.mCollision = new circleCollider(this.mPosition, 50, 0);
        this.mIsColliding = false;
    }

    randomNumber(pMin, pMax) {
        var random, rounded; 
        random = Math.random()* (pMax * 2);
        rounded = Math.round(random) + pMin;
        return rounded;
    }

    //#region Get/Set

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

    setColour(pColour) {
        this.mColour = pColour;
    }

    getColour() {
        return this.mColour;
    }

    setNode(pNode) {
        this.mNode = pNode;
    }

    getNode() {
        return this.mNode;
    }

    setVelocity(pVelocity) {
        this.mVelocity = pVelocity;
    }

    getVelocity() {
        return this.mVelocity;
    }

    getCollision() {
        return this.mCollision;
    }
    //#endregion

    initialiseSceneGraph() {
        var translation, rotation, scale, translationNode, rotationNode, scaleNode,
        headTranslation, eye1Translation, eye2Translation,mouthTranslation, bodyTranslation, headTranslationNode,
        eye1TranslationNode, eye2TranslationNode, mouthTranslationNode, mouthTranslationNode, bodyTranslationNode,
        headColourNode, bodyColourNode;

        translation = Matrix.createTranslation(this.mPosition);
        translationNode = new TransformNode(translation);

        rotation = Matrix.createRotation(this.getRotation());
        rotationNode = new TransformNode(rotation);

        scale = Matrix.createScale(this.getScale());
        scaleNode = new TransformNode(scale);

        translationNode.addChild(rotationNode);
        rotationNode.addChild(scaleNode);

        headTranslation = Matrix.createTranslation(new Vector(0,-100));
        eye1Translation = Matrix.createTranslation(new Vector(-20,-120));
        eye2Translation = Matrix.createTranslation(new Vector(20,-120));
        mouthTranslation = Matrix.createTranslation(new Vector(0,-90));
        bodyTranslation = Matrix.createTranslation(new Vector(0,150));

        headTranslationNode = new TransformNode(headTranslation);
        eye1TranslationNode = new TransformNode(eye1Translation);
        eye2TranslationNode = new TransformNode(eye2Translation);
        mouthTranslationNode = new TransformNode(mouthTranslation);
        bodyTranslationNode = new TransformNode(bodyTranslation);

        scaleNode.addChild(headTranslationNode);
        scaleNode.addChild(eye1TranslationNode);
        scaleNode.addChild(eye2TranslationNode);
        scaleNode.addChild(mouthTranslationNode);
        scaleNode.addChild(bodyTranslationNode);

        this.mHeadColourNode = new ColourNode(this.getColour());
        headTranslationNode.addChild(this.mHeadColourNode);
        this.mBodyColourNode = new ColourNode(this.getColour());
        bodyTranslationNode.addChild(this.mBodyColourNode);

        this.mHeadColourNode.addChild(new GeometryNode(new Circle(0,Math.PI * 2, 50)));
        eye1TranslationNode.addChild(new GeometryNode(new Polygon(this.drawEye())));
        eye2TranslationNode.addChild(new GeometryNode(new Polygon(this.drawEye())));
        mouthTranslationNode.addChild(new GeometryNode(new Circle(0, Math.PI, 20)));
        this.mBodyColourNode.addChild(new GeometryNode(new Polygon(this.drawBody())));

        this.setNode(translationNode);
    }

    update(pDeltaTime, pGravity) {
        var newPosition, newMatrix, newRotation;
        newPosition = this.getPosition().add((this.mVelocity.multiply(pDeltaTime)));
        this.setPosition(newPosition);
        newMatrix = Matrix.createTranslation(newPosition);

        if(this.mNegative == true)
        {
            newRotation = this.getRotation() + (-this.mRotationRate * pDeltaTime);
        }
        else
        {
            newRotation = this.getRotation() + (this.mRotationRate * pDeltaTime);
        }
        if(newRotation > 0.2) {
            this.mNegative = true;
        }
        else if(newRotation < -0.2) {
            this.mNegative = false;
        }
        this.setRotation(newRotation);
        newMatrix = newMatrix.multiply(Matrix.createRotation(newRotation));

        this.mHeadColourNode.setColour(this.getColour());
        this.mBodyColourNode.setColour(this.getColour());

        this.getNode().setTransform(newMatrix);
    }

    drawEye() {
        var vectors = [];

        vectors.push(new Vector(0, 0));
        vectors.push(new Vector(0, 20));

        return vectors;
    }

    drawBody() {
        var vectors = [];

        vectors.push(new Vector(-50,-200));
        vectors.push(new Vector(50,-200));
        vectors.push(new Vector(90,-180));
        vectors.push(new Vector(90,0));
        vectors.push(new Vector(50,0));
        vectors.push(new Vector(50,-150));
        vectors.push(new Vector(50,200));
        vectors.push(new Vector(0,200));
        vectors.push(new Vector(0,50));
        vectors.push(new Vector(0,200));
        vectors.push(new Vector(-50,200));
        vectors.push(new Vector(-50,-150));
        vectors.push(new Vector(-50,0));
        vectors.push(new Vector(-90,0));
        vectors.push(new Vector(-90,-180));
        vectors.push(new Vector(-50,-200));

        return vectors;
    }
}