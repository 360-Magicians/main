// Add Google Analytics types to the global Window interface
interface Window {
  gtag: (command: string, action: string, params?: Record<string, any>) => void
}
