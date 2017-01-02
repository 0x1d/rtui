module.exports = {
    resource: '/api',
    GET: (ctx, http) => {
        http.reply('foo');
    }
};
