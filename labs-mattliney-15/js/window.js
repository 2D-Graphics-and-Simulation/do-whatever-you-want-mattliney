class Window {
    constructor() {

    }

    drawWindow(pContext, pMatrix) {
        pMatrix.setTransform(pContext);

        pContext.beginPath();
        pContext.fillStyle = "#56B8CC"
        pContext.lineWidth = 5;
        pContext.lineJoin = 'round';

        pContext.moveTo(0 - 25, 0 - 45);
        pContext.lineTo(0 - 25, 0 + 45);
        pContext.lineTo(0 + 25, 0 + 45);
        pContext.lineTo(0 + 25, 0 - 45);
        pContext.lineTo(0 - 25, 0 - 45);
        pContext.fill();
        pContext.moveTo(0, 0 - 45);
        pContext.lineTo(0, 0 + 45);
        pContext.moveTo(0 - 25, 0);
        pContext.lineTo(0 + 25, 0);

        pContext.fillStyle = "#000000"
        pContext.stroke();
    }

    draw(pContext, pMatrix) {
        this.drawWindow(pContext, pMatrix);
    }
}