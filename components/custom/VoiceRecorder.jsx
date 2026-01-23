'use client';

import { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * VoiceRecorder Component
 * 
 * Uses the FREE Web Speech API (built into all modern browsers)
 * No API keys or external services required!
 * 
 * Browser Support: Chrome, Edge, Safari (Webkit)
 */
export default function VoiceRecorder({ onTranscription }) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Check if browser supports Web Speech API
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setIsSupported(false);
        console.warn('Web Speech API not supported in this browser');
        return;
      }

      // Initialize Speech Recognition
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true; // Keep listening until stopped
      recognitionInstance.interimResults = true; // Get results while speaking
      recognitionInstance.lang = 'en-US'; // Language (can be changed to other languages)

      // Event: When speech is recognized
      recognitionInstance.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPiece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPiece + ' ';
          } else {
            interimTranscript += transcriptPiece;
          }
        }

        const fullTranscript = finalTranscript || interimTranscript;
        setTranscript(fullTranscript);

        // Send final transcript to parent component
        if (finalTranscript && onTranscription) {
          onTranscription(finalTranscript.trim());
        }
      };

      // Event: When recognition ends
      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      // Event: On error
      recognitionInstance.onerror = (event) => {
        // 'aborted' is normal when stopping recognition, don't show error
        if (event.error === 'aborted') {
          // Silent - this is expected behavior
          return;
        }

        // 'no-speech' is also normal - user just didn't speak
        if (event.error === 'no-speech') {
          console.log('No speech detected');
          setIsListening(false);
          return;
        }

        // Log other errors for debugging
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);

        // Only show alert for permission issues
        if (event.error === 'not-allowed') {
          alert('Microphone permission denied. Please allow microphone access to use voice input.');
        } else if (event.error === 'network') {
          console.error('Network error - speech recognition requires internet connection');
        }
      };

      setRecognition(recognitionInstance);
    }
  }, [onTranscription]);

  const startListening = () => {
    if (recognition && !isListening) {
      setTranscript('');
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return (
      <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <MicOff className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          Voice input not supported in this browser. Please use Chrome, Edge, or Safari.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={toggleListening}
        variant={isListening ? 'destructive' : 'default'}
        size="lg"
        className={`relative ${isListening ? 'animate-pulse' : ''}`}
      >
        {isListening ? (
          <>
            <Mic className="w-5 h-5 mr-2 animate-pulse" />
            Stop Recording
          </>
        ) : (
          <>
            <Mic className="w-5 h-5 mr-2" />
            Start Voice Input
          </>
        )}
      </Button>

      {isListening && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-2">
            <Loader2 className="w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-400 animate-spin" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                Listening...
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300 italic">
                {transcript || 'Start speaking...'}
              </p>
            </div>
          </div>
        </div>
      )}

      {!isListening && transcript && (
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">
            Transcription:
          </p>
          <p className="text-sm text-green-700 dark:text-green-300">
            {transcript}
          </p>
        </div>
      )}
    </div>
  );
}
