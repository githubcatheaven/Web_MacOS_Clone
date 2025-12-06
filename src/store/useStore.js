import { create } from 'zustand'

const useStore = create((set) => ({
    isLoggedIn: false,
    login: () => set({ isLoggedIn: true }),
    logout: () => set({ isLoggedIn: false }),

    windows: [],
    activeWindowId: null,
    zIndexCounter: 100,

    openWindow: (id, app, title, component) => set((state) => {
        if (state.windows.find((w) => w.id === id)) {
            return { activeWindowId: id, zIndexCounter: state.zIndexCounter + 1, windows: state.windows.map(w => w.id === id ? { ...w, zIndex: state.zIndexCounter + 1, minimized: false } : w) }
        }
        return {
            windows: [...state.windows, {
                id,
                app,
                title,
                component,
                minimized: false,
                zIndex: state.zIndexCounter + 1,
                position: { x: 100 + state.windows.length * 20, y: 100 + state.windows.length * 20 },
                size: { width: 600, height: 400 }
            }],
            activeWindowId: id,
            zIndexCounter: state.zIndexCounter + 1
        }
    }),

    closeWindow: (id) => set((state) => ({
        windows: state.windows.filter((w) => w.id !== id),
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
    })),

    minimizeWindow: (id) => set((state) => ({
        windows: state.windows.map((w) => w.id === id ? { ...w, minimized: true } : w),
        activeWindowId: null
    })),

    focusWindow: (id) => set((state) => ({
        activeWindowId: id,
        zIndexCounter: state.zIndexCounter + 1,
        windows: state.windows.map((w) => w.id === id ? { ...w, zIndex: state.zIndexCounter + 1, minimized: false } : w)
    })),

    updateWindowPosition: (id, position) => set((state) => ({
        windows: state.windows.map((w) => w.id === id ? { ...w, position } : w)
    })),

    updateWindowSize: (id, size) => set((state) => ({
        windows: state.windows.map((w) => w.id === id ? { ...w, size } : w)
    }))
}))

export default useStore
