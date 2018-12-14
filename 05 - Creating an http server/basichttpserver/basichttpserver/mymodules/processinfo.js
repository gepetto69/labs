var processInfoString = function () {
    return 'pid: ' + process.pid +
                          '\nversion: ' + process.version +
                          '\nuptime: ' + process.uptime();
}

module.exports = processInfoString;