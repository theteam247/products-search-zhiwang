/**
 **********************************************************
 *
 *
 * @author      wangzhiwei.
 * @date        2018/1/20.
 * @time        22:42.
 * @versions    0.0.0
 *
 *
 *********************************************************
 */
import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.html';

Template.task.events({
    'input .name'(event){
        const _id = this._id;
        event.preventDefault();
        var name = event.target.value;
        console.log(name);
        Tasks.update(_id, {
            $set: { name }
        },function(err,result){
            if(!err){
                Meteor.call('update',{_id,name},function(back){
                    alert(back);
                })
            }
        });
    },
    'input .price'(event){
        const _id = this._id;
        event.preventDefault();
        var price = event.target.value;
        console.log(price);
        Tasks.update(_id, {
            $set: { price }
        },function(err,result){
            if(!err){
                Meteor.call('update',{_id,price},function(back){
                    alert(back);
                })
            }
        });
    },
    'input .description'(event){
        const _id = this._id;
        event.preventDefault();
        var description = event.target.value;
        console.log(description);
        Tasks.update(_id, {
            $set: { description }
        },function(err,result){
            if(!err){
                Meteor.call('update',{_id,description},function(back){
                    alert(back);
                })
            }
        });
    },
    'click .delete'() {
        const _id = this._id;
        Tasks.remove(this._id,function(err,result){
            if(!err){
                Meteor.call('delete',{_id},function(back){
                    alert(back);
                })
            }
        });
    },
});
