var EventStream = function() {
    var self = this;
    this.listeners = {};
}
EventStream.prototype.publish = function(message) {
    Object.keys(this.listeners).forEach(key => {
        const listener = this.listeners[key]
        listener(message);
    })
}
EventStream.prototype.subscribe = function(fonction) {
    if (typeof fonction !== "function") {
        throw new Error("fonction should be a function that receives a message and do something");
    }
    var self = this;
    var index = (Math.random()+"").substring(2);
    this.listeners[index] = fonction
    return {
        delete: function() {
            delete self.listeners[index];
        }
    }
}
EventStream.prototype.subEventStream = function(key) {
    return this.filter(function(message) {
        return message[key] !== undefined;
    }).map(function(message) {
        return message[key];
    });
}
EventStream.prototype.filter = function(fonction) {
    var subStream = new EventStream();
    this.subscribe(function(message) {
        if (fonction(message)) {
            subStream.publish(message);
        }
    });
    return subStream;
}
EventStream.prototype.map = function(fonction) {
    var subStream = new EventStream();
    this.subscribe(function(message) {
        subStream.publish(fonction(message));
    });
    return subStream;
}

module.exports = EventStream;