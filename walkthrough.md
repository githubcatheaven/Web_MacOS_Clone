# Web Mac OS Walkthrough

## Status: Feature Complete

The project has implemented all core features, applications, and polish items.

## Features

### Core System
- **Boot Sequence**: Realistic Apple-style boot screen with progress bar.
- **Login Screen**: Simulated login with password protection.
- **Desktop**: Wallpaper, Menu Bar with clock, Dock with bouncing animation.
- **Window Management**:
    - **Draggable**: Move windows around.
    - **Resizable**: Resize windows from the bottom-right corner.
    - **Controls**: Minimize, Close, Maximize (visual only).
    - **Z-Index**: Clicking a window brings it to the front.
- **Responsive**: Mobile warning screen for small devices.

### Applications

1.  **Finder**
    - Simulated file system navigation.
    - Sidebar with favorites.
    - Back/Forward navigation.
    - Grid view of files and folders.

2.  **Calculator**
    - Fully functional arithmetic operations (+, -, *, /).
    - Standard macOS design.
    - Keyboard support (visual buttons).

3.  **Notepad**
    - Simple text editing.
    - **Persistence**: Auto-saves content to `localStorage`, so your notes survive page reloads.

4.  **Solitaire (Klondike)**
    - Playable card game.
    - **Interaction**: Click to select a card, click destination to move.
    - Logic: Validates moves (color alternation, descending order).
    - Draw pile and Foundation piles.

5.  **Chinese Chess (Xiangqi)**
    - Full 9x10 board.
    - **Pieces**: Unicode characters for Red and Black pieces.
    - **Movement**: Basic move validation for all pieces (General, Advisor, Elephant, Horse, Chariot, Cannon, Soldier).
    - **Turn-based**: Enforces Red/Black turns.

## How to Run

1.  Ensure dependencies are installed:
    ```bash
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
3.  Open the local URL (usually `http://localhost:5173`).

## Verification

- **Boot**: Refresh the page to see the boot animation.
- **Login**: Enter any password to access the desktop.
- **Open Apps**: Click icons in the Dock.
- **Multitasking**: Open multiple apps and arrange them on the desktop.
- **Games**: Try playing Solitaire or Chinese Chess to test logic.
- **Mobile**: Resize the window to < 768px to see the warning.
