

class Test {
   
    constructor(topicslist,name) {
        this.topics=[];
        this.name=name;
        this.date= new Date();
        console.log("[Test] ",this.topics.length)
        topicslist.forEach(element => {
            this.topics.push(element);
        });
    }
    get name() {
        
        return this._name;
    }
    set name(value){
        this._name=value;
    }

    get count() {
        return this.topics.length;
    }

    addtopic(obect_topic){
        this.topics.push(obect_topic)
    }

    log(message) {
        const timestamp = new Date().toISOString();
        this.topics.push({ message, timestamp });
        console.log(`${timestamp} - ${message}`);
    }

}


module.exports = Test;
