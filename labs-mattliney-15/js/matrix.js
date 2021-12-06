class Matrix {
    constructor(p00, p01, p02, p10, p11, p12, p20, p21, p22) {
        var i;
        this.mElements = [];
        this.mElements.push(p00);
        this.mElements.push(p01);
        this.mElements.push(p02);
        this.mElements.push(p10);
        this.mElements.push(p11);
        this.mElements.push(p12);
        this.mElements.push(p20);
        this.mElements.push(p21);
        this.mElements.push(p22);
    }

    getElement(pRow, pColumn) {
        let index = pRow * 3 + pColumn;
        return this.mElements[index];
    }

    static createIdentity() {
        var identityMatrix;
        identityMatrix = new Matrix(1,0,0,0,1,0,0,0,1);
        return identityMatrix;
    }

    static createTranslation(pVector) {
        var translation;
        translation = new Matrix(1,0,pVector.getX(),0,1,pVector.getY(),0,0,1);
        return translation;
    }

    static createScale(pVector) {
        var scale;
        scale = new Matrix(pVector.getX(),0,0,0,pVector.getY(),0,0,0,pVector.getZ());
        return scale;
    }

    static createRotation(pScalar) {
        var rotation;
        rotation = new Matrix(Math.cos(pScalar),-Math.sin(pScalar),0,Math.sin(pScalar),Math.cos(pScalar),0,0,0,1);
        return rotation;
    }

    multiplyVector(pVector) {
        var multipliedVector, newX, newY, newZ;
        newX = (this.getElement(0,0) * pVector.getX()) + (this.getElement(0,1) * pVector.getY()) + (this.getElement(0,2) * pVector.getZ());
        newY = (this.getElement(1,0) * pVector.getX()) + (this.getElement(1,1) * pVector.getY()) + (this.getElement(1,2) * pVector.getZ());
        newZ = (this.getElement(2,0) * pVector.getX()) + (this.getElement(2,1) * pVector.getY()) + (this.getElement(2,2) * pVector.getZ());
        multipliedVector = new Vector(newX,newY,newZ);
        return multipliedVector;
    }

    multiply(pMatrix) {
        var m00,m01,m02,m10,m11,m12,m20,m21,m22, multipliedMatrix;
        m00 = (this.getElement(0,0) * pMatrix.getElement(0,0)) + (this.getElement(0,1) * pMatrix.getElement(1,0)) + (this.getElement(0,2) * pMatrix.getElement(2,0));//
        m01 = (this.getElement(0,0) * pMatrix.getElement(0,1)) + (this.getElement(0,1) * pMatrix.getElement(1,1)) + (this.getElement(0,2) * pMatrix.getElement(2,1));//
        m02 = (this.getElement(0,0) * pMatrix.getElement(0,2)) + (this.getElement(0,1) * pMatrix.getElement(1,2)) + (this.getElement(0,2) * pMatrix.getElement(2,2));//
        m10 = (this.getElement(1,0) * pMatrix.getElement(0,0)) + (this.getElement(1,1) * pMatrix.getElement(1,0)) + (this.getElement(1,2) * pMatrix.getElement(2,0));
        m11 = (this.getElement(1,0) * pMatrix.getElement(0,1)) + (this.getElement(1,1) * pMatrix.getElement(1,1)) + (this.getElement(1,2) * pMatrix.getElement(2,1));
        m12 = (this.getElement(1,0) * pMatrix.getElement(0,2)) + (this.getElement(1,1) * pMatrix.getElement(1,2)) + (this.getElement(1,2) * pMatrix.getElement(2,2));
        m20 = (this.getElement(2,0) * pMatrix.getElement(0,0)) + (this.getElement(2,1) * pMatrix.getElement(1,0)) + (this.getElement(2,2) * pMatrix.getElement(2,0));//
        m21 = (this.getElement(2,0) * pMatrix.getElement(0,1)) + (this.getElement(2,1) * pMatrix.getElement(1,1)) + (this.getElement(2,2) * pMatrix.getElement(2,1));//
        m22 = (this.getElement(2,0) * pMatrix.getElement(0,2)) + (this.getElement(2,1) * pMatrix.getElement(1,2)) + (this.getElement(2,2) * pMatrix.getElement(2,2));//
        multipliedMatrix = new Matrix(m00,m01,m02,m10,m11,m12,m20,m21,m22);
        return multipliedMatrix;
    }

    setTransform(pContext) {
        pContext.setTransform(this.getElement(0,0),this.getElement(1,0),this.getElement(0,1),this.getElement(1,1),this.getElement(0,2),this.getElement(1,2));
    }

    transform(pContext) {
        pContext.transform(this.getElement(0,0),this.getElement(1,0),this.getElement(0,1),this.getElement(1,1),this.getElement(0,2),this.getElement(1,2));
    }
}