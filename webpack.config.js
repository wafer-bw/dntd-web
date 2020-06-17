const path = require("path")
const FileManagerPlugin = require("filemanager-webpack-plugin")

function build(watch, instrument) {
    let buildRules = [
        {
            enforce: "pre",
            test: /\.jsx?$/,
            loader: "source-map-loader",
        },
        {
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/,
        }
    ]

    if (instrument) {
        buildRules.push({
            test: /\.jsx?|.tsx?$/,
            enforce: "post",
            include: path.resolve(`./src`),
            exclude: [
                /node_modules/,
                /cypress/,
                /coverage/,
                /mocks/,
                /workers/,
                /sync/,
                /Google.ts/,
                /syncResponses.ts/,
                /syncTasks.ts/,
                /typeGuards.ts/
            ],
            loader: "istanbul-instrumenter-loader",
            options: {
                esModules: true
            }
        })
    }

    let buildObj = {
        mode: "production",
        entry: {
            dntd: "./src/index.ts",
            syncWebWorker: "./src/workers/sync/syncWebWorker.ts",
            serviceWorker: "./src/workers/serviceWorker.ts"
        },
        devtool: "source-map",
        watch: watch,
        module: {
            rules: buildRules
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".jsx"],
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "public", "js"),
        },
        externals: {
            "mithril": "m"
        },
        plugins: [
            new FileManagerPlugin({
                onEnd: {
                    move: [
                        { source: "./public/js/serviceWorker.js", destination: "./public/serviceWorker.js" },
                        { source: "./public/js/serviceWorker.js.map", destination: "./public/serviceWorker.js.map" }
                    ]
                }
            })
        ]
    }

    return buildObj
}

module.exports = env => {
    let watch = (env !== undefined && env.watch !== undefined) ? Boolean(env.watch) : false
    let instrument = (env !== undefined && env.instrument !== undefined) ? Boolean(env.instrument) : false
    return build(watch, instrument)
}
