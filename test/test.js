import { jsdom } from 'jsdom';
import assert from 'assert';
import getRDFaGraph from '../src';

describe('getRDFaGraph', function() {
  let html =
  `<div typeof="rdfs:Class" resource="http://schema.org/CreativeWork">
        <span class="h" property="rdfs:label">CreativeWork</span>
        <span property="rdfs:comment">The most generic kind of creative work, including books, movies, photographs, software programs, etc.</span>
        <span>Subclass of: <a property="rdfs:subClassOf" href="http://schema.org/Thing">Thing</a></span>
        <span>Source:  <a property="dc:source" href="http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_rNews">rNews</a></span>
     </div>`;


  let expected = `<http://schema.org/CreativeWork> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2000/01/rdf-schema#Class>;
 <http://www.w3.org/2000/01/rdf-schema#label> "CreativeWork";
 <http://www.w3.org/2000/01/rdf-schema#comment> "The most generic kind of creative work, including books, movies, photographs, software programs, etc.";
 <http://www.w3.org/2000/01/rdf-schema#subClassOf> <http://schema.org/Thing>;
 <http://purl.org/dc/terms/source> <http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_rNews> .
`;


  it('should getRDFaGraph from a document', function() {
    let { document } = jsdom(html).defaultView.window;
    let graph = getRDFaGraph(document, {baseURI: 'http://localhost'});
    assert.equal(graph.toString(), expected);
  });


  it('should getRDFaGraph from a node', function() {
    let { document } = jsdom(html).defaultView.window;
    let graph = getRDFaGraph(document.getElementsByTagName('div')[0], {baseURI: 'http://localhost'});
    assert.equal(graph.toString(), expected);
  });

});
