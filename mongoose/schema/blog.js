'use strict'

class Blog {
    constructor() {
        this.modelName = "BlogPost";
    }

    // 启动时执行一次
    register(mongoose) {
        // 定义model  model 层
        const Schema = mongoose.Schema;
        const ObjectId = Schema.ObjectId;
        mongoose.model(this.modelName, new Schema({
            author: ObjectId,
            title: String,
            body: String,
            date: Date
        }));
    }
}

module.exports = (()=>{
    return new Blog();
})();