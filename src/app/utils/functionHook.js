/*
    create a global container for hooks,  which has a prototype (default) the holds 
    the original functions.  the global object is saved on the global context
    (window by default)
*/
const defaults= {};
const globalFunctions = (function (defaults){
    return Object.create(defaults);
})(defaults);

(function(global){
    global.__GLOBAL_FUNCTION_HOOKS__=globalFunctions;
})(window);

/**
 * Creates a hook with name 'name' for function 'f', that can be accessed on
 *  __GLOBAL_FUNCTION_HOOKS to override function behaviour.
 * Returns a wrapped function that uses the hook
 * 
 * @param {string} name the of the hook
 * @param {Function} f the function to wrap
 */
export default function (f,name) {
    Object.defineProperty(defaults, name,
        {writable: true, enumerable:false, configurable:true, value: f});

    return function (){
        return globalFunctions[name].apply(undefined,arguments);
    };
}
