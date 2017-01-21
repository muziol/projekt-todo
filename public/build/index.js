(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var qwest = require("qwest");
var tablica = [];

getTasks();

function getTasks(){
	qwest.get('http://localhost:3000/api/todo').then(function(xhr, response) {
		tablica = response;
		render();
		console.log(tablica);
	});
};

function getTask(id){
	qwest.get("http://localhost:3000/api/todo/" + id).then(function(xhr, response){
		console.log(response);
	})
	.catch(function(e, xhr, response) {
		console.log(e);
	});
};

function deleteTask(){
	
	for (i = 0; i < tablica.length; i++  ){

		if (tablica[i].rem == true){

			var newUrl = 'http://localhost:3000/api/todo/' + tablica[i].id;

			qwest.delete(newUrl, null, {
				cache: true
			})
			.then(function(xhr, response){
				getTasks();
			})
			.catch(function(e, xhr, response){
				alert("delete errod: " + e);
			});

		};
	};
};

function addTask(){
	newUrl = 'http://localhost:3000/api/todo';
	var gettextarea = document.getElementById("content_todo");
	var getdate = document.getElementById("data_todo");
	var x = {
		id: tablica.length +1,
		content: '',
		time: '',
		rem: false
	}
	console.log(getdate.value);
	console.log(gettextarea.value);
	console.log(x.content);
	console.log(x.time);
	x.content = gettextarea.value;
	x.time = getdate.value;
	

	if (x.content == '' || x.time  == ''){
		alert("Dodaj treść lub/i datę");
	}
	else {
		qwest.post(newUrl, x, {
			cache: true
		})
		.then(function(xhr, response){
			getTasks();
		})
		.catch(function(e, xhr, response){
			alert("post error: " + e);
		});
	}	
	getTasks();
	console.table(tablica);
}



function sort() {
	tablica.sort(function(x,y){
		if (x.time > y.time)
			return 1;
		return -1;
	});
}

function render() {
	var dodaj = document.getElementById("lista_todo");


	while ( dodaj.firstChild ){
	 	 dodaj.removeChild( dodaj.firstChild );
	}

	sort(); 

	var today = new Date(),
		dd = today.getDate(),
		mm = today.getMonth()+1, //January is 0
		yyyy = today.getFullYear();

	if(dd<10) {
    	dd='0'+dd
	} 

	if(mm<10) {
    	mm='0'+mm
	} 

	today = yyyy + '-' + mm + '-' + dd; // current date

	//console.log( today );
	console.log(tablica.length);
	var i;
	for (i = 0; i < tablica.length; i++  ) {
		if (tablica[i].rem == false){
			var li = document.createElement("li"),
				checkbox1 = document.createElement("input"),
				span = document.createElement("span");
			checkbox1.type = "checkbox";
			checkbox1.id = i;
			checkbox1.addEventListener("click", change);
			dodaj.appendChild(li);
			li.appendChild(checkbox1);
			li.appendChild(span);
			//console.log(tablica[i].time);
			//console.log(today);
			//console.log(tablica[i].time == today);
			//console.log(tablica[i].time > today);
			//console.log(tablica[i].time < today);

			// today
			if (tablica[i].time == today) {
				li.style.background = "green";
			}
			// past days
			else if (tablica[i].time > today){
				li.style.background = "yellow";
			}
			// future days
			else if (tablica[i].time < today){
				li.style.background = "red";
			}

			span.innerHTML = tablica[i].content + ". Do kiedy: " + tablica[i].time;
			console.log("dodalem" + tablica[i].id + tablica[i].content + tablica[i].time + tablica[i].rem);
		}
	}
}



function addEl() {
	addTask();
}

function change() {
	tablica[this.id].rem = !tablica[this.id].rem
}

function remEl() {
	deleteTask();
}


var buttonAdd = document.getElementById("ADDKURWA");
buttonAdd.addEventListener( "click", addEl );

var buttonAdd = document.getElementById("REMKURWA");
buttonAdd.addEventListener( "click", remEl );



},{"qwest":5}],2:[function(require,module,exports){
/**
 * @preserve jquery-param (c) 2015 KNOWLEDGECODE | MIT
 */
/*global define */
(function (global) {
    'use strict';

    var param = function (a) {
        var add = function (s, k, v) {
            v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
            s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
        }, buildParams = function (prefix, obj, s) {
            var i, len, key;

            if (Object.prototype.toString.call(obj) === '[object Array]') {
                for (i = 0, len = obj.length; i < len; i++) {
                    buildParams(prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']', obj[i], s);
                }
            } else if (obj && obj.toString() === '[object Object]') {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (prefix) {
                            buildParams(prefix + '[' + key + ']', obj[key], s, add);
                        } else {
                            buildParams(key, obj[key], s, add);
                        }
                    }
                }
            } else if (prefix) {
                add(s, prefix, obj);
            } else {
                for (key in obj) {
                    add(s, key, obj[key]);
                }
            }
            return s;
        };
        return buildParams('', a, []).join('&').replace(/%20/g, '+');
    };

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = param;
    } else if (typeof define === 'function' && define.amd) {
        define([], function () {
            return param;
        });
    } else {
        global.param = param;
    }

}(this));

},{}],3:[function(require,module,exports){
(function (process){
/*
 * PinkySwear.js 2.2.2 - Minimalistic implementation of the Promises/A+ spec
 * 
 * Public Domain. Use, modify and distribute it any way you like. No attribution required.
 *
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 *
 * PinkySwear is a very small implementation of the Promises/A+ specification. After compilation with the
 * Google Closure Compiler and gzipping it weighs less than 500 bytes. It is based on the implementation for 
 * Minified.js and should be perfect for embedding. 
 *
 *
 * PinkySwear has just three functions.
 *
 * To create a new promise in pending state, call pinkySwear():
 *         var promise = pinkySwear();
 *
 * The returned object has a Promises/A+ compatible then() implementation:
 *          promise.then(function(value) { alert("Success!"); }, function(value) { alert("Failure!"); });
 *
 *
 * The promise returned by pinkySwear() is a function. To fulfill the promise, call the function with true as first argument and
 * an optional array of values to pass to the then() handler. By putting more than one value in the array, you can pass more than one
 * value to the then() handlers. Here an example to fulfill a promsise, this time with only one argument: 
 *         promise(true, [42]);
 *
 * When the promise has been rejected, call it with false. Again, there may be more than one argument for the then() handler:
 *         promise(true, [6, 6, 6]);
 *         
 * You can obtain the promise's current state by calling the function without arguments. It will be true if fulfilled,
 * false if rejected, and otherwise undefined.
 * 		   var state = promise(); 
 * 
 * https://github.com/timjansen/PinkySwear.js
 */
(function(target) {
	var undef;

	function isFunction(f) {
		return typeof f == 'function';
	}
	function isObject(f) {
		return typeof f == 'object';
	}
	function defer(callback) {
		if (typeof setImmediate != 'undefined')
			setImmediate(callback);
		else if (typeof process != 'undefined' && process['nextTick'])
			process['nextTick'](callback);
		else
			setTimeout(callback, 0);
	}

	target[0][target[1]] = function pinkySwear(extend) {
		var state;           // undefined/null = pending, true = fulfilled, false = rejected
		var values = [];     // an array of values as arguments for the then() handlers
		var deferred = [];   // functions to call when set() is invoked

		var set = function(newState, newValues) {
			if (state == null && newState != null) {
				state = newState;
				values = newValues;
				if (deferred.length)
					defer(function() {
						for (var i = 0; i < deferred.length; i++)
							deferred[i]();
					});
			}
			return state;
		};

		set['then'] = function (onFulfilled, onRejected) {
			var promise2 = pinkySwear(extend);
			var callCallbacks = function() {
	    		try {
	    			var f = (state ? onFulfilled : onRejected);
	    			if (isFunction(f)) {
		   				function resolve(x) {
						    var then, cbCalled = 0;
		   					try {
				   				if (x && (isObject(x) || isFunction(x)) && isFunction(then = x['then'])) {
										if (x === promise2)
											throw new TypeError();
										then['call'](x,
											function() { if (!cbCalled++) resolve.apply(undef,arguments); } ,
											function(value){ if (!cbCalled++) promise2(false,[value]);});
				   				}
				   				else
				   					promise2(true, arguments);
		   					}
		   					catch(e) {
		   						if (!cbCalled++)
		   							promise2(false, [e]);
		   					}
		   				}
		   				resolve(f.apply(undef, values || []));
		   			}
		   			else
		   				promise2(state, values);
				}
				catch (e) {
					promise2(false, [e]);
				}
			};
			if (state != null)
				defer(callCallbacks);
			else
				deferred.push(callCallbacks);
			return promise2;
		};
        if(extend){
            set = extend(set);
        }
		return set;
	};
})(typeof module == 'undefined' ? [window, 'pinkySwear'] : [module, 'exports']);


}).call(this,require('_process'))

},{"_process":4}],4:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],5:[function(require,module,exports){
/*! qwest 4.4.5 (https://github.com/pyrsmk/qwest) */

module.exports = function() {

	var global = typeof window != 'undefined' ? window : self,
		pinkyswear = require('pinkyswear'),
		jparam = require('jquery-param'),
		defaultOptions = {},
		// Default response type for XDR in auto mode
		defaultXdrResponseType = 'json',
		// Default data type
		defaultDataType = 'post',
		// Variables for limit mechanism
		limit = null,
		requests = 0,
		request_stack = [],
		// Get XMLHttpRequest object
		getXHR = global.XMLHttpRequest? function(){
			return new global.XMLHttpRequest();
		}: function(){
			return new ActiveXObject('Microsoft.XMLHTTP');
		},
		// Guess XHR version
		xhr2 = (getXHR().responseType===''),

	// Core function
	qwest = function(method, url, data, options, before) {
		// Format
		method = method.toUpperCase();
		data = data || null;
		options = options || {};
		for(var name in defaultOptions) {
			if(!(name in options)) {
				if(typeof defaultOptions[name] == 'object' && typeof options[name] == 'object') {
					for(var name2 in defaultOptions[name]) {
						options[name][name2] = defaultOptions[name][name2];
					}
				}
				else {
					options[name] = defaultOptions[name];
				}
			}
		}

		// Define variables
		var nativeResponseParsing = false,
			crossOrigin,
			xhr,
			xdr = false,
			timeout,
			aborted = false,
			attempts = 0,
			headers = {},
			mimeTypes = {
				text: '*/*',
				xml: 'text/xml',
				json: 'application/json',
				post: 'application/x-www-form-urlencoded',
				document: 'text/html'
			},
			accept = {
				text: '*/*',
				xml: 'application/xml; q=1.0, text/xml; q=0.8, */*; q=0.1',
				json: 'application/json; q=1.0, text/*; q=0.8, */*; q=0.1'
			},
			i, j,
			response,
			sending = false,

		// Create the promise
		promise = pinkyswear(function(pinky) {
			pinky.abort = function() {
				if(!aborted) {
					if(xhr && xhr.readyState != 4) { // https://stackoverflow.com/questions/7287706/ie-9-javascript-error-c00c023f
						xhr.abort();
					}
					if(sending) {
						--requests;
						sending = false;
					}
					aborted = true;
				}
			};
			pinky.send = function() {
				// Prevent further send() calls
				if(sending) {
					return;
				}
				// Reached request limit, get out!
				if(requests == limit) {
					request_stack.push(pinky);
					return;
				}
				// Verify if the request has not been previously aborted
				if(aborted) {
					if(request_stack.length) {
						request_stack.shift().send();
					}
					return;
				}
				// The sending is running
				++requests;
				sending = true;
				// Get XHR object
				xhr = getXHR();
				if(crossOrigin) {
					if(!('withCredentials' in xhr) && global.XDomainRequest) {
						xhr = new XDomainRequest(); // CORS with IE8/9
						xdr = true;
						if(method != 'GET' && method != 'POST') {
							method = 'POST';
						}
					}
				}
				// Open connection
				if(xdr) {
					xhr.open(method, url);
				}
				else {
					xhr.open(method, url, options.async, options.user, options.password);
					if(xhr2 && options.async) {
						xhr.withCredentials = options.withCredentials;
					}
				}
				// Set headers
				if(!xdr) {
					for(var i in headers) {
						if(headers[i]) {
							xhr.setRequestHeader(i, headers[i]);
						}
					}
				}
				// Verify if the response type is supported by the current browser
				if(xhr2 && options.responseType != 'auto') {
					try {
						xhr.responseType = options.responseType;
						nativeResponseParsing = (xhr.responseType == options.responseType);
					}
					catch(e) {}
				}
				// Plug response handler
				if(xhr2 || xdr) {
					xhr.onload = handleResponse;
					xhr.onerror = handleError;
					// http://cypressnorth.com/programming/internet-explorer-aborting-ajax-requests-fixed/
					if(xdr) {
						xhr.onprogress = function() {};
					}
				}
				else {
					xhr.onreadystatechange = function() {
						if(xhr.readyState == 4) {
							handleResponse();
						}
					};
				}
				// Plug timeout
				if(options.async) {
					if('timeout' in xhr) {
						xhr.timeout = options.timeout;
						xhr.ontimeout = handleTimeout;
					}
					else {
						timeout = setTimeout(handleTimeout, options.timeout);
					}
				}
				// http://cypressnorth.com/programming/internet-explorer-aborting-ajax-requests-fixed/
				else if(xdr) {
					xhr.ontimeout = function() {};
				}
				// Override mime type to ensure the response is well parsed
				if(options.responseType != 'auto' && 'overrideMimeType' in xhr) {
					xhr.overrideMimeType(mimeTypes[options.responseType]);
				}
				// Run 'before' callback
				if(before) {
					before(xhr);
				}
				// Send request
				if(xdr) {
					// https://developer.mozilla.org/en-US/docs/Web/API/XDomainRequest
					setTimeout(function() {
						xhr.send(method != 'GET'? data : null);
					}, 0);
				}
				else {
					xhr.send(method != 'GET' ? data : null);
				}
			};
			return pinky;
		}),

		// Handle the response
		handleResponse = function() {
			var i, responseType;
			// Stop sending state
			sending = false;
			clearTimeout(timeout);
			// Launch next stacked request
			if(request_stack.length) {
				request_stack.shift().send();
			}
			// Verify if the request has not been previously aborted
			if(aborted) {
				return;
			}
			// Decrease the number of requests
			--requests;
			// Handle response
			try{
				// Process response
				if(nativeResponseParsing) {
					if('response' in xhr && xhr.response === null) {
						throw 'The request response is empty';
					}
					response = xhr.response;
				}
				else {
					// Guess response type
					responseType = options.responseType;
					if(responseType == 'auto') {
						if(xdr) {
							responseType = defaultXdrResponseType;
						}
						else {
							var ct = xhr.getResponseHeader('Content-Type') || '';
							if(ct.indexOf(mimeTypes.json)>-1) {
								responseType = 'json';
							}
							else if(ct.indexOf(mimeTypes.xml) > -1) {
								responseType = 'xml';
							}
							else {
								responseType = 'text';
							}
						}
					}
					// Handle response type
					switch(responseType) {
						case 'json':
							if(xhr.responseText.length) {
								try {
									if('JSON' in global) {
										response = JSON.parse(xhr.responseText);
									}
									else {
										response = new Function('return (' + xhr.responseText + ')')();
									}
								}
								catch(e) {
									throw "Error while parsing JSON body : "+e;
								}
							}
							break;
						case 'xml':
							// Based on jQuery's parseXML() function
							try {
								// Standard
								if(global.DOMParser) {
									response = (new DOMParser()).parseFromString(xhr.responseText,'text/xml');
								}
								// IE<9
								else {
									response = new ActiveXObject('Microsoft.XMLDOM');
									response.async = 'false';
									response.loadXML(xhr.responseText);
								}
							}
							catch(e) {
								response = undefined;
							}
							if(!response || !response.documentElement || response.getElementsByTagName('parsererror').length) {
								throw 'Invalid XML';
							}
							break;
						default:
							response = xhr.responseText;
					}
				}
				// Late status code verification to allow passing data when, per example, a 409 is returned
				// --- https://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
				if('status' in xhr && !/^2|1223/.test(xhr.status)) {
					throw xhr.status + ' (' + xhr.statusText + ')';
				}
				// Fulfilled
				promise(true, [xhr, response]);
			}
			catch(e) {
				// Rejected
				promise(false, [e, xhr, response]);
			}
		},

		// Handle errors
		handleError = function(message) {
			if(!aborted) {
				message = typeof message == 'string' ? message : 'Connection aborted';
				promise.abort();
				promise(false, [new Error(message), xhr, null]);
			}
		},
			
		// Handle timeouts
		handleTimeout = function() {
			if(!aborted) {
				if(!options.attempts || ++attempts != options.attempts) {
					xhr.abort();
					sending = false;
					promise.send();
				}
				else {
					handleError('Timeout (' + url + ')');
				}
			}
		};

		// Normalize options
		options.async = 'async' in options ? !!options.async : true;
		options.cache = 'cache' in options ? !!options.cache : false;
		options.dataType = 'dataType' in options ? options.dataType.toLowerCase() : defaultDataType;
		options.responseType = 'responseType' in options ? options.responseType.toLowerCase() : 'auto';
		options.user = options.user || '';
		options.password = options.password || '';
		options.withCredentials = !!options.withCredentials;
		options.timeout = 'timeout' in options ? parseInt(options.timeout, 10) : 30000;
		options.attempts = 'attempts' in options ? parseInt(options.attempts, 10) : 1;

		// Guess if we're dealing with a cross-origin request
		i = url.match(/\/\/(.+?)\//);
		crossOrigin = i && (i[1] ? i[1] != location.host : false);

		// Prepare data
		if('ArrayBuffer' in global && data instanceof ArrayBuffer) {
			options.dataType = 'arraybuffer';
		}
		else if('Blob' in global && data instanceof Blob) {
			options.dataType = 'blob';
		}
		else if('Document' in global && data instanceof Document) {
			options.dataType = 'document';
		}
		else if('FormData' in global && data instanceof FormData) {
			options.dataType = 'formdata';
		}
		if(data !== null) {
			switch(options.dataType) {
				case 'json':
					data = JSON.stringify(data);
					break;
				case 'post':
					data = jparam(data);
			}
		}

		// Prepare headers
		if(options.headers) {
			var format = function(match,p1,p2) {
				return p1 + p2.toUpperCase();
			};
			for(i in options.headers) {
				headers[i.replace(/(^|-)([^-])/g,format)] = options.headers[i];
			}
		}
		if(!('Content-Type' in headers) && method!='GET') {
			if(options.dataType in mimeTypes) {
				if(mimeTypes[options.dataType]) {
					headers['Content-Type'] = mimeTypes[options.dataType];
				}
			}
		}
		if(!headers.Accept) {
			headers.Accept = (options.responseType in accept) ? accept[options.responseType] : '*/*';
		}
		if(!crossOrigin && !('X-Requested-With' in headers)) { // (that header breaks in legacy browsers with CORS)
			headers['X-Requested-With'] = 'XMLHttpRequest';
		}
		if(!options.cache && !('Cache-Control' in headers)) {
			headers['Cache-Control'] = 'no-cache';
		}

		// Prepare URL
		if(method == 'GET' && data && typeof data == 'string') {
			url += (/\?/.test(url)?'&':'?') + data;
		}

		// Start the request
		if(options.async) {
			promise.send();
		}

		// Return promise
		return promise;

	};
	
	// Define external qwest object
	var getNewPromise = function(q) {
			// Prepare
			var promises = [],
				loading = 0,
				values = [];
			// Create a new promise to handle all requests
			return pinkyswear(function(pinky) {
				// Basic request method
				var method_index = -1,
					createMethod = function(method) {
						return function(url, data, options, before) {
							var index = ++method_index;
							++loading;
							promises.push(qwest(method, pinky.base + url, data, options, before).then(function(xhr, response) {
								values[index] = arguments;
								if(!--loading) {
									pinky(true, values.length == 1 ? values[0] : [values]);
								}
							}, function() {
								pinky(false, arguments);
							}));
							return pinky;
						};
					};
				// Define external API
				pinky.get = createMethod('GET');
				pinky.post = createMethod('POST');
				pinky.put = createMethod('PUT');
				pinky['delete'] = createMethod('DELETE');
				pinky['catch'] = function(f) {
					return pinky.then(null, f);
				};
				pinky.complete = function(f) {
					var func = function() {
						f(); // otherwise arguments will be passed to the callback
					};
					return pinky.then(func, func);
				};
				pinky.map = function(type, url, data, options, before) {
					return createMethod(type.toUpperCase()).call(this, url, data, options, before);
				};
				// Populate methods from external object
				for(var prop in q) {
					if(!(prop in pinky)) {
						pinky[prop] = q[prop];
					}
				}
				// Set last methods
				pinky.send = function() {
					for(var i=0, j=promises.length; i<j; ++i) {
						promises[i].send();
					}
					return pinky;
				};
				pinky.abort = function() {
					for(var i=0, j=promises.length; i<j; ++i) {
						promises[i].abort();
					}
					return pinky;
				};
				return pinky;
			});
		},
		q = {
			base: '',
			get: function() {
				return getNewPromise(q).get.apply(this, arguments);
			},
			post: function() {
				return getNewPromise(q).post.apply(this, arguments);
			},
			put: function() {
				return getNewPromise(q).put.apply(this, arguments);
			},
			'delete': function() {
				return getNewPromise(q)['delete'].apply(this, arguments);
			},
			map: function() {
				return getNewPromise(q).map.apply(this, arguments);
			},
			xhr2: xhr2,
			limit: function(by) {
				limit = by;
				return q;
			},
			setDefaultOptions: function(options) {
				defaultOptions = options;
				return q;
			},
			setDefaultXdrResponseType: function(type) {
				defaultXdrResponseType = type.toLowerCase();
				return q;
			},
			setDefaultDataType: function(type) {
				defaultDataType = type.toLowerCase();
				return q;
			},
			getOpenRequests: function() {
				return requests;
			}
		};
	
	return q;

}();

},{"jquery-param":2,"pinkyswear":3}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvaW5kZXguanMiLCJub2RlX21vZHVsZXMvanF1ZXJ5LXBhcmFtL2pxdWVyeS1wYXJhbS5qcyIsIm5vZGVfbW9kdWxlcy9waW5reXN3ZWFyL3Bpbmt5c3dlYXIuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3F3ZXN0L3NyYy9xd2VzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3JIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHF3ZXN0ID0gcmVxdWlyZShcInF3ZXN0XCIpO1xyXG52YXIgdGFibGljYSA9IFtdO1xyXG5cclxuZ2V0VGFza3MoKTtcclxuXHJcbmZ1bmN0aW9uIGdldFRhc2tzKCl7XHJcblx0cXdlc3QuZ2V0KCdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL3RvZG8nKS50aGVuKGZ1bmN0aW9uKHhociwgcmVzcG9uc2UpIHtcclxuXHRcdHRhYmxpY2EgPSByZXNwb25zZTtcclxuXHRcdHJlbmRlcigpO1xyXG5cdFx0Y29uc29sZS5sb2codGFibGljYSk7XHJcblx0fSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBnZXRUYXNrKGlkKXtcclxuXHRxd2VzdC5nZXQoXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL3RvZG8vXCIgKyBpZCkudGhlbihmdW5jdGlvbih4aHIsIHJlc3BvbnNlKXtcclxuXHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuXHR9KVxyXG5cdC5jYXRjaChmdW5jdGlvbihlLCB4aHIsIHJlc3BvbnNlKSB7XHJcblx0XHRjb25zb2xlLmxvZyhlKTtcclxuXHR9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVRhc2soKXtcclxuXHRcclxuXHRmb3IgKGkgPSAwOyBpIDwgdGFibGljYS5sZW5ndGg7IGkrKyAgKXtcclxuXHJcblx0XHRpZiAodGFibGljYVtpXS5yZW0gPT0gdHJ1ZSl7XHJcblxyXG5cdFx0XHR2YXIgbmV3VXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvdG9kby8nICsgdGFibGljYVtpXS5pZDtcclxuXHJcblx0XHRcdHF3ZXN0LmRlbGV0ZShuZXdVcmwsIG51bGwsIHtcclxuXHRcdFx0XHRjYWNoZTogdHJ1ZVxyXG5cdFx0XHR9KVxyXG5cdFx0XHQudGhlbihmdW5jdGlvbih4aHIsIHJlc3BvbnNlKXtcclxuXHRcdFx0XHRnZXRUYXNrcygpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQuY2F0Y2goZnVuY3Rpb24oZSwgeGhyLCByZXNwb25zZSl7XHJcblx0XHRcdFx0YWxlcnQoXCJkZWxldGUgZXJyb2Q6IFwiICsgZSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH07XHJcblx0fTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFkZFRhc2soKXtcclxuXHRuZXdVcmwgPSAnaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS90b2RvJztcclxuXHR2YXIgZ2V0dGV4dGFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRfdG9kb1wiKTtcclxuXHR2YXIgZ2V0ZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGF0YV90b2RvXCIpO1xyXG5cdHZhciB4ID0ge1xyXG5cdFx0aWQ6IHRhYmxpY2EubGVuZ3RoICsxLFxyXG5cdFx0Y29udGVudDogJycsXHJcblx0XHR0aW1lOiAnJyxcclxuXHRcdHJlbTogZmFsc2VcclxuXHR9XHJcblx0Y29uc29sZS5sb2coZ2V0ZGF0ZS52YWx1ZSk7XHJcblx0Y29uc29sZS5sb2coZ2V0dGV4dGFyZWEudmFsdWUpO1xyXG5cdGNvbnNvbGUubG9nKHguY29udGVudCk7XHJcblx0Y29uc29sZS5sb2coeC50aW1lKTtcclxuXHR4LmNvbnRlbnQgPSBnZXR0ZXh0YXJlYS52YWx1ZTtcclxuXHR4LnRpbWUgPSBnZXRkYXRlLnZhbHVlO1xyXG5cdFxyXG5cclxuXHRpZiAoeC5jb250ZW50ID09ICcnIHx8IHgudGltZSAgPT0gJycpe1xyXG5cdFx0YWxlcnQoXCJEb2RhaiB0cmXFm8SHIGx1Yi9pIGRhdMSZXCIpO1xyXG5cdH1cclxuXHRlbHNlIHtcclxuXHRcdHF3ZXN0LnBvc3QobmV3VXJsLCB4LCB7XHJcblx0XHRcdGNhY2hlOiB0cnVlXHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oZnVuY3Rpb24oeGhyLCByZXNwb25zZSl7XHJcblx0XHRcdGdldFRhc2tzKCk7XHJcblx0XHR9KVxyXG5cdFx0LmNhdGNoKGZ1bmN0aW9uKGUsIHhociwgcmVzcG9uc2Upe1xyXG5cdFx0XHRhbGVydChcInBvc3QgZXJyb3I6IFwiICsgZSk7XHJcblx0XHR9KTtcclxuXHR9XHRcclxuXHRnZXRUYXNrcygpO1xyXG5cdGNvbnNvbGUudGFibGUodGFibGljYSk7XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gc29ydCgpIHtcclxuXHR0YWJsaWNhLnNvcnQoZnVuY3Rpb24oeCx5KXtcclxuXHRcdGlmICh4LnRpbWUgPiB5LnRpbWUpXHJcblx0XHRcdHJldHVybiAxO1xyXG5cdFx0cmV0dXJuIC0xO1xyXG5cdH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXIoKSB7XHJcblx0dmFyIGRvZGFqID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaXN0YV90b2RvXCIpO1xyXG5cclxuXHJcblx0d2hpbGUgKCBkb2Rhai5maXJzdENoaWxkICl7XHJcblx0IFx0IGRvZGFqLnJlbW92ZUNoaWxkKCBkb2Rhai5maXJzdENoaWxkICk7XHJcblx0fVxyXG5cclxuXHRzb3J0KCk7IFxyXG5cclxuXHR2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpLFxyXG5cdFx0ZGQgPSB0b2RheS5nZXREYXRlKCksXHJcblx0XHRtbSA9IHRvZGF5LmdldE1vbnRoKCkrMSwgLy9KYW51YXJ5IGlzIDBcclxuXHRcdHl5eXkgPSB0b2RheS5nZXRGdWxsWWVhcigpO1xyXG5cclxuXHRpZihkZDwxMCkge1xyXG4gICAgXHRkZD0nMCcrZGRcclxuXHR9IFxyXG5cclxuXHRpZihtbTwxMCkge1xyXG4gICAgXHRtbT0nMCcrbW1cclxuXHR9IFxyXG5cclxuXHR0b2RheSA9IHl5eXkgKyAnLScgKyBtbSArICctJyArIGRkOyAvLyBjdXJyZW50IGRhdGVcclxuXHJcblx0Ly9jb25zb2xlLmxvZyggdG9kYXkgKTtcclxuXHRjb25zb2xlLmxvZyh0YWJsaWNhLmxlbmd0aCk7XHJcblx0dmFyIGk7XHJcblx0Zm9yIChpID0gMDsgaSA8IHRhYmxpY2EubGVuZ3RoOyBpKysgICkge1xyXG5cdFx0aWYgKHRhYmxpY2FbaV0ucmVtID09IGZhbHNlKXtcclxuXHRcdFx0dmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpLFxyXG5cdFx0XHRcdGNoZWNrYm94MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSxcclxuXHRcdFx0XHRzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcblx0XHRcdGNoZWNrYm94MS50eXBlID0gXCJjaGVja2JveFwiO1xyXG5cdFx0XHRjaGVja2JveDEuaWQgPSBpO1xyXG5cdFx0XHRjaGVja2JveDEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNoYW5nZSk7XHJcblx0XHRcdGRvZGFqLmFwcGVuZENoaWxkKGxpKTtcclxuXHRcdFx0bGkuYXBwZW5kQ2hpbGQoY2hlY2tib3gxKTtcclxuXHRcdFx0bGkuYXBwZW5kQ2hpbGQoc3Bhbik7XHJcblx0XHRcdC8vY29uc29sZS5sb2codGFibGljYVtpXS50aW1lKTtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyh0b2RheSk7XHJcblx0XHRcdC8vY29uc29sZS5sb2codGFibGljYVtpXS50aW1lID09IHRvZGF5KTtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyh0YWJsaWNhW2ldLnRpbWUgPiB0b2RheSk7XHJcblx0XHRcdC8vY29uc29sZS5sb2codGFibGljYVtpXS50aW1lIDwgdG9kYXkpO1xyXG5cclxuXHRcdFx0Ly8gdG9kYXlcclxuXHRcdFx0aWYgKHRhYmxpY2FbaV0udGltZSA9PSB0b2RheSkge1xyXG5cdFx0XHRcdGxpLnN0eWxlLmJhY2tncm91bmQgPSBcImdyZWVuXCI7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gcGFzdCBkYXlzXHJcblx0XHRcdGVsc2UgaWYgKHRhYmxpY2FbaV0udGltZSA+IHRvZGF5KXtcclxuXHRcdFx0XHRsaS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ5ZWxsb3dcIjtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBmdXR1cmUgZGF5c1xyXG5cdFx0XHRlbHNlIGlmICh0YWJsaWNhW2ldLnRpbWUgPCB0b2RheSl7XHJcblx0XHRcdFx0bGkuc3R5bGUuYmFja2dyb3VuZCA9IFwicmVkXCI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNwYW4uaW5uZXJIVE1MID0gdGFibGljYVtpXS5jb250ZW50ICsgXCIuIERvIGtpZWR5OiBcIiArIHRhYmxpY2FbaV0udGltZTtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJkb2RhbGVtXCIgKyB0YWJsaWNhW2ldLmlkICsgdGFibGljYVtpXS5jb250ZW50ICsgdGFibGljYVtpXS50aW1lICsgdGFibGljYVtpXS5yZW0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBhZGRFbCgpIHtcclxuXHRhZGRUYXNrKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZSgpIHtcclxuXHR0YWJsaWNhW3RoaXMuaWRdLnJlbSA9ICF0YWJsaWNhW3RoaXMuaWRdLnJlbVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1FbCgpIHtcclxuXHRkZWxldGVUYXNrKCk7XHJcbn1cclxuXHJcblxyXG52YXIgYnV0dG9uQWRkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJBRERLVVJXQVwiKTtcclxuYnV0dG9uQWRkLmFkZEV2ZW50TGlzdGVuZXIoIFwiY2xpY2tcIiwgYWRkRWwgKTtcclxuXHJcbnZhciBidXR0b25BZGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlJFTUtVUldBXCIpO1xyXG5idXR0b25BZGQuYWRkRXZlbnRMaXN0ZW5lciggXCJjbGlja1wiLCByZW1FbCApO1xyXG5cclxuXHJcbiIsIi8qKlxuICogQHByZXNlcnZlIGpxdWVyeS1wYXJhbSAoYykgMjAxNSBLTk9XTEVER0VDT0RFIHwgTUlUXG4gKi9cbi8qZ2xvYmFsIGRlZmluZSAqL1xuKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgcGFyYW0gPSBmdW5jdGlvbiAoYSkge1xuICAgICAgICB2YXIgYWRkID0gZnVuY3Rpb24gKHMsIGssIHYpIHtcbiAgICAgICAgICAgIHYgPSB0eXBlb2YgdiA9PT0gJ2Z1bmN0aW9uJyA/IHYoKSA6IHYgPT09IG51bGwgPyAnJyA6IHYgPT09IHVuZGVmaW5lZCA/ICcnIDogdjtcbiAgICAgICAgICAgIHNbcy5sZW5ndGhdID0gZW5jb2RlVVJJQ29tcG9uZW50KGspICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHYpO1xuICAgICAgICB9LCBidWlsZFBhcmFtcyA9IGZ1bmN0aW9uIChwcmVmaXgsIG9iaiwgcykge1xuICAgICAgICAgICAgdmFyIGksIGxlbiwga2V5O1xuXG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBvYmoubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQYXJhbXMocHJlZml4ICsgJ1snICsgKHR5cGVvZiBvYmpbaV0gPT09ICdvYmplY3QnID8gaSA6ICcnKSArICddJywgb2JqW2ldLCBzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iaiAmJiBvYmoudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJlZml4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRQYXJhbXMocHJlZml4ICsgJ1snICsga2V5ICsgJ10nLCBvYmpba2V5XSwgcywgYWRkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRQYXJhbXMoa2V5LCBvYmpba2V5XSwgcywgYWRkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJlZml4KSB7XG4gICAgICAgICAgICAgICAgYWRkKHMsIHByZWZpeCwgb2JqKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZChzLCBrZXksIG9ialtrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGJ1aWxkUGFyYW1zKCcnLCBhLCBbXSkuam9pbignJicpLnJlcGxhY2UoLyUyMC9nLCAnKycpO1xuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHBhcmFtO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmFtO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBnbG9iYWwucGFyYW0gPSBwYXJhbTtcbiAgICB9XG5cbn0odGhpcykpO1xuIiwiLypcbiAqIFBpbmt5U3dlYXIuanMgMi4yLjIgLSBNaW5pbWFsaXN0aWMgaW1wbGVtZW50YXRpb24gb2YgdGhlIFByb21pc2VzL0ErIHNwZWNcbiAqIFxuICogUHVibGljIERvbWFpbi4gVXNlLCBtb2RpZnkgYW5kIGRpc3RyaWJ1dGUgaXQgYW55IHdheSB5b3UgbGlrZS4gTm8gYXR0cmlidXRpb24gcmVxdWlyZWQuXG4gKlxuICogTk8gV0FSUkFOVFkgRVhQUkVTU0VEIE9SIElNUExJRUQuIFVTRSBBVCBZT1VSIE9XTiBSSVNLLlxuICpcbiAqIFBpbmt5U3dlYXIgaXMgYSB2ZXJ5IHNtYWxsIGltcGxlbWVudGF0aW9uIG9mIHRoZSBQcm9taXNlcy9BKyBzcGVjaWZpY2F0aW9uLiBBZnRlciBjb21waWxhdGlvbiB3aXRoIHRoZVxuICogR29vZ2xlIENsb3N1cmUgQ29tcGlsZXIgYW5kIGd6aXBwaW5nIGl0IHdlaWdocyBsZXNzIHRoYW4gNTAwIGJ5dGVzLiBJdCBpcyBiYXNlZCBvbiB0aGUgaW1wbGVtZW50YXRpb24gZm9yIFxuICogTWluaWZpZWQuanMgYW5kIHNob3VsZCBiZSBwZXJmZWN0IGZvciBlbWJlZGRpbmcuIFxuICpcbiAqXG4gKiBQaW5reVN3ZWFyIGhhcyBqdXN0IHRocmVlIGZ1bmN0aW9ucy5cbiAqXG4gKiBUbyBjcmVhdGUgYSBuZXcgcHJvbWlzZSBpbiBwZW5kaW5nIHN0YXRlLCBjYWxsIHBpbmt5U3dlYXIoKTpcbiAqICAgICAgICAgdmFyIHByb21pc2UgPSBwaW5reVN3ZWFyKCk7XG4gKlxuICogVGhlIHJldHVybmVkIG9iamVjdCBoYXMgYSBQcm9taXNlcy9BKyBjb21wYXRpYmxlIHRoZW4oKSBpbXBsZW1lbnRhdGlvbjpcbiAqICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSkgeyBhbGVydChcIlN1Y2Nlc3MhXCIpOyB9LCBmdW5jdGlvbih2YWx1ZSkgeyBhbGVydChcIkZhaWx1cmUhXCIpOyB9KTtcbiAqXG4gKlxuICogVGhlIHByb21pc2UgcmV0dXJuZWQgYnkgcGlua3lTd2VhcigpIGlzIGEgZnVuY3Rpb24uIFRvIGZ1bGZpbGwgdGhlIHByb21pc2UsIGNhbGwgdGhlIGZ1bmN0aW9uIHdpdGggdHJ1ZSBhcyBmaXJzdCBhcmd1bWVudCBhbmRcbiAqIGFuIG9wdGlvbmFsIGFycmF5IG9mIHZhbHVlcyB0byBwYXNzIHRvIHRoZSB0aGVuKCkgaGFuZGxlci4gQnkgcHV0dGluZyBtb3JlIHRoYW4gb25lIHZhbHVlIGluIHRoZSBhcnJheSwgeW91IGNhbiBwYXNzIG1vcmUgdGhhbiBvbmVcbiAqIHZhbHVlIHRvIHRoZSB0aGVuKCkgaGFuZGxlcnMuIEhlcmUgYW4gZXhhbXBsZSB0byBmdWxmaWxsIGEgcHJvbXNpc2UsIHRoaXMgdGltZSB3aXRoIG9ubHkgb25lIGFyZ3VtZW50OiBcbiAqICAgICAgICAgcHJvbWlzZSh0cnVlLCBbNDJdKTtcbiAqXG4gKiBXaGVuIHRoZSBwcm9taXNlIGhhcyBiZWVuIHJlamVjdGVkLCBjYWxsIGl0IHdpdGggZmFsc2UuIEFnYWluLCB0aGVyZSBtYXkgYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCBmb3IgdGhlIHRoZW4oKSBoYW5kbGVyOlxuICogICAgICAgICBwcm9taXNlKHRydWUsIFs2LCA2LCA2XSk7XG4gKiAgICAgICAgIFxuICogWW91IGNhbiBvYnRhaW4gdGhlIHByb21pc2UncyBjdXJyZW50IHN0YXRlIGJ5IGNhbGxpbmcgdGhlIGZ1bmN0aW9uIHdpdGhvdXQgYXJndW1lbnRzLiBJdCB3aWxsIGJlIHRydWUgaWYgZnVsZmlsbGVkLFxuICogZmFsc2UgaWYgcmVqZWN0ZWQsIGFuZCBvdGhlcndpc2UgdW5kZWZpbmVkLlxuICogXHRcdCAgIHZhciBzdGF0ZSA9IHByb21pc2UoKTsgXG4gKiBcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90aW1qYW5zZW4vUGlua3lTd2Vhci5qc1xuICovXG4oZnVuY3Rpb24odGFyZ2V0KSB7XG5cdHZhciB1bmRlZjtcblxuXHRmdW5jdGlvbiBpc0Z1bmN0aW9uKGYpIHtcblx0XHRyZXR1cm4gdHlwZW9mIGYgPT0gJ2Z1bmN0aW9uJztcblx0fVxuXHRmdW5jdGlvbiBpc09iamVjdChmKSB7XG5cdFx0cmV0dXJuIHR5cGVvZiBmID09ICdvYmplY3QnO1xuXHR9XG5cdGZ1bmN0aW9uIGRlZmVyKGNhbGxiYWNrKSB7XG5cdFx0aWYgKHR5cGVvZiBzZXRJbW1lZGlhdGUgIT0gJ3VuZGVmaW5lZCcpXG5cdFx0XHRzZXRJbW1lZGlhdGUoY2FsbGJhY2spO1xuXHRcdGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9ICd1bmRlZmluZWQnICYmIHByb2Nlc3NbJ25leHRUaWNrJ10pXG5cdFx0XHRwcm9jZXNzWyduZXh0VGljayddKGNhbGxiYWNrKTtcblx0XHRlbHNlXG5cdFx0XHRzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKTtcblx0fVxuXG5cdHRhcmdldFswXVt0YXJnZXRbMV1dID0gZnVuY3Rpb24gcGlua3lTd2VhcihleHRlbmQpIHtcblx0XHR2YXIgc3RhdGU7ICAgICAgICAgICAvLyB1bmRlZmluZWQvbnVsbCA9IHBlbmRpbmcsIHRydWUgPSBmdWxmaWxsZWQsIGZhbHNlID0gcmVqZWN0ZWRcblx0XHR2YXIgdmFsdWVzID0gW107ICAgICAvLyBhbiBhcnJheSBvZiB2YWx1ZXMgYXMgYXJndW1lbnRzIGZvciB0aGUgdGhlbigpIGhhbmRsZXJzXG5cdFx0dmFyIGRlZmVycmVkID0gW107ICAgLy8gZnVuY3Rpb25zIHRvIGNhbGwgd2hlbiBzZXQoKSBpcyBpbnZva2VkXG5cblx0XHR2YXIgc2V0ID0gZnVuY3Rpb24obmV3U3RhdGUsIG5ld1ZhbHVlcykge1xuXHRcdFx0aWYgKHN0YXRlID09IG51bGwgJiYgbmV3U3RhdGUgIT0gbnVsbCkge1xuXHRcdFx0XHRzdGF0ZSA9IG5ld1N0YXRlO1xuXHRcdFx0XHR2YWx1ZXMgPSBuZXdWYWx1ZXM7XG5cdFx0XHRcdGlmIChkZWZlcnJlZC5sZW5ndGgpXG5cdFx0XHRcdFx0ZGVmZXIoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKVxuXHRcdFx0XHRcdFx0XHRkZWZlcnJlZFtpXSgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH07XG5cblx0XHRzZXRbJ3RoZW4nXSA9IGZ1bmN0aW9uIChvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuXHRcdFx0dmFyIHByb21pc2UyID0gcGlua3lTd2VhcihleHRlbmQpO1xuXHRcdFx0dmFyIGNhbGxDYWxsYmFja3MgPSBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHR0cnkge1xuXHQgICAgXHRcdFx0dmFyIGYgPSAoc3RhdGUgPyBvbkZ1bGZpbGxlZCA6IG9uUmVqZWN0ZWQpO1xuXHQgICAgXHRcdFx0aWYgKGlzRnVuY3Rpb24oZikpIHtcblx0XHQgICBcdFx0XHRcdGZ1bmN0aW9uIHJlc29sdmUoeCkge1xuXHRcdFx0XHRcdFx0ICAgIHZhciB0aGVuLCBjYkNhbGxlZCA9IDA7XG5cdFx0ICAgXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdCAgIFx0XHRcdFx0aWYgKHggJiYgKGlzT2JqZWN0KHgpIHx8IGlzRnVuY3Rpb24oeCkpICYmIGlzRnVuY3Rpb24odGhlbiA9IHhbJ3RoZW4nXSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHggPT09IHByb21pc2UyKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhlblsnY2FsbCddKHgsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSB7IGlmICghY2JDYWxsZWQrKykgcmVzb2x2ZS5hcHBseSh1bmRlZixhcmd1bWVudHMpOyB9ICxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbih2YWx1ZSl7IGlmICghY2JDYWxsZWQrKykgcHJvbWlzZTIoZmFsc2UsW3ZhbHVlXSk7fSk7XG5cdFx0XHRcdCAgIFx0XHRcdFx0fVxuXHRcdFx0XHQgICBcdFx0XHRcdGVsc2Vcblx0XHRcdFx0ICAgXHRcdFx0XHRcdHByb21pc2UyKHRydWUsIGFyZ3VtZW50cyk7XG5cdFx0ICAgXHRcdFx0XHRcdH1cblx0XHQgICBcdFx0XHRcdFx0Y2F0Y2goZSkge1xuXHRcdCAgIFx0XHRcdFx0XHRcdGlmICghY2JDYWxsZWQrKylcblx0XHQgICBcdFx0XHRcdFx0XHRcdHByb21pc2UyKGZhbHNlLCBbZV0pO1xuXHRcdCAgIFx0XHRcdFx0XHR9XG5cdFx0ICAgXHRcdFx0XHR9XG5cdFx0ICAgXHRcdFx0XHRyZXNvbHZlKGYuYXBwbHkodW5kZWYsIHZhbHVlcyB8fCBbXSkpO1xuXHRcdCAgIFx0XHRcdH1cblx0XHQgICBcdFx0XHRlbHNlXG5cdFx0ICAgXHRcdFx0XHRwcm9taXNlMihzdGF0ZSwgdmFsdWVzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaCAoZSkge1xuXHRcdFx0XHRcdHByb21pc2UyKGZhbHNlLCBbZV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0aWYgKHN0YXRlICE9IG51bGwpXG5cdFx0XHRcdGRlZmVyKGNhbGxDYWxsYmFja3MpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRkZWZlcnJlZC5wdXNoKGNhbGxDYWxsYmFja3MpO1xuXHRcdFx0cmV0dXJuIHByb21pc2UyO1xuXHRcdH07XG4gICAgICAgIGlmKGV4dGVuZCl7XG4gICAgICAgICAgICBzZXQgPSBleHRlbmQoc2V0KTtcbiAgICAgICAgfVxuXHRcdHJldHVybiBzZXQ7XG5cdH07XG59KSh0eXBlb2YgbW9kdWxlID09ICd1bmRlZmluZWQnID8gW3dpbmRvdywgJ3Bpbmt5U3dlYXInXSA6IFttb2R1bGUsICdleHBvcnRzJ10pO1xuXG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLyohIHF3ZXN0IDQuNC41IChodHRwczovL2dpdGh1Yi5jb20vcHlyc21rL3F3ZXN0KSAqL1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0dmFyIGdsb2JhbCA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBzZWxmLFxyXG5cdFx0cGlua3lzd2VhciA9IHJlcXVpcmUoJ3Bpbmt5c3dlYXInKSxcclxuXHRcdGpwYXJhbSA9IHJlcXVpcmUoJ2pxdWVyeS1wYXJhbScpLFxyXG5cdFx0ZGVmYXVsdE9wdGlvbnMgPSB7fSxcclxuXHRcdC8vIERlZmF1bHQgcmVzcG9uc2UgdHlwZSBmb3IgWERSIGluIGF1dG8gbW9kZVxyXG5cdFx0ZGVmYXVsdFhkclJlc3BvbnNlVHlwZSA9ICdqc29uJyxcclxuXHRcdC8vIERlZmF1bHQgZGF0YSB0eXBlXHJcblx0XHRkZWZhdWx0RGF0YVR5cGUgPSAncG9zdCcsXHJcblx0XHQvLyBWYXJpYWJsZXMgZm9yIGxpbWl0IG1lY2hhbmlzbVxyXG5cdFx0bGltaXQgPSBudWxsLFxyXG5cdFx0cmVxdWVzdHMgPSAwLFxyXG5cdFx0cmVxdWVzdF9zdGFjayA9IFtdLFxyXG5cdFx0Ly8gR2V0IFhNTEh0dHBSZXF1ZXN0IG9iamVjdFxyXG5cdFx0Z2V0WEhSID0gZ2xvYmFsLlhNTEh0dHBSZXF1ZXN0PyBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gbmV3IGdsb2JhbC5YTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0fTogZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpO1xyXG5cdFx0fSxcclxuXHRcdC8vIEd1ZXNzIFhIUiB2ZXJzaW9uXHJcblx0XHR4aHIyID0gKGdldFhIUigpLnJlc3BvbnNlVHlwZT09PScnKSxcclxuXHJcblx0Ly8gQ29yZSBmdW5jdGlvblxyXG5cdHF3ZXN0ID0gZnVuY3Rpb24obWV0aG9kLCB1cmwsIGRhdGEsIG9wdGlvbnMsIGJlZm9yZSkge1xyXG5cdFx0Ly8gRm9ybWF0XHJcblx0XHRtZXRob2QgPSBtZXRob2QudG9VcHBlckNhc2UoKTtcclxuXHRcdGRhdGEgPSBkYXRhIHx8IG51bGw7XHJcblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHRcdGZvcih2YXIgbmFtZSBpbiBkZWZhdWx0T3B0aW9ucykge1xyXG5cdFx0XHRpZighKG5hbWUgaW4gb3B0aW9ucykpIHtcclxuXHRcdFx0XHRpZih0eXBlb2YgZGVmYXVsdE9wdGlvbnNbbmFtZV0gPT0gJ29iamVjdCcgJiYgdHlwZW9mIG9wdGlvbnNbbmFtZV0gPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHRcdGZvcih2YXIgbmFtZTIgaW4gZGVmYXVsdE9wdGlvbnNbbmFtZV0pIHtcclxuXHRcdFx0XHRcdFx0b3B0aW9uc1tuYW1lXVtuYW1lMl0gPSBkZWZhdWx0T3B0aW9uc1tuYW1lXVtuYW1lMl07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0b3B0aW9uc1tuYW1lXSA9IGRlZmF1bHRPcHRpb25zW25hbWVdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIERlZmluZSB2YXJpYWJsZXNcclxuXHRcdHZhciBuYXRpdmVSZXNwb25zZVBhcnNpbmcgPSBmYWxzZSxcclxuXHRcdFx0Y3Jvc3NPcmlnaW4sXHJcblx0XHRcdHhocixcclxuXHRcdFx0eGRyID0gZmFsc2UsXHJcblx0XHRcdHRpbWVvdXQsXHJcblx0XHRcdGFib3J0ZWQgPSBmYWxzZSxcclxuXHRcdFx0YXR0ZW1wdHMgPSAwLFxyXG5cdFx0XHRoZWFkZXJzID0ge30sXHJcblx0XHRcdG1pbWVUeXBlcyA9IHtcclxuXHRcdFx0XHR0ZXh0OiAnKi8qJyxcclxuXHRcdFx0XHR4bWw6ICd0ZXh0L3htbCcsXHJcblx0XHRcdFx0anNvbjogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG5cdFx0XHRcdHBvc3Q6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxyXG5cdFx0XHRcdGRvY3VtZW50OiAndGV4dC9odG1sJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRhY2NlcHQgPSB7XHJcblx0XHRcdFx0dGV4dDogJyovKicsXHJcblx0XHRcdFx0eG1sOiAnYXBwbGljYXRpb24veG1sOyBxPTEuMCwgdGV4dC94bWw7IHE9MC44LCAqLyo7IHE9MC4xJyxcclxuXHRcdFx0XHRqc29uOiAnYXBwbGljYXRpb24vanNvbjsgcT0xLjAsIHRleHQvKjsgcT0wLjgsICovKjsgcT0wLjEnXHJcblx0XHRcdH0sXHJcblx0XHRcdGksIGosXHJcblx0XHRcdHJlc3BvbnNlLFxyXG5cdFx0XHRzZW5kaW5nID0gZmFsc2UsXHJcblxyXG5cdFx0Ly8gQ3JlYXRlIHRoZSBwcm9taXNlXHJcblx0XHRwcm9taXNlID0gcGlua3lzd2VhcihmdW5jdGlvbihwaW5reSkge1xyXG5cdFx0XHRwaW5reS5hYm9ydCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmKCFhYm9ydGVkKSB7XHJcblx0XHRcdFx0XHRpZih4aHIgJiYgeGhyLnJlYWR5U3RhdGUgIT0gNCkgeyAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy83Mjg3NzA2L2llLTktamF2YXNjcmlwdC1lcnJvci1jMDBjMDIzZlxyXG5cdFx0XHRcdFx0XHR4aHIuYWJvcnQoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmKHNlbmRpbmcpIHtcclxuXHRcdFx0XHRcdFx0LS1yZXF1ZXN0cztcclxuXHRcdFx0XHRcdFx0c2VuZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YWJvcnRlZCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cdFx0XHRwaW5reS5zZW5kID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Ly8gUHJldmVudCBmdXJ0aGVyIHNlbmQoKSBjYWxsc1xyXG5cdFx0XHRcdGlmKHNlbmRpbmcpIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gUmVhY2hlZCByZXF1ZXN0IGxpbWl0LCBnZXQgb3V0IVxyXG5cdFx0XHRcdGlmKHJlcXVlc3RzID09IGxpbWl0KSB7XHJcblx0XHRcdFx0XHRyZXF1ZXN0X3N0YWNrLnB1c2gocGlua3kpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBWZXJpZnkgaWYgdGhlIHJlcXVlc3QgaGFzIG5vdCBiZWVuIHByZXZpb3VzbHkgYWJvcnRlZFxyXG5cdFx0XHRcdGlmKGFib3J0ZWQpIHtcclxuXHRcdFx0XHRcdGlmKHJlcXVlc3Rfc3RhY2subGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdHJlcXVlc3Rfc3RhY2suc2hpZnQoKS5zZW5kKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIFRoZSBzZW5kaW5nIGlzIHJ1bm5pbmdcclxuXHRcdFx0XHQrK3JlcXVlc3RzO1xyXG5cdFx0XHRcdHNlbmRpbmcgPSB0cnVlO1xyXG5cdFx0XHRcdC8vIEdldCBYSFIgb2JqZWN0XHJcblx0XHRcdFx0eGhyID0gZ2V0WEhSKCk7XHJcblx0XHRcdFx0aWYoY3Jvc3NPcmlnaW4pIHtcclxuXHRcdFx0XHRcdGlmKCEoJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKSAmJiBnbG9iYWwuWERvbWFpblJlcXVlc3QpIHtcclxuXHRcdFx0XHRcdFx0eGhyID0gbmV3IFhEb21haW5SZXF1ZXN0KCk7IC8vIENPUlMgd2l0aCBJRTgvOVxyXG5cdFx0XHRcdFx0XHR4ZHIgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRpZihtZXRob2QgIT0gJ0dFVCcgJiYgbWV0aG9kICE9ICdQT1NUJykge1xyXG5cdFx0XHRcdFx0XHRcdG1ldGhvZCA9ICdQT1NUJztcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBPcGVuIGNvbm5lY3Rpb25cclxuXHRcdFx0XHRpZih4ZHIpIHtcclxuXHRcdFx0XHRcdHhoci5vcGVuKG1ldGhvZCwgdXJsKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHR4aHIub3BlbihtZXRob2QsIHVybCwgb3B0aW9ucy5hc3luYywgb3B0aW9ucy51c2VyLCBvcHRpb25zLnBhc3N3b3JkKTtcclxuXHRcdFx0XHRcdGlmKHhocjIgJiYgb3B0aW9ucy5hc3luYykge1xyXG5cdFx0XHRcdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gb3B0aW9ucy53aXRoQ3JlZGVudGlhbHM7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIFNldCBoZWFkZXJzXHJcblx0XHRcdFx0aWYoIXhkcikge1xyXG5cdFx0XHRcdFx0Zm9yKHZhciBpIGluIGhlYWRlcnMpIHtcclxuXHRcdFx0XHRcdFx0aWYoaGVhZGVyc1tpXSkge1xyXG5cdFx0XHRcdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKGksIGhlYWRlcnNbaV0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIFZlcmlmeSBpZiB0aGUgcmVzcG9uc2UgdHlwZSBpcyBzdXBwb3J0ZWQgYnkgdGhlIGN1cnJlbnQgYnJvd3NlclxyXG5cdFx0XHRcdGlmKHhocjIgJiYgb3B0aW9ucy5yZXNwb25zZVR5cGUgIT0gJ2F1dG8nKSB7XHJcblx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5yZXNwb25zZVR5cGU7XHJcblx0XHRcdFx0XHRcdG5hdGl2ZVJlc3BvbnNlUGFyc2luZyA9ICh4aHIucmVzcG9uc2VUeXBlID09IG9wdGlvbnMucmVzcG9uc2VUeXBlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNhdGNoKGUpIHt9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIFBsdWcgcmVzcG9uc2UgaGFuZGxlclxyXG5cdFx0XHRcdGlmKHhocjIgfHwgeGRyKSB7XHJcblx0XHRcdFx0XHR4aHIub25sb2FkID0gaGFuZGxlUmVzcG9uc2U7XHJcblx0XHRcdFx0XHR4aHIub25lcnJvciA9IGhhbmRsZUVycm9yO1xyXG5cdFx0XHRcdFx0Ly8gaHR0cDovL2N5cHJlc3Nub3J0aC5jb20vcHJvZ3JhbW1pbmcvaW50ZXJuZXQtZXhwbG9yZXItYWJvcnRpbmctYWpheC1yZXF1ZXN0cy1maXhlZC9cclxuXHRcdFx0XHRcdGlmKHhkcikge1xyXG5cdFx0XHRcdFx0XHR4aHIub25wcm9ncmVzcyA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRpZih4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XHJcblx0XHRcdFx0XHRcdFx0aGFuZGxlUmVzcG9uc2UoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gUGx1ZyB0aW1lb3V0XHJcblx0XHRcdFx0aWYob3B0aW9ucy5hc3luYykge1xyXG5cdFx0XHRcdFx0aWYoJ3RpbWVvdXQnIGluIHhocikge1xyXG5cdFx0XHRcdFx0XHR4aHIudGltZW91dCA9IG9wdGlvbnMudGltZW91dDtcclxuXHRcdFx0XHRcdFx0eGhyLm9udGltZW91dCA9IGhhbmRsZVRpbWVvdXQ7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQoaGFuZGxlVGltZW91dCwgb3B0aW9ucy50aW1lb3V0KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gaHR0cDovL2N5cHJlc3Nub3J0aC5jb20vcHJvZ3JhbW1pbmcvaW50ZXJuZXQtZXhwbG9yZXItYWJvcnRpbmctYWpheC1yZXF1ZXN0cy1maXhlZC9cclxuXHRcdFx0XHRlbHNlIGlmKHhkcikge1xyXG5cdFx0XHRcdFx0eGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIE92ZXJyaWRlIG1pbWUgdHlwZSB0byBlbnN1cmUgdGhlIHJlc3BvbnNlIGlzIHdlbGwgcGFyc2VkXHJcblx0XHRcdFx0aWYob3B0aW9ucy5yZXNwb25zZVR5cGUgIT0gJ2F1dG8nICYmICdvdmVycmlkZU1pbWVUeXBlJyBpbiB4aHIpIHtcclxuXHRcdFx0XHRcdHhoci5vdmVycmlkZU1pbWVUeXBlKG1pbWVUeXBlc1tvcHRpb25zLnJlc3BvbnNlVHlwZV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBSdW4gJ2JlZm9yZScgY2FsbGJhY2tcclxuXHRcdFx0XHRpZihiZWZvcmUpIHtcclxuXHRcdFx0XHRcdGJlZm9yZSh4aHIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBTZW5kIHJlcXVlc3RcclxuXHRcdFx0XHRpZih4ZHIpIHtcclxuXHRcdFx0XHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9YRG9tYWluUmVxdWVzdFxyXG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0eGhyLnNlbmQobWV0aG9kICE9ICdHRVQnPyBkYXRhIDogbnVsbCk7XHJcblx0XHRcdFx0XHR9LCAwKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHR4aHIuc2VuZChtZXRob2QgIT0gJ0dFVCcgPyBkYXRhIDogbnVsbCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cdFx0XHRyZXR1cm4gcGlua3k7XHJcblx0XHR9KSxcclxuXHJcblx0XHQvLyBIYW5kbGUgdGhlIHJlc3BvbnNlXHJcblx0XHRoYW5kbGVSZXNwb25zZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgaSwgcmVzcG9uc2VUeXBlO1xyXG5cdFx0XHQvLyBTdG9wIHNlbmRpbmcgc3RhdGVcclxuXHRcdFx0c2VuZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XHJcblx0XHRcdC8vIExhdW5jaCBuZXh0IHN0YWNrZWQgcmVxdWVzdFxyXG5cdFx0XHRpZihyZXF1ZXN0X3N0YWNrLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJlcXVlc3Rfc3RhY2suc2hpZnQoKS5zZW5kKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gVmVyaWZ5IGlmIHRoZSByZXF1ZXN0IGhhcyBub3QgYmVlbiBwcmV2aW91c2x5IGFib3J0ZWRcclxuXHRcdFx0aWYoYWJvcnRlZCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBEZWNyZWFzZSB0aGUgbnVtYmVyIG9mIHJlcXVlc3RzXHJcblx0XHRcdC0tcmVxdWVzdHM7XHJcblx0XHRcdC8vIEhhbmRsZSByZXNwb25zZVxyXG5cdFx0XHR0cnl7XHJcblx0XHRcdFx0Ly8gUHJvY2VzcyByZXNwb25zZVxyXG5cdFx0XHRcdGlmKG5hdGl2ZVJlc3BvbnNlUGFyc2luZykge1xyXG5cdFx0XHRcdFx0aWYoJ3Jlc3BvbnNlJyBpbiB4aHIgJiYgeGhyLnJlc3BvbnNlID09PSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdHRocm93ICdUaGUgcmVxdWVzdCByZXNwb25zZSBpcyBlbXB0eSc7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXNwb25zZSA9IHhoci5yZXNwb25zZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBHdWVzcyByZXNwb25zZSB0eXBlXHJcblx0XHRcdFx0XHRyZXNwb25zZVR5cGUgPSBvcHRpb25zLnJlc3BvbnNlVHlwZTtcclxuXHRcdFx0XHRcdGlmKHJlc3BvbnNlVHlwZSA9PSAnYXV0bycpIHtcclxuXHRcdFx0XHRcdFx0aWYoeGRyKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2VUeXBlID0gZGVmYXVsdFhkclJlc3BvbnNlVHlwZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgY3QgPSB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpIHx8ICcnO1xyXG5cdFx0XHRcdFx0XHRcdGlmKGN0LmluZGV4T2YobWltZVR5cGVzLmpzb24pPi0xKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZVR5cGUgPSAnanNvbic7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGVsc2UgaWYoY3QuaW5kZXhPZihtaW1lVHlwZXMueG1sKSA+IC0xKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZVR5cGUgPSAneG1sJztcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZVR5cGUgPSAndGV4dCc7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvLyBIYW5kbGUgcmVzcG9uc2UgdHlwZVxyXG5cdFx0XHRcdFx0c3dpdGNoKHJlc3BvbnNlVHlwZSkge1xyXG5cdFx0XHRcdFx0XHRjYXNlICdqc29uJzpcclxuXHRcdFx0XHRcdFx0XHRpZih4aHIucmVzcG9uc2VUZXh0Lmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYoJ0pTT04nIGluIGdsb2JhbCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IG5ldyBGdW5jdGlvbigncmV0dXJuICgnICsgeGhyLnJlc3BvbnNlVGV4dCArICcpJykoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0Y2F0Y2goZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aHJvdyBcIkVycm9yIHdoaWxlIHBhcnNpbmcgSlNPTiBib2R5IDogXCIrZTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3htbCc6XHJcblx0XHRcdFx0XHRcdFx0Ly8gQmFzZWQgb24galF1ZXJ5J3MgcGFyc2VYTUwoKSBmdW5jdGlvblxyXG5cdFx0XHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBTdGFuZGFyZFxyXG5cdFx0XHRcdFx0XHRcdFx0aWYoZ2xvYmFsLkRPTVBhcnNlcikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IChuZXcgRE9NUGFyc2VyKCkpLnBhcnNlRnJvbVN0cmluZyh4aHIucmVzcG9uc2VUZXh0LCd0ZXh0L3htbCcpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gSUU8OVxyXG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxET00nKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UuYXN5bmMgPSAnZmFsc2UnO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZS5sb2FkWE1MKHhoci5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRjYXRjaChlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IHVuZGVmaW5lZDtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0aWYoIXJlc3BvbnNlIHx8ICFyZXNwb25zZS5kb2N1bWVudEVsZW1lbnQgfHwgcmVzcG9uc2UuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3BhcnNlcmVycm9yJykubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR0aHJvdyAnSW52YWxpZCBYTUwnO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IHhoci5yZXNwb25zZVRleHQ7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIExhdGUgc3RhdHVzIGNvZGUgdmVyaWZpY2F0aW9uIHRvIGFsbG93IHBhc3NpbmcgZGF0YSB3aGVuLCBwZXIgZXhhbXBsZSwgYSA0MDkgaXMgcmV0dXJuZWRcclxuXHRcdFx0XHQvLyAtLS0gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTAwNDY5NzIvbXNpZS1yZXR1cm5zLXN0YXR1cy1jb2RlLW9mLTEyMjMtZm9yLWFqYXgtcmVxdWVzdFxyXG5cdFx0XHRcdGlmKCdzdGF0dXMnIGluIHhociAmJiAhL14yfDEyMjMvLnRlc3QoeGhyLnN0YXR1cykpIHtcclxuXHRcdFx0XHRcdHRocm93IHhoci5zdGF0dXMgKyAnICgnICsgeGhyLnN0YXR1c1RleHQgKyAnKSc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIEZ1bGZpbGxlZFxyXG5cdFx0XHRcdHByb21pc2UodHJ1ZSwgW3hociwgcmVzcG9uc2VdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaChlKSB7XHJcblx0XHRcdFx0Ly8gUmVqZWN0ZWRcclxuXHRcdFx0XHRwcm9taXNlKGZhbHNlLCBbZSwgeGhyLCByZXNwb25zZV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIEhhbmRsZSBlcnJvcnNcclxuXHRcdGhhbmRsZUVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xyXG5cdFx0XHRpZighYWJvcnRlZCkge1xyXG5cdFx0XHRcdG1lc3NhZ2UgPSB0eXBlb2YgbWVzc2FnZSA9PSAnc3RyaW5nJyA/IG1lc3NhZ2UgOiAnQ29ubmVjdGlvbiBhYm9ydGVkJztcclxuXHRcdFx0XHRwcm9taXNlLmFib3J0KCk7XHJcblx0XHRcdFx0cHJvbWlzZShmYWxzZSwgW25ldyBFcnJvcihtZXNzYWdlKSwgeGhyLCBudWxsXSk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRcdFxyXG5cdFx0Ly8gSGFuZGxlIHRpbWVvdXRzXHJcblx0XHRoYW5kbGVUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmKCFhYm9ydGVkKSB7XHJcblx0XHRcdFx0aWYoIW9wdGlvbnMuYXR0ZW1wdHMgfHwgKythdHRlbXB0cyAhPSBvcHRpb25zLmF0dGVtcHRzKSB7XHJcblx0XHRcdFx0XHR4aHIuYWJvcnQoKTtcclxuXHRcdFx0XHRcdHNlbmRpbmcgPSBmYWxzZTtcclxuXHRcdFx0XHRcdHByb21pc2Uuc2VuZCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdGhhbmRsZUVycm9yKCdUaW1lb3V0ICgnICsgdXJsICsgJyknKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gTm9ybWFsaXplIG9wdGlvbnNcclxuXHRcdG9wdGlvbnMuYXN5bmMgPSAnYXN5bmMnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMuYXN5bmMgOiB0cnVlO1xyXG5cdFx0b3B0aW9ucy5jYWNoZSA9ICdjYWNoZScgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy5jYWNoZSA6IGZhbHNlO1xyXG5cdFx0b3B0aW9ucy5kYXRhVHlwZSA9ICdkYXRhVHlwZScgaW4gb3B0aW9ucyA/IG9wdGlvbnMuZGF0YVR5cGUudG9Mb3dlckNhc2UoKSA6IGRlZmF1bHREYXRhVHlwZTtcclxuXHRcdG9wdGlvbnMucmVzcG9uc2VUeXBlID0gJ3Jlc3BvbnNlVHlwZScgaW4gb3B0aW9ucyA/IG9wdGlvbnMucmVzcG9uc2VUeXBlLnRvTG93ZXJDYXNlKCkgOiAnYXV0byc7XHJcblx0XHRvcHRpb25zLnVzZXIgPSBvcHRpb25zLnVzZXIgfHwgJyc7XHJcblx0XHRvcHRpb25zLnBhc3N3b3JkID0gb3B0aW9ucy5wYXNzd29yZCB8fCAnJztcclxuXHRcdG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gISFvcHRpb25zLndpdGhDcmVkZW50aWFscztcclxuXHRcdG9wdGlvbnMudGltZW91dCA9ICd0aW1lb3V0JyBpbiBvcHRpb25zID8gcGFyc2VJbnQob3B0aW9ucy50aW1lb3V0LCAxMCkgOiAzMDAwMDtcclxuXHRcdG9wdGlvbnMuYXR0ZW1wdHMgPSAnYXR0ZW1wdHMnIGluIG9wdGlvbnMgPyBwYXJzZUludChvcHRpb25zLmF0dGVtcHRzLCAxMCkgOiAxO1xyXG5cclxuXHRcdC8vIEd1ZXNzIGlmIHdlJ3JlIGRlYWxpbmcgd2l0aCBhIGNyb3NzLW9yaWdpbiByZXF1ZXN0XHJcblx0XHRpID0gdXJsLm1hdGNoKC9cXC9cXC8oLis/KVxcLy8pO1xyXG5cdFx0Y3Jvc3NPcmlnaW4gPSBpICYmIChpWzFdID8gaVsxXSAhPSBsb2NhdGlvbi5ob3N0IDogZmFsc2UpO1xyXG5cclxuXHRcdC8vIFByZXBhcmUgZGF0YVxyXG5cdFx0aWYoJ0FycmF5QnVmZmVyJyBpbiBnbG9iYWwgJiYgZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XHJcblx0XHRcdG9wdGlvbnMuZGF0YVR5cGUgPSAnYXJyYXlidWZmZXInO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZignQmxvYicgaW4gZ2xvYmFsICYmIGRhdGEgaW5zdGFuY2VvZiBCbG9iKSB7XHJcblx0XHRcdG9wdGlvbnMuZGF0YVR5cGUgPSAnYmxvYic7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKCdEb2N1bWVudCcgaW4gZ2xvYmFsICYmIGRhdGEgaW5zdGFuY2VvZiBEb2N1bWVudCkge1xyXG5cdFx0XHRvcHRpb25zLmRhdGFUeXBlID0gJ2RvY3VtZW50JztcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoJ0Zvcm1EYXRhJyBpbiBnbG9iYWwgJiYgZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhKSB7XHJcblx0XHRcdG9wdGlvbnMuZGF0YVR5cGUgPSAnZm9ybWRhdGEnO1xyXG5cdFx0fVxyXG5cdFx0aWYoZGF0YSAhPT0gbnVsbCkge1xyXG5cdFx0XHRzd2l0Y2gob3B0aW9ucy5kYXRhVHlwZSkge1xyXG5cdFx0XHRcdGNhc2UgJ2pzb24nOlxyXG5cdFx0XHRcdFx0ZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAncG9zdCc6XHJcblx0XHRcdFx0XHRkYXRhID0ganBhcmFtKGRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUHJlcGFyZSBoZWFkZXJzXHJcblx0XHRpZihvcHRpb25zLmhlYWRlcnMpIHtcclxuXHRcdFx0dmFyIGZvcm1hdCA9IGZ1bmN0aW9uKG1hdGNoLHAxLHAyKSB7XHJcblx0XHRcdFx0cmV0dXJuIHAxICsgcDIudG9VcHBlckNhc2UoKTtcclxuXHRcdFx0fTtcclxuXHRcdFx0Zm9yKGkgaW4gb3B0aW9ucy5oZWFkZXJzKSB7XHJcblx0XHRcdFx0aGVhZGVyc1tpLnJlcGxhY2UoLyhefC0pKFteLV0pL2csZm9ybWF0KV0gPSBvcHRpb25zLmhlYWRlcnNbaV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmKCEoJ0NvbnRlbnQtVHlwZScgaW4gaGVhZGVycykgJiYgbWV0aG9kIT0nR0VUJykge1xyXG5cdFx0XHRpZihvcHRpb25zLmRhdGFUeXBlIGluIG1pbWVUeXBlcykge1xyXG5cdFx0XHRcdGlmKG1pbWVUeXBlc1tvcHRpb25zLmRhdGFUeXBlXSkge1xyXG5cdFx0XHRcdFx0aGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSBtaW1lVHlwZXNbb3B0aW9ucy5kYXRhVHlwZV07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZighaGVhZGVycy5BY2NlcHQpIHtcclxuXHRcdFx0aGVhZGVycy5BY2NlcHQgPSAob3B0aW9ucy5yZXNwb25zZVR5cGUgaW4gYWNjZXB0KSA/IGFjY2VwdFtvcHRpb25zLnJlc3BvbnNlVHlwZV0gOiAnKi8qJztcclxuXHRcdH1cclxuXHRcdGlmKCFjcm9zc09yaWdpbiAmJiAhKCdYLVJlcXVlc3RlZC1XaXRoJyBpbiBoZWFkZXJzKSkgeyAvLyAodGhhdCBoZWFkZXIgYnJlYWtzIGluIGxlZ2FjeSBicm93c2VycyB3aXRoIENPUlMpXHJcblx0XHRcdGhlYWRlcnNbJ1gtUmVxdWVzdGVkLVdpdGgnXSA9ICdYTUxIdHRwUmVxdWVzdCc7XHJcblx0XHR9XHJcblx0XHRpZighb3B0aW9ucy5jYWNoZSAmJiAhKCdDYWNoZS1Db250cm9sJyBpbiBoZWFkZXJzKSkge1xyXG5cdFx0XHRoZWFkZXJzWydDYWNoZS1Db250cm9sJ10gPSAnbm8tY2FjaGUnO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFByZXBhcmUgVVJMXHJcblx0XHRpZihtZXRob2QgPT0gJ0dFVCcgJiYgZGF0YSAmJiB0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xyXG5cdFx0XHR1cmwgKz0gKC9cXD8vLnRlc3QodXJsKT8nJic6Jz8nKSArIGRhdGE7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU3RhcnQgdGhlIHJlcXVlc3RcclxuXHRcdGlmKG9wdGlvbnMuYXN5bmMpIHtcclxuXHRcdFx0cHJvbWlzZS5zZW5kKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmV0dXJuIHByb21pc2VcclxuXHRcdHJldHVybiBwcm9taXNlO1xyXG5cclxuXHR9O1xyXG5cdFxyXG5cdC8vIERlZmluZSBleHRlcm5hbCBxd2VzdCBvYmplY3RcclxuXHR2YXIgZ2V0TmV3UHJvbWlzZSA9IGZ1bmN0aW9uKHEpIHtcclxuXHRcdFx0Ly8gUHJlcGFyZVxyXG5cdFx0XHR2YXIgcHJvbWlzZXMgPSBbXSxcclxuXHRcdFx0XHRsb2FkaW5nID0gMCxcclxuXHRcdFx0XHR2YWx1ZXMgPSBbXTtcclxuXHRcdFx0Ly8gQ3JlYXRlIGEgbmV3IHByb21pc2UgdG8gaGFuZGxlIGFsbCByZXF1ZXN0c1xyXG5cdFx0XHRyZXR1cm4gcGlua3lzd2VhcihmdW5jdGlvbihwaW5reSkge1xyXG5cdFx0XHRcdC8vIEJhc2ljIHJlcXVlc3QgbWV0aG9kXHJcblx0XHRcdFx0dmFyIG1ldGhvZF9pbmRleCA9IC0xLFxyXG5cdFx0XHRcdFx0Y3JlYXRlTWV0aG9kID0gZnVuY3Rpb24obWV0aG9kKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmdW5jdGlvbih1cmwsIGRhdGEsIG9wdGlvbnMsIGJlZm9yZSkge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBpbmRleCA9ICsrbWV0aG9kX2luZGV4O1xyXG5cdFx0XHRcdFx0XHRcdCsrbG9hZGluZztcclxuXHRcdFx0XHRcdFx0XHRwcm9taXNlcy5wdXNoKHF3ZXN0KG1ldGhvZCwgcGlua3kuYmFzZSArIHVybCwgZGF0YSwgb3B0aW9ucywgYmVmb3JlKS50aGVuKGZ1bmN0aW9uKHhociwgcmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlc1tpbmRleF0gPSBhcmd1bWVudHM7XHJcblx0XHRcdFx0XHRcdFx0XHRpZighLS1sb2FkaW5nKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHBpbmt5KHRydWUsIHZhbHVlcy5sZW5ndGggPT0gMSA/IHZhbHVlc1swXSA6IFt2YWx1ZXNdKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9LCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHBpbmt5KGZhbHNlLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRcdFx0XHRcdH0pKTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcGlua3k7XHJcblx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdC8vIERlZmluZSBleHRlcm5hbCBBUElcclxuXHRcdFx0XHRwaW5reS5nZXQgPSBjcmVhdGVNZXRob2QoJ0dFVCcpO1xyXG5cdFx0XHRcdHBpbmt5LnBvc3QgPSBjcmVhdGVNZXRob2QoJ1BPU1QnKTtcclxuXHRcdFx0XHRwaW5reS5wdXQgPSBjcmVhdGVNZXRob2QoJ1BVVCcpO1xyXG5cdFx0XHRcdHBpbmt5WydkZWxldGUnXSA9IGNyZWF0ZU1ldGhvZCgnREVMRVRFJyk7XHJcblx0XHRcdFx0cGlua3lbJ2NhdGNoJ10gPSBmdW5jdGlvbihmKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gcGlua3kudGhlbihudWxsLCBmKTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHBpbmt5LmNvbXBsZXRlID0gZnVuY3Rpb24oZikge1xyXG5cdFx0XHRcdFx0dmFyIGZ1bmMgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0ZigpOyAvLyBvdGhlcndpc2UgYXJndW1lbnRzIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBjYWxsYmFja1xyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdHJldHVybiBwaW5reS50aGVuKGZ1bmMsIGZ1bmMpO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0cGlua3kubWFwID0gZnVuY3Rpb24odHlwZSwgdXJsLCBkYXRhLCBvcHRpb25zLCBiZWZvcmUpIHtcclxuXHRcdFx0XHRcdHJldHVybiBjcmVhdGVNZXRob2QodHlwZS50b1VwcGVyQ2FzZSgpKS5jYWxsKHRoaXMsIHVybCwgZGF0YSwgb3B0aW9ucywgYmVmb3JlKTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdC8vIFBvcHVsYXRlIG1ldGhvZHMgZnJvbSBleHRlcm5hbCBvYmplY3RcclxuXHRcdFx0XHRmb3IodmFyIHByb3AgaW4gcSkge1xyXG5cdFx0XHRcdFx0aWYoIShwcm9wIGluIHBpbmt5KSkge1xyXG5cdFx0XHRcdFx0XHRwaW5reVtwcm9wXSA9IHFbcHJvcF07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIFNldCBsYXN0IG1ldGhvZHNcclxuXHRcdFx0XHRwaW5reS5zZW5kID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRmb3IodmFyIGk9MCwgaj1wcm9taXNlcy5sZW5ndGg7IGk8ajsgKytpKSB7XHJcblx0XHRcdFx0XHRcdHByb21pc2VzW2ldLnNlbmQoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiBwaW5reTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHBpbmt5LmFib3J0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRmb3IodmFyIGk9MCwgaj1wcm9taXNlcy5sZW5ndGg7IGk8ajsgKytpKSB7XHJcblx0XHRcdFx0XHRcdHByb21pc2VzW2ldLmFib3J0KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gcGlua3k7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRyZXR1cm4gcGlua3k7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdHEgPSB7XHJcblx0XHRcdGJhc2U6ICcnLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBnZXROZXdQcm9taXNlKHEpLmdldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRwb3N0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gZ2V0TmV3UHJvbWlzZShxKS5wb3N0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHB1dDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIGdldE5ld1Byb21pc2UocSkucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdH0sXHJcblx0XHRcdCdkZWxldGUnOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gZ2V0TmV3UHJvbWlzZShxKVsnZGVsZXRlJ10uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0bWFwOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gZ2V0TmV3UHJvbWlzZShxKS5tYXAuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0eGhyMjogeGhyMixcclxuXHRcdFx0bGltaXQ6IGZ1bmN0aW9uKGJ5KSB7XHJcblx0XHRcdFx0bGltaXQgPSBieTtcclxuXHRcdFx0XHRyZXR1cm4gcTtcclxuXHRcdFx0fSxcclxuXHRcdFx0c2V0RGVmYXVsdE9wdGlvbnM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRcdFx0XHRkZWZhdWx0T3B0aW9ucyA9IG9wdGlvbnM7XHJcblx0XHRcdFx0cmV0dXJuIHE7XHJcblx0XHRcdH0sXHJcblx0XHRcdHNldERlZmF1bHRYZHJSZXNwb25zZVR5cGU6IGZ1bmN0aW9uKHR5cGUpIHtcclxuXHRcdFx0XHRkZWZhdWx0WGRyUmVzcG9uc2VUeXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdHJldHVybiBxO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzZXREZWZhdWx0RGF0YVR5cGU6IGZ1bmN0aW9uKHR5cGUpIHtcclxuXHRcdFx0XHRkZWZhdWx0RGF0YVR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0cmV0dXJuIHE7XHJcblx0XHRcdH0sXHJcblx0XHRcdGdldE9wZW5SZXF1ZXN0czogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIHJlcXVlc3RzO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFxyXG5cdHJldHVybiBxO1xyXG5cclxufSgpO1xyXG4iXX0=
