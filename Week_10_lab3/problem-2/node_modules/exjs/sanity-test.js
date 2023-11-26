require('./index').install()

var arraySubject = [10, 'Hello', { someKey: 'someValue' }]

arraySubject.map( inspect.one('item') )
