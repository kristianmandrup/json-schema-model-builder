const nodeA = {
  name: "A",
  properties: {
    id: {
      type: "string"
    }
  }
};

const nodeB = {
  name: "B",
  properties: {
    id: {
      type: "string"
    }
  }
};

const nodeC = {
  name: "C",
  properties: {
    id: {
      type: "string"
    }
  }
};

// join nodes can point to multiple different instances of both A and B,
// forming the many-to-many join relationship
const joinNodeAB = {
  name: "joinTableA",
  properties: {
    // aid can point to instance of nodeA
    aid: {
      type: "string", // one
      foreignKey: {
        to: nodeA,
        propName: "id"
      }
    },
    bid: {
      // bid can point instance of nodeB
      type: "string", // one
      foreignKey: {
        to: nodeB,
        propName: "id"
      }
    }
  }
};

const edgeA = {
  from: nodeA,
  to: joinNodeAB
};

const edgeB = {
  from: nodeB,
  to: joinNodeAB
};

const edgeAB = {
  from: nodeA,
  to: nodeB
};

const edgeAC = {
  from: nodeA,
  to: nodeC
};

const joinEdges = [edgeA, edgeB];
const oneToOneEdges = [edgeAB];
const oneToManyEdges = [edgeAB, edgeAC];
const nodes = {
  A: nodeA,
  B: nodeB,
  C: nodeC,
  join: joinNodeAB
};

module.exports = {
  nodes,
  joinEdges,
  oneToOneEdges,
  oneToManyEdges
};
