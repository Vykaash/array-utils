module.exports = {
    roots: [
        "./test"
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json'
        }
    },
}