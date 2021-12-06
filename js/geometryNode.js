class GeometryNode extends BaseNode {
    constructor(pPolygon) {
        super();
        this.setPolygon(pPolygon);
        this.mNodeType = "Geometry";
    }

    getPolygon() {
        return this.mPolygon
    }

    setPolygon(pPolygon) {
        this.mPolygon = pPolygon;
    }

    getNodeType() {
        return this.mNodeType;
    }
}