#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const RobloxObfuscator = require('../src/obfuscator');

function showHelp() {
    console.log(`
Roblox Code Obfuscator

Usage: roblox-obfuscate [options] <input-file> [output-file]

Options:
  -h, --help                 Show this help message
  -o, --output <file>        Output file (default: adds .obfuscated before extension)
  --no-variables             Disable variable obfuscation
  --no-strings               Disable string obfuscation
  --no-numbers               Disable number obfuscation
  --no-comments              Disable comment removal
  --no-control-flow          Disable control flow obfuscation
  --variable-prefix <prefix> Set variable prefix (default: _0x)
  --preset <level>           Use preset: basic, medium, advanced (default: medium)

Examples:
  roblox-obfuscate script.lua
  roblox-obfuscate script.lua -o obfuscated.lua
  roblox-obfuscate script.lua --preset advanced
  roblox-obfuscate script.lua --no-strings --variable-prefix _a
`);
}

function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        obfuscateVariables: true,
        obfuscateStrings: true,
        obfuscateNumbers: true,
        removeComments: true,
        obfuscateControlFlow: true,
        variablePrefix: '_0x'
    };
    
    let inputFile = null;
    let outputFile = null;

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        
        switch (arg) {
            case '-h':
            case '--help':
                showHelp();
                process.exit(0);
                break;
                
            case '-o':
            case '--output':
                outputFile = args[++i];
                break;
                
            case '--no-variables':
                options.obfuscateVariables = false;
                break;
                
            case '--no-strings':
                options.obfuscateStrings = false;
                break;
                
            case '--no-numbers':
                options.obfuscateNumbers = false;
                break;
                
            case '--no-comments':
                options.removeComments = false;
                break;
                
            case '--no-control-flow':
                options.obfuscateControlFlow = false;
                break;
                
            case '--variable-prefix':
                options.variablePrefix = args[++i];
                break;
                
            case '--preset':
                const preset = args[++i];
                switch (preset) {
                    case 'basic':
                        options.obfuscateVariables = true;
                        options.obfuscateStrings = false;
                        options.obfuscateNumbers = false;
                        options.removeComments = true;
                        options.obfuscateControlFlow = false;
                        break;
                    case 'medium':
                        // Default settings
                        break;
                    case 'advanced':
                        // All features enabled (default)
                        break;
                    default:
                        console.error(`Unknown preset: ${preset}`);
                        process.exit(1);
                }
                break;
                
            default:
                if (!inputFile) {
                    inputFile = arg;
                } else if (!outputFile) {
                    outputFile = arg;
                }
                break;
        }
    }

    return { options, inputFile, outputFile };
}

function main() {
    const { options, inputFile, outputFile } = parseArgs();

    if (!inputFile) {
        console.error('Error: Input file is required');
        showHelp();
        process.exit(1);
    }

    if (!fs.existsSync(inputFile)) {
        console.error(`Error: Input file '${inputFile}' does not exist`);
        process.exit(1);
    }

    // Generate output filename if not provided
    let finalOutputFile = outputFile;
    if (!finalOutputFile) {
        const parsed = path.parse(inputFile);
        finalOutputFile = path.join(parsed.dir, `${parsed.name}.obfuscated${parsed.ext}`);
    }

    try {
        // Read input file
        const code = fs.readFileSync(inputFile, 'utf8');
        
        // Create obfuscator and process code
        const obfuscator = new RobloxObfuscator(options);
        const obfuscatedCode = obfuscator.obfuscate(code);
        
        // Write output file
        fs.writeFileSync(finalOutputFile, obfuscatedCode, 'utf8');
        
        console.log(`✓ Successfully obfuscated '${inputFile}' -> '${finalOutputFile}'`);
        console.log(`Original size: ${code.length} bytes`);
        console.log(`Obfuscated size: ${obfuscatedCode.length} bytes`);
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { main, parseArgs };