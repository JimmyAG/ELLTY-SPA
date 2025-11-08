import type { RefObject } from 'react'
import { useEventListener } from 'usehooks-ts'

type EventType =
  | 'mousedown'
  | 'mouseup'
  | 'touchstart'
  | 'touchend'
  | 'focusin'
  | 'focusout'

/**
 * React hook to detect and execute a callback when clicking outside a certain react element
 * This will be used across the app! In case of updates maintain compatibility
 * @param ref Div / React element Ref outside of which we need to detect clicks
 * @param callback A callback function to be executed
 */
export default function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T> | RefObject<T>[],
  handler: (event: MouseEvent | TouchEvent | FocusEvent) => void,
  eventType: EventType = 'mousedown',
  eventListenerOptions: AddEventListenerOptions = {}
): void {
  useEventListener(
    eventType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      const target = event.target as Node

      // Do nothing if the target is not connected element with document
      if (!target || !target.isConnected) {
        return
      }

      const isOutside = Array.isArray(ref)
        ? ref
            .filter((r) => Boolean(r.current))
            .every((r) => r.current && !r.current.contains(target))
        : ref.current && !ref.current.contains(target)

      if (isOutside) {
        handler(event)
      }
    },
    undefined,
    eventListenerOptions
  )
}
