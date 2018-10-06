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
    graph.addNode(fromNode)
    graph.addNode(toNode)

    describe('addOrGetNode(value)', () => {
      it('ensures nodes is added and returns it', () => {
        const node = graph.addOrGetNode(toNode)
        expect(node).toBe(toNode)
      })

      it('get added node by name', () => {
        const node = graph.addOrGetNode(toNode.name)
        expect(node).toBe(toNode)
      })
    })

    describe('hasNode(key)', () => {
      test('node present - true', () => {
        const hasIt = graph.hasNode(fromNode)
        expect(hasIt).toBeTruthy()
      })

      test('node not present - false', () => {
        const hasIt = graph.hasNode(missingNode)
        expect(hasIt).toBeFalsy()
      })
    })

    describe('getNode(key)', () => {
      test('node present - returned', () => {
        const node = graph.getNode(toNode)
        expect(node).toBe(toNode)
      })
      test('node not present - falsy', () => {})
    })

    describe('edge from -> to added', () => {
      graph.addEdge(from, to, {edge: true})

      describe('hasEdge(from, to)', () => {
        test('edge present - true', () => {
          const hasIt = graph.hasEdge(fromNode, toNode)
          expect(hasIt).toBeTruthy()
        })

        test('edge not present - false', () => {
          const hasIt = graph.hasEdge(fromNode, missingNode)
          expect(hasIt).toBeFalsy()
        })
      })

      describe('getEdge(from, to)', () => {
        test('node present - returned', () => {
          const edge = graph.getEdge(fromNode, toNode)
          expect(edge).toBeTruthy()
        })

        test('node not present - falsy', () => {
          const edge = graph.getEdge(fromNode, missingNode)
          expect(edge).toBeFalsy()
        })
      })
    })

    // see addOrGetNode
    describe('ensureNode(key, value)  ', () => {
      test('ensures node is added and returns it', () => {
        const node = graph.ensureNode('x', {name: 'x'})
        expect(node).toBeTruthy()

        const hasIt = graph.hasNode('x')
        expect(hasIt).toBeTruthy()
      })
    })

    describe('addEdge(from, to, value)', () => {
      const edge = graph.addEdge(from, to, value)

      test('ensures nodes are added and adds edge to graph', () => {
        expect(graph.hasEdge('x', 'y')).toBe(true)
        expect(graph.getEdge('x', 'y')).toBe(edge)

        expect(graph.hasNode('x')).toBe(true)
        expect(graph.hasNode('y')).toBe(true)

        expect(graph.getNode('x')).toBe(from)
        expect(graph.getNode('y')).toBe(to)
      })
    })
  })
})
