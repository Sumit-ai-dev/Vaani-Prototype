'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * ConfirmationDialog Component
 * 
 * The "Trust Loop" - Shows AI's understanding and asks for confirmation
 * before proceeding with website generation.
 * 
 * Props:
 * - aiIntent: String - AI's interpretation of user's request
 * - onConfirm: Function - Called when user confirms
 * - onReject: Function - Called when user wants to rephrase
 * - isVisible: Boolean - Controls visibility
 */
export default function ConfirmationDialog({
    aiIntent,
    onConfirm,
    onReject,
    isVisible
}) {
    if (!isVisible || !aiIntent) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border-2 border-electric-blue-500/40 rounded-xl max-w-2xl w-full p-6 shadow-[0_0_40px_5px_rgba(59,130,246,0.15)] animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-electric-blue-400 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">
                            Confirm Your Request
                        </h3>
                        <p className="text-gray-400 text-sm">
                            I want to make sure I understand correctly before creating your website.
                        </p>
                    </div>
                </div>

                {/* AI's Understanding */}
                <div className="bg-gradient-to-r from-electric-blue-500/10 to-purple-500/10 rounded-lg p-4 mb-6 border border-electric-blue-500/30">
                    <p className="text-sm font-medium text-electric-blue-400 mb-2">
                        Here's what I understand:
                    </p>
                    <p className="text-white text-base leading-relaxed">
                        {aiIntent}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                        onClick={onConfirm}
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-6 text-lg transition-all duration-200 shadow-lg hover:shadow-emerald-500/50"
                    >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Yes, that's correct!
                    </Button>

                    <Button
                        onClick={onReject}
                        variant="outline"
                        className="flex-1 border-2 border-gray-600 hover:border-gray-500 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-6 text-lg transition-all duration-200"
                    >
                        <XCircle className="w-5 h-5 mr-2" />
                        No, let me rephrase
                    </Button>
                </div>

                {/* Footer Tip */}
                <p className="text-xs text-gray-500 text-center mt-4">
                    💡 Tip: Being specific helps me create exactly what you want
                </p>
            </div>
        </div>
    );
}
