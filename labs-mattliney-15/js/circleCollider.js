class circleCollider {
    constructor (pPosition, pRadius) {
        this.mPosition = pPosition;
        this. mRadius = pRadius;
    }

    setPosition(pPosition) {
        this.mPosition = pPosition;
    }

    getPosition() {
        return this.mPosition
    }

    getRadius() {
        return this.mRadius;
    }

    checkCollision(pOtherCollision) {
        return this.mRadius + pOtherCollision.getRadius();
    }
}