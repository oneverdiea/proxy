-- Simple Roblox script example
local player = game.Players.LocalPlayer
local character = player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")

-- Configuration
local walkSpeed = 50
local jumpPower = 100
local healthAmount = 200

-- Function to enhance player
function enhancePlayer()
    humanoid.WalkSpeed = walkSpeed
    humanoid.JumpPower = jumpPower
    humanoid.MaxHealth = healthAmount
    humanoid.Health = healthAmount
    
    print("Player enhanced successfully!")
end

-- Event handlers
player.CharacterAdded:Connect(function(newCharacter)
    local newHumanoid = newCharacter:WaitForChild("Humanoid")
    wait(1)
    enhancePlayer()
end)

-- Initial enhancement
if character and humanoid then
    enhancePlayer()
end

-- Chat command handler
player.Chatted:Connect(function(message)
    local command = string.lower(message)
    
    if command == "/enhance" then
        enhancePlayer()
    elseif command == "/reset" then
        humanoid.Health = 0
    elseif command == "/speed" then
        humanoid.WalkSpeed = humanoid.WalkSpeed + 10
        print("Speed increased to: " .. humanoid.WalkSpeed)
    end
end)