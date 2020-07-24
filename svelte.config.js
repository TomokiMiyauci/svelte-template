module.exports = {
    "preprocess": require("svelte-preprocess")({
        "defaults": {
            "script": "typescript",
            "style": "scss"
        },
        "scss": {
            "prependData": "@import 'src/styles/variables.scss';"
        }
    })
};
