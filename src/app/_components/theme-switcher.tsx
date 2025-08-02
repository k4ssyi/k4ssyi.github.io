'use client'

import { memo, useEffect, useState } from 'react'
import styles from './switch.module.css'

declare global {
  var updateDOM: () => void
}

type ColorSchemePreference = 'system' | 'dark' | 'light'

const STORAGE_KEY = 'nextjs-blog-starter-theme'
const modes: ColorSchemePreference[] = ['system', 'dark', 'light']

/** to reuse updateDOM function defined inside injected script */

/** function to be injected in script tag for avoiding FOUC (Flash of Unstyled Content) */
export const NoFOUCScript = (storageKey: string) => {
  /* can not use outside constants or function as this script will be injected in a different context */
  const [SYSTEM, DARK, LIGHT] = ['system', 'dark', 'light']

  /** Modify transition globally to avoid patched transitions */
  const modifyTransition = () => {
    const css = document.createElement('style')
    css.textContent = '*,*:after,*:before{transition:none !important;}'
    document.head.appendChild(css)

    return () => {
      /* Force restyle */
      getComputedStyle(document.body)
      /* Wait for next tick before removing */
      setTimeout(() => document.head.removeChild(css), 1)
    }
  }

  const media = matchMedia(`(prefers-color-scheme: ${DARK})`)

  /** function to add remove dark class */
  window.updateDOM = () => {
    const restoreTransitions = modifyTransition()
    const mode = localStorage.getItem(storageKey) ?? SYSTEM
    const systemMode = media.matches ? DARK : LIGHT
    const resolvedMode = mode === SYSTEM ? systemMode : mode
    const classList = document.documentElement.classList
    if (resolvedMode === DARK) classList.add(DARK)
    else classList.remove(DARK)
    document.documentElement.setAttribute('data-mode', mode)
    restoreTransitions()
  }
  window.updateDOM()
  media.addEventListener('change', window.updateDOM)
}

let updateDOMGlobal: () => void

/**
 * Switch button to quickly toggle user preference.
 */
const Switch = () => {
  const [mode, setMode] = useState<ColorSchemePreference>(() => {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored && modes.includes(stored as ColorSchemePreference)) {
        return stored as ColorSchemePreference
      }
    }
    return 'system'
  })

  useEffect(() => {
    // store global functions to local variables to avoid any interference
    updateDOMGlobal = window.updateDOM
    /** Sync the tabs */
    const handleStorage = (e: StorageEvent): void => {
      if (e.key === STORAGE_KEY) {
        // e.newValueがnullや不正な値の場合は'system'にフォールバック
        const value = (e.newValue ?? 'system') as string
        if (modes.includes(value as ColorSchemePreference)) {
          setMode(value as ColorSchemePreference)
        } else {
          setMode('system')
        }
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode)
    if (typeof updateDOMGlobal === 'function') {
      updateDOMGlobal()
    }
  }, [mode])

  /** toggle mode */
  const handleModeSwitch = () => {
    const index = modes.indexOf(mode)
    // indexが-1の場合は'system'にフォールバックし、必ずColorSchemePreference型をセット
    let nextMode: ColorSchemePreference
    if (index === -1) {
      nextMode = 'system'
    } else {
      // 必ずmodes配列の範囲内になるのでundefinedにならない
      nextMode = modes[(index + 1) % modes.length] as ColorSchemePreference
    }
    setMode(nextMode)
  }
  return (
    <button
      suppressHydrationWarning
      className={styles['switch']}
      onClick={handleModeSwitch}
    />
  )
}

import { useRef } from 'react'

const Script = memo(() => {
  const scriptRef = useRef<HTMLScriptElement>(null)

  useEffect(() => {
    if (scriptRef.current) {
      scriptRef.current.text = `(${NoFOUCScript.toString()})('${STORAGE_KEY}')`
    }
  }, [])

  return <script ref={scriptRef} />
})

/**
 * This component wich applies classes and transitions.
 */
export const ThemeSwitcher = () => {
  return (
    <>
      <Script />
      <Switch />
    </>
  )
}
