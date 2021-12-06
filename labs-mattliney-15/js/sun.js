class Sun {
    constructor(pPosition) {
        this.mPosition = pPosition;
    }

    drawSun(pContext, pMatrix) {
        pMatrix.setTransform(pContext);
        pContext.beginPath();
        pContext.fillStyle = "#fff000"
        pContext.lineWidth = 5;
        pContext.lineJoin = 'round';

        pContext.arc(0, 0, 50, 0, 2 * Math.PI);
        pContext.moveTo(0 - 20, 0 - 10);
        pContext.lineTo(0 - 20, 0 - 20);
        pContext.moveTo(0 + 20, 0 - 10);
        pContext.lineTo(0 + 20, 0 - 20);

        pContext.fill();
        pContext.fillStyle = "#ffffff"
        pContext.stroke();

        pContext.beginPath();
        pContext.fillStyle = "#fff000"
        pContext.lineWidth = 5;
        pContext.lineJoin = 'round';
        pContext.arc(0, 0 + 10, 20, 0, Math.PI);
        pContext.stroke();
    }

    draw(pContext, pMatrix, pAngle) {
        var translation, rotation, scale;

        translation = Matrix.createTranslation(this.mPosition);
        pMatrix = pMatrix.multiply(translation);

        rotation = Matrix.createRotation(pAngle);
        pMatrix = pMatrix.multiply(rotation);

        scale = Matrix.createScale(new Vector(1, 1,1));
        pMatrix = pMatrix.multiply(scale);

        this.drawSun(pContext, pMatrix)
    }
}