-- GUI creation script
local screenGui = Instance.new("ScreenGui")
local frame = Instance.new("Frame")
local button = Instance.new("TextButton")
local label = Instance.new("TextLabel")

-- Setup GUI
screenGui.Name = "MyGUI"
screenGui.Parent = game.Players.LocalPlayer:WaitForChild("PlayerGui")

-- Frame configuration
frame.Size = UDim2.new(0, 300, 0, 200)
frame.Position = UDim2.new(0.5, -150, 0.5, -100)
frame.BackgroundColor3 = Color3.new(0.2, 0.2, 0.2)
frame.BorderSizePixel = 2
frame.Parent = screenGui

-- Button configuration
button.Size = UDim2.new(0, 100, 0, 50)
button.Position = UDim2.new(0.5, -50, 0.7, -25)
button.Text = "Click Me!"
button.BackgroundColor3 = Color3.new(0, 0.8, 0)
button.TextColor3 = Color3.new(1, 1, 1)
button.Parent = frame

-- Label configuration
label.Size = UDim2.new(1, 0, 0, 50)
label.Position = UDim2.new(0, 0, 0, 10)
label.Text = "Welcome to my GUI!"
label.BackgroundTransparency = 1
label.TextColor3 = Color3.new(1, 1, 1)
label.TextScaled = true
label.Parent = frame

-- Variables
local clickCount = 0
local messages = {"Hello!", "Welcome!", "Thanks!", "Awesome!"}

-- Button click handler
button.MouseButton1Click:Connect(function()
    clickCount = clickCount + 1
    local messageIndex = (clickCount % #messages) + 1
    label.Text = messages[messageIndex] .. " (Clicks: " .. clickCount .. ")"
    
    -- Change button color
    button.BackgroundColor3 = Color3.new(
        math.random(),
        math.random(),
        math.random()
    )
end)