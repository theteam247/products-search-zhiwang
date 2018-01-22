import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import './task.js'
import './body.html';
let flag = false;
Template.body.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.searchData = new ReactiveVar([]);
});
Template.body.helpers({
    tasks() {
        let temp = Tasks.find({}, {sort: {createdAt: -1}});
        return temp.fetch();
    },
    searchData(){
        return Template.instance().searchData.get();
    }
});
Template.body.onRendered(function(){
    $('.new-data').validate({
        rules: {
            name: {
                required: true
            },
            price:{
                number:true
            }
        }
    });
});
Template.body.events({
    'submit .new-task'(event,instance) {
        // Prevent default browser form submit
        event.preventDefault();
        // Get value from form element
        const target = event.target;
        const name = target.text.value;

       Meteor.call('query',{
           name
       },function(err,result){
           let temp = [];
           console.log(result.hits.hits);
           for (var value of result.hits.hits) {
               temp.push(value._source);
           }
           console.log(temp);
           instance.searchData.set(temp);
       });

        // Clear form
        target.text.value = '';
    },
    'submit .new-data'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const name = target.name.value;
        const price = target.price.value;
        const description = target.description.value;
        let value = {
            name,
            price,
            description,
            createdAt: new Date() // current time
        };

        // Insert a task into the collection
        Tasks.insert(value,function(err,id){
            console.log('插入回调');
            console.log(id);
            value._id = id;
            Meteor.call("insert",value,function(err,result){
                console.log(result);
            });
        });

        // Clear form
        target.name.value = '';
        target.price.value = '';
        target.description.value = '';
    },
});