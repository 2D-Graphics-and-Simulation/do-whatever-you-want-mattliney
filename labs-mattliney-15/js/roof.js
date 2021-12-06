class Roof {
    constructor() {

    }

    drawRoof(pContext, pMatrix) {
        pMatrix.setTransform(pContext);

        pContext.beginPath();
        pContext.fillStyle = "#ff0000";
        pContext.lineWidth = 5;
        pContext.lineJoin = 'round';

        pContext.moveTo(0 - 100, 0 + 50);
        pContext.lineTo(0 + 100, 0 + 50);
        pContext.lineTo(0, 0 - 50);
        pContext.lineTo(0 - 100, 0 + 50);

        pContext.fill();
        pContext.fillStyle = "#000000"
        pContext.stroke();
    }

    draw(pContext, pMatrix) {
        this.drawRoof(pContext, pMatrix);
    }
}