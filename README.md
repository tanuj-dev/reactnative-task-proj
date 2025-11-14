🛒 React Native Task – Home & Cart Flow (with Persistence + Maestro E2E)

This project demonstrates a simple two-screen shopping flow built using React Native, including cart management, language switching, local persistence, and automated E2E testing.

✨ Features
Home Screen

Centered title: Home

Right-side icons: Cart (with item count) and Settings

Language selection modal (English & Arabic)

20 static products displayed in two columns

Infinite scrolling FlatList

Each card has Add to Cart / Added button

Updates cart count dynamically

Cart Screen

Shows all items added from Home

Each item has a delete button

Cart count updates on deletion

Full RTL support for Arabic

Data Persistence

All user data persists even after killing the app:

Cart items

Cart count

Selected language

Handled through AsyncStorage + global Context API.

Maestro E2E Test

A complete end-to-end test is included:

maestro/flow/cart_flow.yaml

Covers:

Add the 4th visible item to the cart

Navigate to Cart

Delete the item

Return to Home

📂 Main Folder Structure
src/
components/
screens/
context/
utils/
data/
storage/
navigation/
maestro/

▶️ Run the App
npm install
npx react-native run-android

# or

npx react-native run-ios

🤖 Run Maestro E2E Test

Start a simulator/emulator, then:

maestro test flow.yaml
