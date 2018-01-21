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
                doc:obj
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
        let temp = null;
        var promise = new Promise(function (resolve, reject) {
            Client.search({
                index: 'db',
                type: 'table',
                body: {
                    query: {
                        match: {
                            name: obj.name
                        }
                    }
                }
            }, function (error, response) {
                if (error) {
                    reject(error);
                } else {
                    resolve(response.hits.hits);
                }
            });

        });
        promise.then(function (value) {
            console.log('**************');
            console.log(value);
            temp = value;
            // success
        }, function (value) {
            // failure
        });
        return temp;

    }
});
