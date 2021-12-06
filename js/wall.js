class Wall {
    constructor() {

    }

    drawWall(pContext, pMatrix) {
        pMatrix.setTransform(pContext);
        
        pContext.beginPath();
        pContext.fillStyle = "#ffffff"
        pContext.lineWidth = 5;
        pContext.lineJoin = 'round';

        pContext.moveTo(0 - 100, 0 - 75);
        pContext.lineTo(0 - 100, 0 + 75);
        pContext.lineTo(0 + 100, 0 + 75);
        pContext.lineTo(0 + 100, 0 - 75);
        pContext.lineTo(0 - 100, 0 - 75);
        
        pContext.fill();
        pContext.fillStyle = "#000000"
        pContext.stroke();
    }

    draw(pContext, pMatrix) {
        this.drawWall(pContext, pMatrix);
    }
}