const EventStreamSync = require("./EventStreamSync")

describe("EventStreamSync", () => {
    describe("publish method", () => {
        it("should trigger all listeners", () => {
            const stream = new EventStreamSync()
            let call1, call2
            stream.subscribe(() => {
                call1 = true
            })
            stream.subscribe(() => {
                call2 = true
            })
            expect(call1).to.equal(undefined)
            expect(call2).to.equal(undefined)
            stream.publish()
            expect(call1).to.equal(true)
            expect(call2).to.equal(true)
        })
    })
    describe("subscribe method", () => {
        it("should be deletable", () => {
            const stream = new EventStreamSync()
            let call1
            const listener = stream.subscribe(() => {
                call1 = true
            })
            expect(call1).to.equal(undefined)
            listener.delete()
            stream.publish()
            expect(call1).to.equal(undefined)
        })
    })
    describe("subEventStream method", () => {
        it("should create an event stream binded to a key of the main stream", () => {
            const stream = new EventStreamSync()
            const sub = stream.subEventStream("myKey")
            let lastEvent
            sub.subscribe(event => {
                lastEvent = event
            })
            expect(lastEvent).to.equal(undefined)
            stream.publish(undefined)
            stream.publish(null)
            stream.publish(0)
            stream.publish(1)
            stream.publish("sjdhfgsdj")
            stream.publish(true)
            stream.publish(false)
            stream.publish(false)
            stream.publish({plop: 1})
            expect(lastEvent).to.equal(undefined)
            stream.publish({myKey: 2})
            expect(lastEvent).to.equal(2)
        })
    })
})