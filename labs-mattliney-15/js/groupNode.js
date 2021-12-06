class GroupNode extends BaseNode {
    constructor() {
        super();
        this.mChildren = [];
        this.mNodeType = "Group";
    }
    
    getNumberOfChildren() {
        return this.mChildren.length;
    }

    getChildAt(pIndex) {
        return this.mChildren[pIndex];
    }

    addChild(pChild){
        this.mChildren.push(pChild);
    }

    getNodeType() {
        return this.mNodeType;
    }
}