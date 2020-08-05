const middleware = {}

middleware['newsList'] = require('../middleware/newsList.js')
middleware['newsList'] = middleware['newsList'].default || middleware['newsList']

export default middleware
