class TransformNode extends GroupNode {
    constructor(pTransform) {
        super();
        this.mTransform = pTransform;
        this.mNodeType = "Transform";
    }

    getTransform() {
        return this.mTransform;
    }

    setTransform(pTransform) {
        this.mTransform = pTransform;
    }

    getNodeType() {
        return this.mNodeType;
    }
}