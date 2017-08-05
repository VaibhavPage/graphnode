"use strict"

const queue_op = require('queue-op');

var exports = module.exports = {};

const COLOR = {
    'WHITE' : 0,
    'GREY' : 1,
    'BLACK' : 2
};

class Vertex {
    constructor(parent, value, color, label) {
        this._parent = parent;
        this._value = value;
        this._color = color;
        this._label = label;
    }

    get parent() {
        return this._parent;
    }

    get value() {
        return this._value;
    }

    get color() {
        return this._color;
    }

    getLabel() {
        return this._label;
    }


    set parent(value) {
        this._parent = value;
    }

    set value(value) {
        this._value = value;
    }

    set color(value) {
        this._color = value;
    }

    set label(value) {
        this._label = value;
    }
}

class Edge {
    constructor(source, destination, cost) {
        this._source = source;
        this._destination = destination;
        this._cost = cost;
    }

    getSource() {
        return this._source;
    }

    getDestination() {
        return this._destination;
    }

    getCost() {
        return this._cost;
    }


    set source(value) {
        this._source = value;
    }

    set destination(value) {
        this._destination = value;
    }

    set cost(value) {
        this._cost = value;
    }
}

class Graph {

    constructor(vertices, edges, name, isDirected) {
        this.vertices = vertices;
        this.edges = edges;
        this.name = name;
        this.adjList = [];
        this.isDirected = isDirected ? isDirected : false;
    }

    getVertices() {
        return this.vertices;
    }

    getEdges() {
        return this.edges;
    }

    getGraphName() {
        return this.name;
    }

    initNeighbors(vertex) {
        var that = this;
        this.edges.forEach(function (edge) {
            that.adjList[edge.source] = that.adjList[edge.source] ? that.adjList[edge.source] : [];
            that.adjList[edge.source].push(that.adjList[edge.destination]);
            if(!that.isDirected) {
                that.adjList[edge.destination] = that.adjList[edge.destination] ? that.adjList[edge.destination] : [];
                that.adjList[edge.destination].push(that.adjList[edge.source]);
            }
        });
    }

    getNeighbors(vertex) {
        return this.adjList[vertex];
    }

}


/**
 * API
 */
exports.breadthFirstSearch = function (graph, searchValue) {
    if(!graph) {
        throw new Error("Empty or undefined graph");
    }

    var result = [];
    var vertices = graph.getVertices();

    vertices.forEach(function (vertex) {
        vertex._color = COLOR.WHITE;
        vertex._parent = null;
        vertex._value = Number.MAX_VALUE;
    });

    var queue = queue_op.initQueue();
    queue.addItem(vertices[0]);

    var source = queue.peek();
    source._value = 0;
    source._color = COLOR.GREY;

    while(queue.size > 0) {
        var current_source_vertex = queue.pop();
        var neighbour_vertices = graph.getNeighbors(current_source_vertex);
        neighbour_vertices.forEach(function (neighbor_vertex) {
            if(neighbor_vertex._color === COLOR.WHITE) {
                neighbor_vertex._parent = current_source_vertex;
                neighbor_vertex._value = current_source_vertex.value + 1;
                neighbor_vertex.color = COLOR.GREY;
                queue.addItem(neighbor_vertex);
            }
        });
        current_source_vertex.color = COLOR.BLACK;
        if(searchValue == current_source_vertex._value) {
            result.push(current_source_vertex);
        }
    }

    return result;

};

exports.createVertex = function (parent, value, color, label) {
    return new Vertex(parent, value, color, label);
};

exports.createEdge = function (source, destination, cost) {
    return new Edge(source, destination, cost);
}

exports.createGraph = function (vertices, edges, name, isDirected) {
    return new Graph(vertices, edges, name, isDirected);
};