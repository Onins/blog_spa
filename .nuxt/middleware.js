const middleware = {}

middleware['authenticate'] = require('../middleware/authenticate.js')
middleware['authenticate'] = middleware['authenticate'].default || middleware['authenticate']

middleware['newsList'] = require('../middleware/newsList.js')
middleware['newsList'] = middleware['newsList'].default || middleware['newsList']

middleware['newsPost'] = require('../middleware/newsPost.js')
middleware['newsPost'] = middleware['newsPost'].default || middleware['newsPost']

middleware['routeHome'] = require('../middleware/routeHome.js')
middleware['routeHome'] = middleware['routeHome'].default || middleware['routeHome']

export default middleware
