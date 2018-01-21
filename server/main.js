import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';
import {Client} from '../imports/api/search.js';

Meteor.startup(() => {
    // code to run on server at startup

});

Meteor.methods({
    'insert': function (obj) {
        let id = obj._id;
        delete obj._id;
        console.log(obj);
        Client.create({
            index: 'db',
            type: 'table',
            id,
            body: obj
        }, function (error, response) {
            console.log(response);
            return '添加成功';
        });
    },
    'update': function (obj) {
        let id = obj._id;
        delete obj._id;
        Client.update({
            index: 'db',
            type: 'table',
            id,
            body: {
                doc: obj
            }
        }, function (error, response) {
            console.log(error);
            return '更新成功';
        });
    },
    'delete': function (obj) {
        Client.delete({
            index: 'db',
            type: 'table',
            id: obj._id
        }, function (error, response) {
            console.log(response);
            return '删除成功';
        });
    },
    'query': function (obj) {
        console.log('-=================');

        var asyncFunc = function (callback) {
            Client.search({
                index: 'db',
                type: 'table',
                body: {
                    //query: {
                    //    "bool": {
                    //        //"must":     { "match": { "title": "quick" }},
                    //        //"must_not": { "match": { "title": "lazy"  }},
                    //        "should": [
                    //            {
                    //                "regexp": {
                    //                    "name": '*'+obj.name+'*'
                    //                }
                    //            }
                    //        ]
                    //    }
                    //},
                    "query": {
                        "multi_match": {
                            "query":       obj.name,
                            "type":        "most_fields",
                            "fields":      [ "name",'description']
                        }
                    },
                    sort: [
                        {"_score": {"order": "desc"}}
                    ]
                }
            }, function (error, response) {
                if (error) {
                    callback(error)
                } else {
                    callback(null, response);
                }
            });
        };

        var syncFunc = Meteor._wrapAsync(asyncFunc);

        return syncFunc();

    }
});
