'use client'
import { useEffect } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPalette, faCode, faBullhorn } from '@fortawesome/free-solid-svg-icons'

export function FontAwesomeSetup() {
  useEffect(() => {
    config.autoAddCss = false
    library.add(faPalette, faCode, faBullhorn)
  }, [])

  return null
} 