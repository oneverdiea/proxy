const fs = require('fs');
const path = require('path');
const RobloxObfuscator = require('../src/obfuscator');

function test(name, fn) {
    try {
        fn();
        console.log(`✓ ${name}`);
    } catch (error) {
        console.log(`✗ ${name}: ${error.message}`);
    }
}

function runTests() {
    console.log('Running Roblox Obfuscator Tests...\n');

    // Test 1: Basic obfuscation
    test('Basic obfuscation', () => {
        const obfuscator = new RobloxObfuscator();
        const code = 'local myVariable = "hello world"';
        const result = obfuscator.obfuscate(code);
        
        if (result === code) {
            throw new Error('Code was not obfuscated');
        }
    });

    // Test 2: Comment removal
    test('Comment removal', () => {
        const obfuscator = new RobloxObfuscator({ removeComments: true });
        const code = '-- This is a comment\nlocal x = 5 -- Another comment';
        const result = obfuscator.obfuscate(code);
        
        if (result.includes('-- This is a comment') || result.includes('-- Another comment')) {
            throw new Error('Comments were not removed');
        }
    });

    // Test 3: String obfuscation
    test('String obfuscation', () => {
        const obfuscator = new RobloxObfuscator({ 
            obfuscateStrings: true,
            obfuscateVariables: false,
            removeComments: false,
            obfuscateNumbers: false,
            obfuscateControlFlow: false
        });
        const code = 'local message = "Hello World"';
        const result = obfuscator.obfuscate(code);
        
        if (result.includes('"Hello World"')) {
            throw new Error('String was not obfuscated');
        }
        
        if (!result.includes('string.char(')) {
            throw new Error('String was not converted to char codes');
        }
    });

    // Test 4: Number obfuscation
    test('Number obfuscation', () => {
        const obfuscator = new RobloxObfuscator({ 
            obfuscateNumbers: true,
            obfuscateVariables: false,
            obfuscateStrings: false,
            removeComments: false,
            obfuscateControlFlow: false
        });
        const code = 'local number = 42';
        const result = obfuscator.obfuscate(code);
        
        if (result.includes(' 42')) {
            throw new Error('Number was not obfuscated');
        }
    });

    // Test 5: Variable obfuscation
    test('Variable obfuscation', () => {
        const obfuscator = new RobloxObfuscator({ 
            obfuscateVariables: true,
            obfuscateStrings: false,
            removeComments: false,
            obfuscateNumbers: false,
            obfuscateControlFlow: false
        });
        const code = 'local myVar = 5\nprint(myVar)';
        const result = obfuscator.obfuscate(code);
        
        if (result.includes('myVar') && !result.includes('_0x')) {
            throw new Error('Variable was not obfuscated');
        }
    });

    // Test 6: Keywords preservation
    test('Keywords preservation', () => {
        const obfuscator = new RobloxObfuscator();
        const code = 'local function test() print("hello") end';
        const result = obfuscator.obfuscate(code);
        
        if (!result.includes('function') || !result.includes('print') || !result.includes('end')) {
            throw new Error('Keywords were incorrectly obfuscated');
        }
    });

    // Test 7: Example file obfuscation
    test('Example file obfuscation', () => {
        const examplePath = path.join(__dirname, '../examples/player_enhancer.lua');
        if (!fs.existsSync(examplePath)) {
            throw new Error('Example file not found');
        }
        
        const code = fs.readFileSync(examplePath, 'utf8');
        const obfuscator = new RobloxObfuscator();
        const result = obfuscator.obfuscate(code);
        
        if (result === code) {
            throw new Error('Example file was not obfuscated');
        }
        
        if (result.length < code.length * 0.5) {
            throw new Error('Obfuscated code is suspiciously short');
        }
    });

    // Test 8: Configuration options
    test('Configuration options', () => {
        const obfuscator = new RobloxObfuscator({
            obfuscateVariables: false,
            obfuscateStrings: false,
            obfuscateNumbers: false,
            removeComments: false,
            obfuscateControlFlow: false
        });
        const code = '-- comment\nlocal myVar = "test" + 42';
        const result = obfuscator.obfuscate(code);
        
        if (result !== code) {
            throw new Error('Code was obfuscated despite all options being disabled');
        }
    });

    console.log('\nAll tests completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
    runTests();
}

module.exports = { runTests };