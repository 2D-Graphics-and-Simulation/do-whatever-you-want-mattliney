class Square {
    constructor(pSize, pPosition) {
        this.mSize = pSize;
        this.mPosition = pPosition;
    }

    getSize() {
        return this.mSize;
    }

    getPosition() {
        return this.mPosition
    }

    draw(pContext) {
        var position, size;
        position = this.mPosition;
        size = this.mSize;

        pContext.beginPath();
        pContext.fillStyle = "#ffffff";
        pContext.lineWidth = 5;
        pContext.lineJoin = 'round';

        pContext.moveTo(position.getX() - (size/2), position.getY() - (size/2));
        pContext.lineTo(position.getX() + (size/2), position.getY() - (size/2));
        pContext.lineTo(position.getX() + (size/2), position.getY() + (size/2));
        pContext.lineTo(position.getX() - (size/2), position.getY() + (size/2));
        pContext.lineTo(position.getX() - (size/2), position.getY() - (size/2));

        pContext.stroke();
    }
}