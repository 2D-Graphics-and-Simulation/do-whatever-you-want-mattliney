class Door {
    constructor() {

    }

    drawDoor(pContext, pMatrix) {
        pMatrix.setTransform(pContext);

        pContext.beginPath();
        pContext.fillStyle = '#964B00';
        pContext.lineWidth = 5;
        pContext.lineJoin = 'round';

        pContext.moveTo(0 - 20, 0 - 50)
        pContext.lineTo(0 - 20, 0 + 50);
        pContext.lineTo(0 + 20, 0 + 50);
        pContext.lineTo(0 + 20, 0 - 50);
        pContext.lineTo(0 - 20, 0 - 50);

        pContext.fill();
        pContext.fillStyle = "#000000"
        pContext.stroke();
    }

    draw(pContext, pMatrix) {
        this.drawDoor(pContext, pMatrix);
    }
}