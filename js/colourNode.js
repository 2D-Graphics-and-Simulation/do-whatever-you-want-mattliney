class ColourNode extends GroupNode{
    constructor(pColour) {
        super();
        this.setColour(pColour);
        this.mNodeType = "Colour";
    }

    getColour() {
        return this.mColour;
    }

    setColour(pColour) {
        this.mColour = pColour;
    }

    getNodeType() {
        return this.mNodeType;
    }
}