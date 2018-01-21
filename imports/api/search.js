/**
 **********************************************************
 *
 *
 * @author      wangzhiwei.
 * @date        2018/1/21.
 * @time        00:04.
 * @versions    0.0.0
 *
 *
 *********************************************************
 */
var elasticsearch = require('elasticsearch');
export const Client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});
