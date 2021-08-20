const PROFILES = {
    local: {
        instances: 1,
        node_args: '--trace-warnings',
    },
    production: {
        instances: 4,
    },
}

function createPm2Config() {
    const profile = process.env.REACT_APP_ENV
    const envConfig = PROFILES[profile]
    return {
        apps: [
            {
                name: 'node-web-server',
                script: 'node_modules/next/dist/bin/next',
                args: 'start',
                cwd: './',
                interpreter: 'node',
                exec_mode: 'cluster',
                max_restarts: 5,
                min_uptime: 5000,
                log_date_format: '<YYYY-MM-DD HH:mm:ss>',
                env: {
                    NODE_ENV: 'production',
                    REACT_APP_ENV: profile,
                },
                ...envConfig,
            },
        ],
    }
}
console.log(JSON.stringify(createPm2Config(), null, '\t'))

module.exports = createPm2Config()
