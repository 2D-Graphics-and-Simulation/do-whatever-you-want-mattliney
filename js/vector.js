class Vector {
    constructor(pX,pY,pZ) {
        this.mX = pX;
        this.mY = pY;
        this.mZ = pZ;
    }
    //#region Get/Set
    getX() {
        return this.mX;
    }
    setX(pX) {
        this.mX = pX;
    }

    getY() {
        return this.mY;
    }
    setY(pY) {
        this.mY = pY;
    }

    getZ() {
        return this.mZ;
    }
    setZ(pZ) {
        this.mZ = pZ;
    }
    //#endregion

    add(pVector) {
        var newVector = new Vector(0,0,0);
        newVector.setX(pVector.getX() + this.getX());
        newVector.setY(pVector.getY() + this.getY());
        newVector.setZ(pVector.getZ() + this.getZ());
        return newVector;
    }

    subtract(pVector) {
        var newVector = new Vector(0,0,0)
        newVector.setX(this.getX() - pVector.getX());
        newVector.setY(this.getY() - pVector.getY());
        newVector.setZ(this.getZ() - pVector.getZ());
        return newVector;
    }

    multiply(pScalar) {
        var newVector = new Vector(0,0,0)
        newVector.setX(this.getX() * pScalar);
        newVector.setY(this.getY() * pScalar);
        newVector.setZ(this.getZ() * pScalar);
        return newVector;
    }

    divide(pScalar) {
        var newVector = new Vector(0,0,1);
        newVector.setX(this.getX() / pScalar);
        newVector.setY(this.getY() / pScalar);
        newVector.setZ(this.getZ() / pScalar);
        return newVector;
    }

    magnitude() {
        var result;
        result = (this.getX() * this.getX()) + (this.getY() * this.getY());
        return Math.sqrt(result);
    }

    normalise() {
        var length, newVector = new Vector(0,0,0);
        length = Math.sqrt((this.getX() * this.getX()) + (this.getY() * this.getY()));
        newVector.setX(this.getX() / length);
        newVector.setY(this.getY() / length);
        newVector.setZ(this.getZ() / length);
        return newVector;
    }

    limitTo(pMaxLength) {
        var newVector = new Vector(0,0,0);
        length = Math.sqrt((this.getX() * this.getX()) + (this.getY() * this.getY()));
        if(length > pMaxLength)
        {
            newVector = this.normalise();
            newVector = newVector.multiply(pMaxLength);
            return newVector;
        }
        newVector = this;
        return newVector;
    }

    dotProduct(pVector) {
        var result;
        result = (this.getX() * pVector.getX()) + (this.getY() * pVector.getY());
        return result;
    }

    interpolate(pVector, pScalar) {
        var newVector, interpolatedVector;
        newVector = pVector.subtract(this);
        interpolatedVector = newVector.multiply(pScalar).add(this);
        return interpolatedVector;
    }

    rotate(pScalar) {
        var newVector, newX, newY;
        newX = 0;
        if(this.getX() != 0) {
            newX = (-Math.sin(pScalar) * this.getY()) + ((Math.cos(pScalar) * this.getX()));
        }

        newY = 0;
        if(this.getY() != 0) {
            newY = (Math.sin(pScalar) * this.getX()) + (Math.cos(pScalar) * this.getY())
        }
        newVector = new Vector(newX,newY,0);
        return newVector;
    }

    angleBetween(pVector) {
        var dotProductValue, magnitudeValue, returnValue;
        dotProductValue = this.dotProduct(pVector);
        magnitudeValue = (this.magnitude()) * (pVector.magnitude());
        returnValue = Math.acos((dotProductValue / magnitudeValue));
        return returnValue;
    }
}