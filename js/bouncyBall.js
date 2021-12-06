class bouncyBall {
    constructor (pPosition, pRadius, pVelocity) {
        this.mPosition = pPosition;
        this. mRadius = pRadius;
        this.mVelocity = pVelocity;
        this.mCollision = new circleCollider(this.mPosition,this.mRadius);
    }

    setVelocity(pVelocity) {
        this.mVelocity = pVelocity;
    }

    getVelocity() {
        return this.mVelocity;
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

    getCollision() {
        return this.mCollision;
    }

    update(pDeltaTime, pCanvas) {
        if(this.mPosition.getX() + this.mRadius >= pCanvas.width/2) {
            this.mVelocity = new Vector(-this.mVelocity.getX(),this.mVelocity.getY(),1);
        }
        else if(this.mPosition.getX() - this.mRadius <= -pCanvas.width/2) {
            this.mVelocity = new Vector(-this.mVelocity.getX(),this.mVelocity.getY(),1);
        }
        else if(this.mPosition.getY() + this.mRadius >= pCanvas.height/2) {
            this.mVelocity = new Vector(this.mVelocity.getX(),-this.mVelocity.getY(),1);
        }
        else if(this.mPosition.getY() - this.mRadius <= -pCanvas.height/2) {
            this.mVelocity = new Vector(this.mVelocity.getX(),-this.mVelocity.getY(),1);
        }
        this.mPosition = this.mPosition.add((this.mVelocity.multiply(pDeltaTime)));
    }

    draw(pContext) {
        pContext.beginPath();
        pContext.fillStyle = "#ffffff";
        pContext.lineWidth = 5;
        pContext.lineJoin = 'round';

        pContext.arc(this.mPosition.getX(), this.mPosition.getY(), this.mRadius, 0, Math.PI*2);

        pContext.stroke();
    }
}