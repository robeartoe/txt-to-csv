const cli = require('clui')
const progess = cli.Progress
const fs = require('fs');
// const detectCharacterEncoding = require('detect-character-encoding');
const fastcsv = require('fast-csv');  
const readline = require('readline');
rl = readline.createInterface({input:process.stdin, output:process.stdout});


module.exports = async (args) => {

    let percent_bar = new progess(50);
    const file = args.file || args.f
    const filename = file.slice(0,-4)

    // Getting Size of File:
    const stats = fs.statSync(file)
    const size = stats['size']
    console.log(`Size of File: ${size} bytes`)

    const readStream = fs.createReadStream(file);
    const writeStream = fs.createWriteStream(`${filename}.csv`);

    readStream.on('data', function(chunk){
        let cur_bytes = readStream.bytesRead;
        let percent = cur_bytes / size * 100;
        let value = (percent * 50) / 100
        value = parseInt(value);
        
        // let value = Math.round( percent * 10 ) / 10;

        process.stdout.clearLine();
        process.stdout.cursorTo(1);
        process.stdout.write(percent_bar.update(value,50))
    });

    readStream.on('close',function(){
        console.log("\nCompleted Conversion!")
        rl.close()
    })

    readStream.pipe(writeStream);
}