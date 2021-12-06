class Background {
    constructor(pPosition, pScale, pRotation) {
        this.setPosition(pPosition);
        this.setScale(pScale);
        this.setRotation(pRotation);
        this.initialiseSceneGraph();
    }


    //#region  get/set
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
    //#endregion

    initialiseSceneGraph() {
        var translation, rotation, scale, translationNode, rotationNode, scaleNode,
        groundTranslation, skyTranslation, groundTranslationNode,
        skyTranslationNode, skyColourNode, groundColourNode;

        translation = Matrix.createTranslation(this.mPosition);
        translationNode = new TransformNode(translation);

        rotation = Matrix.createRotation(this.getRotation());
        rotationNode = new TransformNode(rotation);

        scale = Matrix.createScale(this.getScale());
        scaleNode = new TransformNode(scale);

        translationNode.addChild(rotationNode);
        rotationNode.addChild(scaleNode);

        groundTranslation = Matrix.createTranslation(new Vector(0,0));
        skyTranslation = Matrix.createTranslation(new Vector(0,-500));

        groundTranslationNode = new TransformNode(groundTranslation);
        skyTranslationNode = new TransformNode(skyTranslation);

        scaleNode.addChild(skyTranslationNode);
        scaleNode.addChild(groundTranslationNode);

        groundColourNode = new ColourNode('#ffffff');
        groundTranslationNode.addChild(groundColourNode)
        skyColourNode = new ColourNode('#B1D5F4');
        skyTranslationNode.addChild(skyColourNode)

        groundTranslationNode.addChild(new GeometryNode(new Polygon(this.drawGround())));
        skyTranslationNode.addChild(new GeometryNode(new Polygon(this.drawGround())));

        this.setNode(translationNode);
    }

    drawGround() {
        var vectors = [];

        vectors.push(new Vector(-500,0));
        vectors.push(new Vector(-500,500));
        vectors.push(new Vector(500,500));
        vectors.push(new Vector(500,0));
        vectors.push(new Vector(-500,0));

        return vectors;
    }
}