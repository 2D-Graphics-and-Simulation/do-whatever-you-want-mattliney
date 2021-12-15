class BouncyBall {
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

    checkSquareCollision(pSquare) {
        var distance, distanceMagnitude;
        distance = this.mPosition.subtract(pSquare.getPosition());
        distanceMagnitude = distance.magnitude();

        if(distanceMagnitude <= (pSquare.getSize()))
        {
            this.setVelocity(new Vector(distance.getX(), distance.getY()))
        }
    }

    normal(pNormal) {
        var newVelocity, twoN, negativeDot, combination;
        // U = velocity, N = normal, V = result
        // V = U + 2 * N * ( -N.U )
        twoN = pNormal.multiply(2);
        
        negativeDot = (pNormal.dotProduct(this.mVelocity)) * -1;

        combination = twoN.multiply(negativeDot);

        newVelocity = this.mVelocity.add(combination);

        this.mVelocity = newVelocity;
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