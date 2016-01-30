import URIResolver from './uri-resolver';
import GraphRDFaProcessor from './graph-rdfa-processor';
import { RDFaGraph } from './rdfa-graph';

export default function(document,options = {}) {
  let baseURI = options.baseURI ? options.baseURI : document.documentElement.baseURI;

  // TODO cleanup the baseURI mess. It's all broken in green-turtle see https://github.com/alexmilowski/green-turtle/issues/6
  let graph = new RDFaGraph();
  graph.baseURI = new URIResolver().parseURI(baseURI);

  let target ={
    graph,
    baseUri: new URIResolver().parseURI(baseURI)
  };

  var processor = new GraphRDFaProcessor(target);
  processor.process(document.documentElement, options);
  return target.graph;
};
