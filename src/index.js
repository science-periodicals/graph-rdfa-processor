import URIResolver from './uri-resolver';
import GraphRDFaProcessor from './graph-rdfa-processor';
import { RDFaGraph } from './rdfa-graph';

export default function(document, options = {}) {
  let node = document.documentElement || document;
  let baseURI = options.baseURI ? options.baseURI : node.baseURI;

  let graph = new RDFaGraph();

  let target ={
    graph,
    baseURI: new URIResolver().parseURI(baseURI)
  };

  var processor = new GraphRDFaProcessor(target);
  processor.process(node, options);
  return target.graph;
};
