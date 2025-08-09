# Roblox Code Obfuscator

A powerful and easy-to-use Roblox code obfuscator that protects your Lua/Luau scripts from reverse engineering and unauthorized access.

## Features

- **Variable Name Obfuscation**: Replaces meaningful variable names with random, unreadable identifiers
- **String Obfuscation**: Converts string literals to character code arrays to hide sensitive text
- **Number Obfuscation**: Replaces numbers with mathematical expressions that evaluate to the same value
- **Comment Removal**: Strips all comments from the code to reduce readability
- **Control Flow Obfuscation**: Adds complexity to control structures
- **Configurable Options**: Customize obfuscation levels and techniques
- **CLI Interface**: Easy command-line usage for batch processing
- **Preset Modes**: Quick configuration with basic, medium, and advanced presets

## Installation

1. Clone this repository:
```bash
git clone https://github.com/oneverdiea/proxy.git
cd proxy
```

2. Install dependencies (if any):
```bash
npm install
```

3. Make the CLI executable:
```bash
chmod +x bin/cli.js
```

## Usage

### Command Line Interface

Basic usage:
```bash
node bin/cli.js examples/player_enhancer.lua
```

With custom output file:
```bash
node bin/cli.js examples/player_enhancer.lua -o protected_script.lua
```

Using presets:
```bash
# Basic obfuscation (variables and comments only)
node bin/cli.js script.lua --preset basic

# Medium obfuscation (default - all features)
node bin/cli.js script.lua --preset medium

# Advanced obfuscation (all features enabled)
node bin/cli.js script.lua --preset advanced
```

Custom configuration:
```bash
node bin/cli.js script.lua --no-strings --variable-prefix _a --no-control-flow
```

### Programmatic Usage

```javascript
const RobloxObfuscator = require('./src/obfuscator');

// Create obfuscator with default settings
const obfuscator = new RobloxObfuscator();

// Or with custom options
const customObfuscator = new RobloxObfuscator({
    obfuscateVariables: true,
    obfuscateStrings: true,
    obfuscateNumbers: false,
    removeComments: true,
    variablePrefix: '_custom'
});

// Obfuscate code
const originalCode = `
local player = game.Players.LocalPlayer
local message = "Hello World"
print(message)
`;

const obfuscatedCode = obfuscator.obfuscate(originalCode);
console.log(obfuscatedCode);
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `obfuscateVariables` | boolean | `true` | Obfuscate variable names |
| `obfuscateStrings` | boolean | `true` | Convert strings to char code arrays |
| `obfuscateNumbers` | boolean | `true` | Replace numbers with math expressions |
| `removeComments` | boolean | `true` | Remove all comments |
| `obfuscateControlFlow` | boolean | `true` | Add control flow complexity |
| `variablePrefix` | string | `'_0x'` | Prefix for obfuscated variable names |

## CLI Options

```
Usage: roblox-obfuscate [options] <input-file> [output-file]

Options:
  -h, --help                 Show help message
  -o, --output <file>        Output file (default: adds .obfuscated before extension)
  --no-variables             Disable variable obfuscation
  --no-strings               Disable string obfuscation
  --no-numbers               Disable number obfuscation
  --no-comments              Disable comment removal
  --no-control-flow          Disable control flow obfuscation
  --variable-prefix <prefix> Set variable prefix (default: _0x)
  --preset <level>           Use preset: basic, medium, advanced (default: medium)
```

## Examples

### Before Obfuscation
```lua
-- Player enhancement script
local player = game.Players.LocalPlayer
local character = player.CharacterAdded:Wait()
local walkSpeed = 50

function enhancePlayer()
    character.Humanoid.WalkSpeed = walkSpeed
    print("Player enhanced!")
end

enhancePlayer()
```

### After Obfuscation
```lua
local _0xaBcDeF = game.Players.LocalPlayer
local _0xGhIjKl = _0xaBcDeF.CharacterAdded:Wait()
local _0xMnOpQr = (60-10)

function _0xStUvWx()
    _0xGhIjKl.Humanoid.WalkSpeed = _0xMnOpQr
    print(string.char(80, 108, 97, 121, 101, 114, 32, 101, 110, 104, 97, 110, 99, 101, 100, 33))
end

_0xStUvWx()
```

## Testing

Run the test suite to verify the obfuscator works correctly:

```bash
npm test
```

Or run tests directly:
```bash
node test/test.js
```

## Example Scripts

The `examples/` directory contains sample Roblox scripts that you can use to test the obfuscator:

- `player_enhancer.lua` - A script that enhances player abilities
- `gui_script.lua` - A script that creates a simple GUI interface

Test the obfuscator with these examples:
```bash
node bin/cli.js examples/player_enhancer.lua
node bin/cli.js examples/gui_script.lua --preset advanced
```

## Security Note

This obfuscator is designed to make reverse engineering more difficult, but it's not a substitute for proper security practices. Determined attackers may still be able to deobfuscate the code. Use this tool as part of a comprehensive security strategy.

## Supported Lua/Luau Features

- Variable declarations and assignments
- Function definitions and calls
- String literals (single and double quotes)
- Number literals
- Comments (single-line `--` and multi-line `--[[ ]]`)
- Control structures (`if`, `for`, `while`, etc.)
- Roblox-specific APIs (`game`, `workspace`, `script`, etc.)

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Run the test suite
6. Submit a pull request

## Changelog

### Version 1.0.0
- Initial release
- Variable name obfuscation
- String obfuscation using char codes
- Number obfuscation with math expressions
- Comment removal
- Basic control flow obfuscation
- CLI interface with presets
- Comprehensive test suite