class Circle {
    constructor(pStartingAngle, pEndAngle, pSize) {
        this.mStartingAngle = pStartingAngle;
        this.mEndAngle = pEndAngle;
        this.mSize = pSize;
    }

    drawPolygon(pContext, pMatrix) {
        pMatrix.setTransform(pContext);

        pContext.beginPath();
        pContext.fillStyle = this.mColour;
        pContext.lineWidth = 5;
        pContext.lineJoin = 'round';

        pContext.arc(0, 0, this.mSize, this.mStartingAngle, this.mEndAngle);

        pContext.fill();
        pContext.fillStyle = "#000000"
        pContext.stroke();
    }

    draw(pContext, pMatrix, pColour) {
        this.drawPolygon(pContext, pMatrix);
        this.mColour = pColour;
    }
}