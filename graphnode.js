"use strict"

const queue_op = require('queue-op');

var exports = module.exports = {};

const COLOR = {
    'WHITE' : 0,
    'GREY' : 1,
    'BLACK' : 2
};

class Vertex {
    constructor(parent, value, label) {
        this._parent = parent;
        this._value = value;
        this._color = COLOR.WHITE;
        this._label = label ? label : GraphHelper.createUniqueIdOrLabel();
        this._logicalDistance = Number.MAX_VALUE;
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

    getLogicalDistance() {
        return this._logicalDistance;
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
    constructor(source, destination, cost, label) {
        this._source = source;
        this._destination = destination;
        this._cost = cost;
        this._label = label ? label : GraphHelper.createUniqueIdOrLabel();
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

    getLabel() {
        return this._label;
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

    setLabel(value) {
        this._label = value;
    }
}

class GraphHelper {

    static initVertices(vertices) {
        vertices.forEach(function (vertex) {
            vertex._color = COLOR.WHITE;
            vertex._parent = null;
            vertex._logicalDistance = Number.MAX_VALUE;
        });

        var source_vertex = vertices[0];
        source_vertex._logicalDistance = 0;
        source_vertex._color = COLOR.WHITE;

    }

    static createUniqueIdOrLabel() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    static depthFirstSearchUtil(graph, vertex, distance, result, searchValue) {

        distance = distance + 1;
        vertex._logicalDistance = distance;
        vertex._color = COLOR.GREY;

        var neighbors = graph.getNeighbors(vertex);
        neighbors.forEach(function (neighbor) {
            if(neighbor._color === COLOR.WHITE) {
                neighbor._parent = vertex;
                GraphHelper.depthFirstSearchUtil(graph, neighbor, distance, result, searchValue);
            }
        });

        if(searchValue == vertex._label) {
            result.push(vertex);
        }

        vertex._color = COLOR.BLACK;
        distance = distance + 1;
    }

    static storeGraph(graph) {
        this.graphStore.push(graph);
    }

}

class Graph {

    constructor(vertices, edges, name, isDirected) {
        this._vertices = vertices;
        this._edges = edges;
        this._name = name ? name : GraphHelper.createUniqueIdOrLabel();
        this._adjList = {};
        this._isDirected = isDirected ? isDirected : false;
        this.initNeighbors();
    }

    getVertices() {
        return this._vertices;
    }

    getEdges() {
        return this._edges;
    }

    getGraphName() {
        return this._name;
    }

    addVertex(vertex) {
        this._vertices.push(vertex);
    }

    addEdge(edge) {
        this._edges.push(edge);
    }

    initNeighbors() {
        var that = this;
        this._edges.forEach(function (edge) {
            that._adjList[edge._source._label] = that._adjList[edge._source._label] ? that._adjList[edge._source._label] : new Array();
            that._adjList[edge._source._label].push(edge._destination);
            if(!that._isDirected) {
                that._adjList[edge._destination._label] = that._adjList[edge._destination._label] ? that._adjList[edge._destination._label] : new Array();
                that._adjList[edge._destination._label].push(edge._source);
            }
        });
    }

    getNeighbors(vertex) {
        return this._adjList[vertex._label];
    }

    breadthFirstSearch (searchValue) {
        if(!this._vertices || !this._edges) {
            return null;
        }

        var result = [];
        var vertices = this.getVertices();

        GraphHelper.initVertices(vertices);

        var queue = queue_op.initQueue();
        queue.addItem(vertices[0]);

        while(queue.size > 0) {
            var current_source_vertex = queue.pop();
            var neighbour_vertices = this.getNeighbors(current_source_vertex);
            neighbour_vertices.forEach(function (neighbor_vertex) {
                if(neighbor_vertex._color === COLOR.WHITE) {
                    neighbor_vertex._parent = current_source_vertex;
                    neighbor_vertex._logicalDistance = current_source_vertex._logicalDistance + 1;
                    neighbor_vertex.color = COLOR.GREY;
                    queue.addItem(neighbor_vertex);
                }
            });
            current_source_vertex._color = COLOR.BLACK;
            if(searchValue == current_source_vertex._label) {
                result.push(current_source_vertex);
            }
        }

        return result;

    }

    depthFirstSearch(searchValue) {
        if (!this._vertices || !this._edges) {
            return null;
        }

        var that = this;
        var result = [];
        var vertices = this.getVertices();
        GraphHelper.initVertices(vertices);
        var distance = 0;

        vertices.forEach(function (vertex) {
            if(vertex._color === COLOR.WHITE) {
                GraphHelper.depthFirstSearchUtil(that, vertex, distance, result, searchValue);
            }
        });

        return result;
    }


}


var graphStore = {};

/**
 * API
 */
exports.Vertex = Vertex;

exports.Edge = Edge;

exports.Graph = Graph;

exports.saveGraphInStore = function (graph) {
    if(!graphStore.hasOwnProperty(graph.getGraphName())) {
        graphStore[graph.getGraphName()] = graph;
        return true;
    }
    return false;
};

exports.getGraphFromStore = function (name) {
    if(graphStore.hasOwnProperty(name)) {
        return graphStore[name];
    }

    return null;

};