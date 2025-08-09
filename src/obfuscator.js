class RobloxObfuscator {
    constructor(options = {}) {
        this.options = {
            obfuscateVariables: options.obfuscateVariables !== false,
            obfuscateStrings: options.obfuscateStrings !== false,
            obfuscateNumbers: options.obfuscateNumbers !== false,
            removeComments: options.removeComments !== false,
            obfuscateControlFlow: options.obfuscateControlFlow !== false,
            variablePrefix: options.variablePrefix || '_0x',
            ...options
        };
        
        this.variableMap = new Map();
        this.variableCounter = 0;
    }

    obfuscate(code) {
        let obfuscatedCode = code;

        // Remove comments first
        if (this.options.removeComments) {
            obfuscatedCode = this.removeComments(obfuscatedCode);
        }

        // Obfuscate strings
        if (this.options.obfuscateStrings) {
            obfuscatedCode = this.obfuscateStrings(obfuscatedCode);
        }

        // Obfuscate numbers
        if (this.options.obfuscateNumbers) {
            obfuscatedCode = this.obfuscateNumbers(obfuscatedCode);
        }

        // Obfuscate variables
        if (this.options.obfuscateVariables) {
            obfuscatedCode = this.obfuscateVariables(obfuscatedCode);
        }

        // Obfuscate control flow
        if (this.options.obfuscateControlFlow) {
            obfuscatedCode = this.obfuscateControlFlow(obfuscatedCode);
        }

        return obfuscatedCode;
    }

    removeComments(code) {
        // Remove single-line comments
        code = code.replace(/--[^\r\n]*/g, '');
        
        // Remove multi-line comments
        code = code.replace(/--\[\[[\s\S]*?\]\]/g, '');
        
        return code;
    }

    obfuscateStrings(code) {
        // Find all string literals and replace them with obfuscated versions
        return code.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
            const quote = match[0];
            const content = match.slice(1, -1);
            
            // Convert string to char codes and reconstruct
            const charCodes = [];
            for (let i = 0; i < content.length; i++) {
                charCodes.push(content.charCodeAt(i));
            }
            
            return `string.char(${charCodes.join(', ')})`;
        });
    }

    obfuscateNumbers(code) {
        // Replace numbers with mathematical expressions
        return code.replace(/\b\d+\b/g, (match) => {
            const num = parseInt(match);
            if (num === 0) return '(1-1)';
            if (num === 1) return '(2-1)';
            
            // Create a mathematical expression that evaluates to the number
            const base = Math.floor(Math.random() * 50) + 10;
            const diff = num - base;
            
            if (diff >= 0) {
                return `(${base}+${diff})`;
            } else {
                return `(${base}${diff})`;
            }
        });
    }

    generateVariableName() {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = this.options.variablePrefix;
        
        // Generate a random suffix
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return result;
    }

    obfuscateVariables(code) {
        // Common Lua/Roblox keywords that shouldn't be obfuscated
        const keywords = new Set([
            'and', 'break', 'do', 'else', 'elseif', 'end', 'false', 'for',
            'function', 'if', 'in', 'local', 'nil', 'not', 'or', 'repeat',
            'return', 'then', 'true', 'until', 'while', 'print', 'pairs',
            'ipairs', 'next', 'type', 'getmetatable', 'setmetatable', 'rawget',
            'rawset', 'tostring', 'tonumber', 'string', 'table', 'math',
            'game', 'workspace', 'script', 'wait', 'spawn', 'delay'
        ]);

        // Find variable declarations and usages
        const variablePattern = /\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
        
        let match;
        const variables = new Set();
        
        // First pass: collect all variable names
        while ((match = variablePattern.exec(code)) !== null) {
            const varName = match[1];
            if (!keywords.has(varName) && !varName.startsWith('_')) {
                variables.add(varName);
            }
        }

        // Second pass: replace variables with obfuscated names
        for (const varName of variables) {
            if (!this.variableMap.has(varName)) {
                this.variableMap.set(varName, this.generateVariableName());
            }
            
            const obfuscatedName = this.variableMap.get(varName);
            const regex = new RegExp(`\\b${varName}\\b`, 'g');
            code = code.replace(regex, obfuscatedName);
        }

        return code;
    }

    obfuscateControlFlow(code) {
        // Simple control flow obfuscation - wrap code blocks in do...end
        return code.replace(/(\n\s*)(if\s+.+?\s+then)([\s\S]*?)(end)/g, 
            (match, indent, ifStatement, body, endStatement) => {
                return `${indent}do\n${indent}  ${ifStatement}${body}${endStatement}\n${indent}end`;
            });
    }

    reset() {
        this.variableMap.clear();
        this.variableCounter = 0;
    }
}

module.exports = RobloxObfuscator;