export interface NodeVertex {
  readonly nameOfVertex: string;
  readonly weight: number;
}

export interface ResultPath {
  path: Array<string>;
  totalWeight: number;
}

export class Vertex {
  readonly name: string;
  readonly nodes: Array<NodeVertex>;
  weight: number;

  constructor(_name: string, _nodes: Array<NodeVertex>, _weight: number) {
    this.name = _name;
    this.nodes = _nodes;
    this.weight = _weight;
  }
}

export class DijkstraShortestPathAlgorithm {
  vertices: Map<string, Vertex>;

  constructor() {
    this.vertices = new Map();
  }

  addVertex(vertex: Vertex): void {
    this.vertices.set(vertex.name, vertex);
  }

  findShortestPath(start: string, finish: string): number {
    let nodes: Array<NodeVertex> = [];
    this.vertices.forEach((vertex: Vertex, name: string) => {
      vertex.weight = name === start ? 0 : Number.MAX_VALUE;
      nodes.push({ nameOfVertex: name, weight: vertex.weight });
    });

    nodes.forEach((_node, index) => {
      const remainingNames = nodes.map(it => it.nameOfVertex);
      const visitedLeastWeight: string = remainingNames.sort((a, b) => this.vertices.get(a)!.weight - this.vertices.get(b)!.weight)[0];
      const currentVertex: Vertex = this.vertices.get(visitedLeastWeight)!;
      currentVertex.nodes.forEach((node: NodeVertex) => {
        const calculateWeight: number = currentVertex.weight + node!.weight;
        if (calculateWeight < this.vertices.get(node.nameOfVertex)!.weight) {
          this.vertices.get(node.nameOfVertex)!.weight = calculateWeight; // note that weight is updated
        }
      });
      nodes = nodes.filter(it => it.nameOfVertex !== visitedLeastWeight);
      if (index % 1000 === 0) {
        console.log('Rows processed: ', index, " at: ", new Date().toLocaleTimeString());
      }
    });
    return this.vertices.get(finish)!.weight;
  }
}
