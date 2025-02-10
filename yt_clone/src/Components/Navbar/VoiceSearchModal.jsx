"use client"

import { useEffect, useState } from "react"
import { Mic, X } from "lucide-react"
import styles from "./VoiceSearchModal.module.css"

function VoiceSearchModal({ isOpen, onClose, onResult }) {
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setIsListening(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      console.error("Speech recognition is not supported in this browser")
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      onResult(transcript)
      setIsListening(false)
      onClose()
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    if (isOpen) {
      recognition.start()
    }

    return () => {
      recognition.stop()
    }
  }, [isOpen, onClose, onResult])

  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <button className={styles.closeButton} onClick={onClose}>
        <X size={24} />
      </button>
      <div className={styles.content}>
        <h2 className={styles.title}>Listening...</h2>
        <div className={styles.micWrapper}>
          <button className={`${styles.micButton} ${isListening ? styles.listening : ""}`}>
            <Mic size={32} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default VoiceSearchModal