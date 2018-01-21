import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';
import {Client} from '../imports/api/search.js';

Meteor.startup(() => {
  // code to run on server at startup

});
Meteor.methods({
    'insert':function(obj){
        let id = obj._id;
        delete obj._id;
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
    'update':function(obj){
        let id = obj._id;
        delete obj._id;
        Client.create({
            index: 'db',
            type: 'table',
            id,
            body: obj
        }, function (error, response) {
            console.log(response);
            return '更新成功';
        });
    },
    'delete':function(obj){
        Client.create({
            index: 'db',
            type: 'table',
            id:obj._id
        }, function (error, response) {
            console.log(response);
            return '删除成功';
        });
    },
    'query':function(obj){
        Client.search({
            index: 'db',
            body: {
                query: {
                    match: {
                        name: obj.name,
                        description:obj.description
                    }
                }
            }
        }, function (error, response) {
            console.log(response);
        });
        return '查询成功';
    }
});
