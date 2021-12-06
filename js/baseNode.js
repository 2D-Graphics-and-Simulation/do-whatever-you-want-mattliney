class BaseNode {
    constructor() {

    }

    accept(pVisitor) {
        pVisitor.visit(this);
    }
}