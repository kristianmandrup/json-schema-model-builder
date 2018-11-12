// join nodes can point to multiple different instances of both A and B,
// forming the many-to-many join relationship
const joinNodeAB = {
  name: "joinTableA",
  props: {
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

const nodeA = {
  name: "A",
  props: {
    id: {
      type: "string"
    }
  }
};

const nodeB = {
  name: "B",
  props: {
    id: {
      type: "string"
    }
  }
};

const nodeC = {
  name: "C",
  props: {
    id: {
      type: "string"
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

module.exports = {
  joinEdges,
  oneToOneEdges,
  oneToManyEdges
};
