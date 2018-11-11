const joinNodeAB = {
  name: "joinTableA"
};

const nodeA = {
  name: "A"
};

const nodeB = {
  name: "B"
};

const nodeC = {
  name: "C"
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
  to: nodeB
};

const joinEdges = [edgeA, edgeB];
const oneToOneEdges = [edgeAB];
const oneToManyEdges = [edgeAB, edgeAC];

const target = [
  {
    name: "Plane"
  }
];

const targets = [
  {
    name: "Plane"
  },
  {
    name: "Car"
  }
];

const reverseTargets = [
  {
    name: "Plane",
    targets: [
      {
        name: "Person"
      }
    ]
  },
  {
    name: "Car",
    targets: [
      {
        name: "Person"
      }
    ]
  }
];

module.exports = {
  target,
  targets,
  reverseTargets,
  joinEdges,
  oneToOneEdges,
  oneToManyEdges
};
