class Line {
    constructor(pStartX, pStartY, pEndX, pEndY) {
        this.mStartX = pStartX;
        this.mStartY = pStartY;
        this.mEndX = pEndX;
        this.mEndY = pEndY;
    }

    draw(pContext) {
        pContext.beginPath();
        pContext.fillStyle = "#ffffff";
        pContext.lineWidth = 5;
        pContext.lineJoin = 'round';

        pContext.moveTo(this.mStartX,this.mStartY);
        pContext.lineTo(this.mEndX, this.mEndY);

        pContext.stroke();
    }
}