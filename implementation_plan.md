# Polish & Integration Implementation Plan

## Goal
Enhance the realism and user experience of the Web Mac OS Clone by adding a boot sequence, handling mobile devices gracefully, and adding sound effects.

## Proposed Changes

### Boot Sequence
#### [NEW] [src/components/OS/BootScreen.jsx](file:///d:/Dev/web_system/src/components/OS/BootScreen.jsx)
- **Visuals**: Black background, white Apple logo (centered), progress bar.
- **Behavior**:
    - Appears on initial load.
    - Progress bar fills up over ~2-3 seconds.
    - Transitions to `LoginScreen` upon completion.

#### [MODIFY] [src/App.jsx](file:///d:/Dev/web_system/src/App.jsx)
- Add `isBooting` state.
- Render `BootScreen` if `isBooting` is true.

### Responsive Adjustments
#### [NEW] [src/components/OS/MobileWarning.jsx](file:///d:/Dev/web_system/src/components/OS/MobileWarning.jsx)
- **Visuals**: Simple message stating "This OS is designed for Desktop. Please use a larger screen."
- **Behavior**: Shown if screen width is < 768px.

#### [MODIFY] [src/App.jsx](file:///d:/Dev/web_system/src/App.jsx)
- Check window width on mount and resize.
- Render `MobileWarning` if screen is too small.

### Sound Effects (Optional)
#### [NEW] [src/utils/sound.js](file:///d:/Dev/web_system/src/utils/sound.js)
- Helper to play sounds.
- Use base64 data URIs for short sounds (startup chime) to avoid external dependencies if possible, or just skip if too complex for now. *Decision: Skip for now to focus on visual polish, unless user specifically asks.*

## Verification Plan

### Manual Verification
- **Boot**: Refresh page. Verify Apple logo and progress bar appear, then transition to Login Screen.
- **Mobile**: Resize browser window to < 768px width. Verify warning message appears.
- **Flow**: Boot -> Login -> Desktop.
