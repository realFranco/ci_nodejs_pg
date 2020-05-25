/**
 * Dev: f97gp1@gmail.com
 * Date: May 24th, 2020
 * 
 * Integration tests for the route "/ci_user", testing all endpoints.
 */

const request = require('request');

const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');


var myEnv = dotenv.config();
dotenvExpand(myEnv);

const localhost = process.env.APP_URL;
const end_point = '/ci-user';

/**
 * Convert an Object into a correct url and trigger an API route.
 * 
 * @param {String} endPoint Route of the endpoint
 * @param {Object} filter Object, query parameters for the query.
 */
function edit_params(endPoint, filter){

    var params = '',
        goTo = '';

    for(var key in filter){
        let item = filter[key];

        if( item != "" )
            params += `${key}=${item}&`
    }
    params = params.slice(0,-1);
    goTo = endPoint + "?" +params;

    return {
        "url": goTo,
        "filter": filter
    };
}


test('Correct insertion into the ci_user table.', () =>{
    var options = {}, route = '';
        // { email   : 'f2@f', dev_lvl : 'Semi Sr. Backend Dev.' },
        // { email   : 'f@f', dev_lvl : 'Senior. Backend Dev.' },
    
    route = localhost + end_point;

    options = {
        method  : 'POST',
        url     : route,
        header  : {},
        formData: { email   : 'f3@f', dev_lvl : 'Junior Backend Dev.' }
    };

    request(options,  async (error, res) => {
        if (error) 
            throw new Error(error);
 
        actual_res = await JSON.parse( res.body );

        expect( actual_res.result ).toBe( 'ok' );
    });    
});


test('Query the row inserted into this test.', () =>{

    var data = { email   : 'f3@f', dev_lvl : 'Junior Backend Dev.' },
        options = {}, route = '';

    route = edit_params(localhost + end_point, data);

    options = {
        method  : 'GET',
        url     : route.url,
        headers : {},
        formData: {}
    };

    request(options, async (error, res) => {
        if (error) 
            throw new Error(error);

        actual_res = await JSON.parse( res.body );

        expect( actual_res.message ).toBe( 'object found' );
    });    
});


test('Delete the user inserted few test above.', () =>{

    var options = {}, route = '';

    route = localhost + end_point;

    options = {
        method  : 'DELETE',
        url     : route,
        headers : {},
        formData: { email : 'f3@f' }
    };

    request(options,  async (error, res) => {
        if (error) 
            throw new Error(error);

        actual_res = await JSON.parse( res.body );
        expect( actual_res.result ).toBe( 'ok' );
    });
});


test('Delete the previous row, again.', () =>{

    var options = {}, route = '';

    route = localhost + end_point;

    options = {
        method  : 'DELETE',
        url     : route,
        headers : {},
        formData: { email : 'f3@f'}
    };

    request(options,  async (error, res) => {
        if (error) 
            throw new Error(error);

        actual_res = await JSON.parse( res.body );
        expect( actual_res.result ).toBe( 'bad' );
    });
});


test('Query a un-existing row.', () =>{

    var data = { email   : 'f3@f', dev_lvl : 'Junior Backend Dev.' },
        options = {}, route = '';

    route = edit_params(localhost + end_point, data);

    options = {
        method  : 'GET',
        url     : route.url,
        headers : {},
        formData: {}
    };

    request(options, async (error, res) => {
        if (error) 
            throw new Error(error);

        actual_res = await JSON.parse( res.body );

        expect( actual_res.message ).toBe( 'object not found' );
    });  
});
