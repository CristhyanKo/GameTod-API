global.SALT_KEY = 'is9mH-K2Rm-AXjh-bLj0-oQtd-3X4OQI6ITyG'

module.exports = {
    connectionString: 'mongodb://localhost:27017/gametoddb',
    apiPrefix: `/api/v1`,
    apiPort: (process.env.PORT || 3001)
}