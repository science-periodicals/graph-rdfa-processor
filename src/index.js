import URIResolver from './uri-resolver';
import GraphRDFaProcessor from './graph-rdfa-processor';
import { RDFaGraph } from './rdfa-graph';

export default function(document, options = {}) {
  let baseURI = options.baseURI ? options.baseURI : document.documentElement.baseURI;

  let graph = new RDFaGraph();

  let target ={
    graph,
    baseURI: new URIResolver().parseURI(baseURI)
  };

  var processor = new GraphRDFaProcessor(target);
  processor.process(document.documentElement, options);
  return target.graph;
};
