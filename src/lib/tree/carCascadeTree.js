class CarCascadeTreeNode {
    constructor(value, name = value) {
        this.value = value;
        this.name = name;
        this.children = {}
    }
}

export function buildCarCascadeTree(data) {
    const root = new CarCascadeTreeNode(null);
    const keys = ["carBrand", "model", "carType", "year", "color", "licensePlate"];

    data && data.forEach(item => {
        let current = root;

        keys.forEach((key, index) => {
            let nodeValue = null;
            let nodeName = null;
            switch (key) {
                case "carBrand":
                    nodeValue = item.carBrand.id;
                    nodeName = item.carBrand.name;
                    break;
                case "model":
                    nodeValue = item.model;
                    nodeName = item.model;
                    break;
                case "carType":
                    nodeValue = item.carType.id;
                    nodeName = item.carType.typeName;
                    break;
                case "year":
                    nodeValue = item.year;
                    nodeName = item.year;
                    break;
                case "color":
                    nodeValue = item.color;
                    nodeName = item.color;
                    break;
                case "licensePlate":
                    nodeValue = item.id;
                    nodeName = item.licensePlate;
                    break;
            }

            if (!current.children[nodeValue]) {
                current.children[nodeValue] = new CarCascadeTreeNode(nodeValue, nodeName);
            }

            current = current.children[nodeValue];
        })
    })

    return root;
}

