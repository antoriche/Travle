// Thorup algorithm for finding shortest path in a graph
export function getShortestPath(graph: Array<{ id: string; neighbors: string[] }>, from: string, to: string): string[] {
  const distances: { [key: string]: number } = {};
  const previous: { [key: string]: string | null } = {};
  const queue: string[] = [];

  graph.forEach((node) => {
    distances[node.id] = Infinity;
    previous[node.id] = null;
    queue.push(node.id);
  });

  distances[from] = 0;

  while (queue.length > 0) {
    queue.sort((a, b) => distances[a] - distances[b]);
    const current = queue.shift()!;
    if (current === to) break;

    const currentNode = graph.find((node) => node.id === current)!;
    currentNode.neighbors.forEach((neighbor) => {
      const alt = distances[current] + 1;
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = current;
      }
    });
  }

  const path: string[] = [];
  let u = to;
  while (previous[u]) {
    path.unshift(u);
    u = previous[u]!;
  }
  if (u === from) path.unshift(u);

  return path;
}

export function getAllShortestPaths(graph: Array<{ id: string; neighbors: string[] }>, from: string, to: string): string[][] {
  const distances: { [key: string]: number } = {};
  const previous: { [key: string]: string[] } = {};
  const queue: string[] = [];

  graph.forEach((node) => {
    distances[node.id] = Infinity;
    previous[node.id] = [];
    queue.push(node.id);
  });

  distances[from] = 0;

  while (queue.length > 0) {
    queue.sort((a, b) => distances[a] - distances[b]);
    const current = queue.shift()!;
    if (current === to) break;

    const currentNode = graph.find((node) => node.id === current)!;
    currentNode.neighbors.forEach((neighbor) => {
      const alt = distances[current] + 1;
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = [current];
      } else if (alt === distances[neighbor]) {
        previous[neighbor].push(current);
      }
    });
  }

  const paths: string[][] = [];
  const path: string[] = [];

  function backtrack(node: string) {
    if (node === from) {
      paths.push([from, ...path]);
      return;
    }
    path.unshift(node);
    previous[node].forEach((prev) => backtrack(prev));
    path.shift();
  }

  backtrack(to);

  return paths;
}

export function generatePathForGame(graph: Array<{ id: string; neighbors: string[] }>, minLen: number, maxLen: number): string[] {
  minLen += 2;
  const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;

  const random_from = graph[Math.floor(Math.random() * graph.length)].id;
  const random_to = graph[Math.floor(Math.random() * graph.length)].id;

  const path = getShortestPath(graph, random_from, random_to);
  if (path.length < len) {
    return generatePathForGame(graph, minLen, maxLen);
  }
  if (path.length > len) {
    return path.slice(0, len);
  }
  return path;
}
