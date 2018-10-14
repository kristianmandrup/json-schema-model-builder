const {ModelGraph} = require('./model-graph')
const {colors, person, graph} = require('./data')

describe('ModelGraph', () => {
  const model = new ModelGraph()
  const graph = model.createGraph()
  const fromNode = {
    name: 'x'
  }
  const toNode = {
    name: 'y'
  }
  const missingNode = {
    name: 'missing'
  }

  const value = {
    color: 'red'
  }

  describe('createGraph', () => {
    test('creates graph instance', () => {
      expect(graph).toBeDefined()
    })
  })

  describe('nodes from and to added', () => {
    model.addNode(fromNode)
    model.addNode(toNode)

    describe('addOrGetNode(value)', () => {
      it('ensures nodes is added and returns it', () => {
        const node = model.addOrGetNode(toNode)
        expect(node).toBe(toNode)
      })

      it('get added node by name', () => {
        const node = model.addOrGetNode(toNode.name)
        expect(node).toBe(toNode)
      })
    })

    describe('hasNode(key)', () => {
      test('node present - true', () => {
        const hasIt = model.hasNode(fromNode)
        expect(hasIt).toBeTruthy()
      })

      test('node not present - false', () => {
        const hasIt = model.hasNode(missingNode)
        expect(hasIt).toBeFalsy()
      })
    })

    describe('getNode(key)', () => {
      test('node present - returned', () => {
        const node = model.getNode(toNode)
        expect(node).toBe(toNode)
      })
      test('node not present - falsy', () => {})
    })

    describe('edge from -> to added', () => {
      model.addEdge(fromNode, toNode, {edge: true})

      describe('hasEdge(from, to)', () => {
        test('edge present - true', () => {
          const hasIt = model.hasEdge(fromNode, toNode)
          expect(hasIt).toBeTruthy()
        })

        test('edge not present - false', () => {
          const hasIt = model.hasEdge(fromNode, missingNode)
          expect(hasIt).toBeFalsy()
        })
      })

      describe('getEdge(from, to)', () => {
        test('node present - returned', () => {
          const edge = model.getEdge(fromNode, toNode)
          expect(edge).toBeTruthy()
        })

        test('node not present - falsy', () => {
          const edge = model.getEdge(fromNode, missingNode)
          expect(edge).toBeFalsy()
        })
      })
    })

    // see addOrGetNode
    describe('ensureNode(key, value)  ', () => {
      test('ensures node is added and returns it', () => {
        const node = model.ensureNode('x', {name: 'x'})
        expect(node).toBeTruthy()

        const hasIt = model.hasNode('x')
        expect(hasIt).toBeTruthy()
      })
    })

    describe('addEdge(from, to, value)', () => {
      const edge = model.addEdge(fromNode, toNode, value)

      test('hasEdge - from x to y', () => {
        expect(model.hasEdge('x', 'y')).toBe(true)
      })

      test('ensures nodes are added and adds edge to graph', () => {
        expect(model.getEdge('x', 'y')).toBe(edge)
      })

      test('hasNode: x', () => {
        expect(model.hasNode('x')).toBe(true)
      })

      test('hasNode: y', () => {
        expect(model.hasNode('y')).toBe(true)
      })

      test('getNode: x is from', () => {
        expect(model.getNode('x')).toBe(fromNode)
      })

      test('getNode: y is to', () => {
        expect(model.getNode('y')).toBe(toNode)
      })
    })
  })
})
