const menus = {
    main: `
    text-to-csv [command] <options>

    convert..................Convert txt file to csv
    version..................Show package version
    help.....................Show help menu for a command`,
    convert:`
    text-to-csv convert <options>

    --file, -f .............. the file to use
    --delimiter, -d ......... how to separate data`,
}

module.exports = (args) => {
    const subCmd = args._[0] === 'help'
        ? args._[1]
        : args._[0]

    console.log(menus[subCmd] || menus.main)
}