class player {
    constructor (pPosition, pScale, pRotation, pMass, pColour) {
        this.mPosition = pPosition;
        this.mColour = pColour;
        this.setScale(pScale);
        this.setRotation(pRotation);
        this.initialiseSceneGraph();

        this.mMass = pMass;
        this.mVelocity = new Vector(0,0,1);
        this.mAccelerationRate = new Vector (0,0,0);
        this.mNegative = false;
        this.mRotationRate = 0;
        this.mFrictionCoefficient = 0.01;

        this.mCollision = new circleCollider(this.mPosition, 50, 0);
    }

    randomNumber(pMin, pMax) {
        var random, rounded; 
        random = Math.random()* (pMax * 2);
        rounded = Math.round(random) + pMin;
        return rounded;
    }

    //#region  Get/Set

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

    setVelocity(pVelocity) {
        this.mVelocity = pVelocity;
    }

    getVelocity() {
        return this.mVelocity.magnitude();
    }

    setRotationRate(pRotationRate) {
        this.mRotationRate = pRotationRate;
    }

    setAcceleration(pAcceleration) {
        this.mAccelerationRate = pAcceleration;
    }

    setMass(pMass) {
        this.mMass = pMass;
    }

    getMass() {
        return this.mMass;
    }

    getCollision() {
        return this.mCollision;
    }

    getColour() {
        return this.mColour;
    }

    //#endregion

    initialiseSceneGraph() {
        var translation, rotation, scale, translationNode, rotationNode, scaleNode,
        headTranslation, eye1Translation, eye2Translation,mouthTranslation, bodyTranslation, headTranslationNode,
        eye1TranslationNode, eye2TranslationNode, mouthTranslationNode, mouthTranslationNode, bodyTranslationNode,
        headColourNode, mouthColourNode, bodyColourNode;

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

        headColourNode = new ColourNode(this.mColour);
        headTranslationNode.addChild(headColourNode);
        bodyColourNode = new ColourNode(this.mColour);
        bodyTranslationNode.addChild(bodyColourNode);

        headColourNode.addChild(new GeometryNode(new Circle(0,Math.PI * 2, 50)));
        eye1TranslationNode.addChild(new GeometryNode(new Polygon(this.drawEye())));
        eye2TranslationNode.addChild(new GeometryNode(new Polygon(this.drawEye())));
        mouthTranslationNode.addChild(new GeometryNode(new Circle(0, Math.PI, 20)));
        bodyColourNode.addChild(new GeometryNode(new Polygon(this.drawBody())));

        this.setNode(translationNode);
    }

    update(pDeltaTime) {
        var newPosition, newMatrix, newRotation, newScale;
        this.calculateVelocity();
        newPosition = this.getPosition().add((this.mVelocity.multiply(pDeltaTime)));
        this.setPosition(newPosition);
        this.mCollision.setPosition(newPosition);
        newMatrix = Matrix.createTranslation(newPosition);

        //uncomment this code to get the depth effect

        newScale = new Vector(0.01 * this.getPosition().getY(), 0.01 * this.getPosition().getY(), 1);
        this.setScale(newScale);
        newMatrix = newMatrix.multiply(Matrix.createScale(newScale));

        //this code handles the rotation to make the player/man look like he is swaying from side to side
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

        this.getNode().setTransform(newMatrix);
    }

    calculateVelocity() {
        var acceleration, friction;
        friction = this.mFrictionCoefficient * this.mMass;
        acceleration = this.mAccelerationRate.divide(this.mMass); //acceleration is dependant on mass
        this.mVelocity = this.mVelocity.add(acceleration); //acceleration is added to velocity

        this.mVelocity = this.mVelocity.subtract(this.mVelocity.multiply(friction)); //friction is removed from the velocity

        this.mVelocity = this.mVelocity.limitTo(200); //stops the player from gaining too much speed
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