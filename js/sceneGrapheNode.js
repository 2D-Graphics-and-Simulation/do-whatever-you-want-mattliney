class SceneGraphNode {
    constructor(pMatrix) {
        this.setLocalMatrix(pMatrix);
        this.mChildren = [];
    }

    setLocalMatrix(pMatrix) {
        this.mLocalMatrix = pMatrix;
    }

    getLocalMatrix() {
        return this.mLocalMatrix;
    }

    getNumberOfChildren() {
        return this.mChildren.length;
    }

    getChildAt(pIndex) {
        return this.mChildren[pIndex];
    }

    addChild(pChild){
        this.mChildren.push(pChild);
    }

    draw(pContext, pMatrix){
        var newTransformationMatrix, i, numberOfChildren;

        numberOfChildren = this.getNumberOfChildren();
        newTransformationMatrix = pMatrix.multiply(this.getLocalMatrix());
        pContext.setTransform(newTransformationMatrix);

        for(i = 0; i < numberOfChildren; i += 1) {
            this.getChildAt(i).draw(pContext, newTransformationMatrix);
        }

        pContext.setTransform(newTransformationMatrix);
    }
}