module.exports = {
    roots: [
        "./test"
    ],
    transform: {
        "^.+\\.tsx?$": ["ts-jest", {
            tsconfig: 'tsconfig.test.json'
        }]
    },
}