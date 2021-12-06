class Polygon {
    constructor(pVectors) {
        this.mVectors = pVectors;
    }

    drawPolygon(pContext) {
        var i;

        pContext.beginPath();
        pContext.fillStyle = this.mColour;
        pContext.lineWidth = 5;
        pContext.lineJoin = 'round';

        pContext.moveTo(this.mVectors[0].getX(), this.mVectors[0].getY());
        for(i = 1; i < this.mVectors.length; i += 1) {
            pContext.lineTo(this.mVectors[i].getX(), this.mVectors[i].getY());
        }

        pContext.fill();
        pContext.stroke();
    }

    draw(pContext, pMatrix ,pColour) {
        this.drawPolygon(pContext);
        this.mColour = pColour;
    }
}