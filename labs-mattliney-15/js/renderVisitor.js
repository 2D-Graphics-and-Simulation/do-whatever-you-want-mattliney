class RenderVisitor {
    constructor(pContext) {
        this.mTransformations = [];
        this.mContext = pContext;
        this.mColour;
    }

    visit(pNode) {
        if(pNode.getNodeType() == "Group") {
            this.visitGroup(pNode);
        }
        else if(pNode.getNodeType() == "Transform") {
            this.visitTransformation(pNode);
        }
        else if(pNode.getNodeType() == "Geometry") {
            this.visitGeometry(pNode);
        }
        else if(pNode.getNodeType() == "Colour") {
            this.visitColour(pNode);
        }
    }

    visitGroup(pNode) {
        var i, child;
        for(i = 0; i < pNode.getNumberOfChildren(); i += 1) {
            child = pNode.getChildAt(i);
            child.accept(this);
        }
    }

    visitTransformation(pNode) {
        this.pushTransform(pNode.getTransform());
        this.visitGroup(pNode);
        this.popTransform();
    }

    visitGeometry(pNode) {
        var polygon, matrix;
        
        polygon = pNode.getPolygon();
        matrix = this.peekTransform()
        matrix.setTransform(this.mContext);
        polygon.draw(this.mContext, matrix, this.mColour);
    }

    visitColour(pNode) {
        this.mColour = pNode.getColour()
        this.visitGroup(pNode);
    }

    popTransform() {
        this.mTransformations.pop();
    }

    pushTransform(pTransform) {
        var currentMatrix, multipliedMatrix;
        if(this.mTransformations.length == 0) {
            this.mTransformations.push(pTransform);
        }
        else {
            currentMatrix = this.peekTransform();
            multipliedMatrix = currentMatrix.multiply(pTransform);
            this.mTransformations.push(multipliedMatrix);
        }
    }

    peekTransform() {
        return this.mTransformations[this.mTransformations.length-1];
    }
}