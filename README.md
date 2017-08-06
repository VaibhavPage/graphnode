# graphnode

<div>
    <h4>Install</h4>
    <pre>npm install graphnode</pre>
</div>

<div>
    <h4>Description</h4>
    <p><b>This module provides Graph ADT and standard graph algorithms</b></p>
</div>

<div>
    <h4>Vertex</h4>
    <p>A vertex is created as follows</p>
    <pre>var vertex1 = new Vertex(null, null, "vertex1");</pre>
    <p>The constructore takes 3 arguments</p>
    <ul>
        <li>Parent</li>
        <li>Value</li>
        <li>Label</li>
    </ul>
    <p>If a label is not provided, then a default label is assigned to vertex.</p>
</div>

<div>
    <h4>Edge</h4>
    <p>An edge is created as follows</p>
    <pre>var edge1 = new Edge(vertex1, vertex2, 10, "edge1");</pre>
    <p>The constructore takes 4 arguments</p>
        <ul>
            <li>Source vertex</li>
            <li>Destination vertex</li>
            <li>Cost</li>
            <li>Label</li>
        </ul>
    </p>
    <p>If a label is not provided, then a default label is assigned to the edge.</p>
</div>

<div>
    <h4>Creating Graph</h4>
    <pre>var graph = new Graph(vertices, edges, "graph1", false);</pre>
    <p>The constructore takes 4 arguments</p>
        <ul>
            <li>Array of vertices</li>
            <li>Array of edges</li>
            <li>Name of graph</li>
            <li>Whether graph is directed</li>
        </ul>
    </p>
    <p>Graph internally maintains an adjacency list and it depends on whether graph 
        is directed or undirected.</p>
</div>

<div>
    <p>
        <b>Graph created can be stored for future use. 
        The name of the graph is used to store the graph.
        To retrieve the stored the graph, you need to provide the name of graph.
        </b>
    </p>
    <b>Store graph</b>
    <pre>graphnode.saveGraphInStore(graph);</pre> 
    <b>Retrieve graph</b>
    <pre>graph = graphnode.getGraphFromStore(nameOfGraph);</pre>
        
</div>

<div>
    <h4>Algorithms</h4>
    <p>Currently only search algorithms are supported</p>
    <ul>
        <li>Breadth first search</li>
        <li>Depth first search</li>
    </ul>
    <p>Search algorithms take search value as input which is basically the label of vertex
     you are searching for. After completion of search algorithms, you can inspect vertices to find their logical
     distance from source vertex. The source vertex is the index '0' vertex in the vertices array.
     </p>
</div>

<div>
    <h4>Example Code</h4>
    <pre>
    var graphnode = require('graphnode');    
    var Vertex = graphnode.Vertex;
    var Edge = graphnode.Edge;    
    var vertex1 = new Vertex(null, null, "vertex1");
    var vertex2 = new Vertex(null, null, "vertex2");
    var vertex3 = new Vertex(null, null, "vertex3");
    var vertex4 = new Vertex(null, null, "vertex4");
    var vertex5 = new Vertex(null, null, "vertex5");
    var vertex6 = new Vertex(null, null, "vertex6");    
    var vertices = new Array(vertex1, vertex2, vertex3, vertex4, vertex5, vertex6);    
    var edge1 = new Edge(vertex1, vertex2, 10, "edge1");
    var edge2 = new Edge(vertex1, vertex6, 100, "edge2");
    var edge3 = new Edge(vertex2, vertex3, 5, "edge3");
    var edge4 = new Edge(vertex2, vertex5, 2, "edge4");
    var edge5 = new Edge(vertex3, vertex6, 3, "edge5");
    var edge6 = new Edge(vertex3, vertex4, 4, "edge6");    
    var edges = new Array(edge1, edge2, edge3, edge4, edge5, edge6);    
    var Graph = graphnode.Graph;    
    var graph = new Graph(vertices, edges, "graph1", false);    
    var result = graph.breadthFirstSearch("vertex3");    
    console.log(result);    
    result = graph.depthFirstSearch("vertex3");    
    console.log(result);    
    graphnode.saveGraphInStore(graph);    
    graph = graphnode.getGraphFromStore(graph.getGraphName());    
    console.log(graph);
    </pre>
</div>