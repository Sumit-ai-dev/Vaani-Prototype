"use client"
import React, { useContext, useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Lookup from '@/data/Lookup';
import { MessagesContext } from '@/context/MessagesContext';
import Prompt from '@/data/Prompt';
import { useConvex, useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import { api } from '@/convex/_generated/api';
import { Loader2Icon } from 'lucide-react';

const SandpackProvider = dynamic(() => import("@codesandbox/sandpack-react").then(mod => mod.SandpackProvider), { ssr: false });
const SandpackLayout = dynamic(() => import("@codesandbox/sandpack-react").then(mod => mod.SandpackLayout), { ssr: false });
const SandpackPreview = dynamic(() => import("@codesandbox/sandpack-react").then(mod => mod.SandpackPreview), { ssr: false });

function CodeView() {
    const { id } = useParams();
    const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
    const { messages } = useContext(MessagesContext);
    const UpdateFiles = useMutation(api.workspace.UpdateFiles);
    const convex = useConvex();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const preprocessFiles = useCallback((files) => {
        const processed = {};
        Object.entries(files).forEach(([path, content]) => {
            if (typeof content === 'string') {
                processed[path] = { code: content };
            } else if (content && typeof content === 'object') {
                if (!content.code && typeof content === 'object') {
                    processed[path] = { code: JSON.stringify(content, null, 2) };
                } else {
                    processed[path] = content;
                }
            }
        });
        return processed;
    }, []);

    const GetFiles = useCallback(async () => {
        const result = await convex.query(api.workspace.GetWorkspace, {
            workspaceId: id
        });
        const processedFiles = preprocessFiles(result?.fileData || {});
        const mergedFiles = { ...Lookup.DEFAULT_FILE, ...processedFiles };
        setFiles(mergedFiles);
    }, [id, convex, preprocessFiles]);

    useEffect(() => {
        id && GetFiles();
    }, [id, GetFiles]);

    const GenerateAiCode = useCallback(async () => {
        setLoading(true);
        setErrorMessage('');
        const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
        
        try {
            const response = await fetch('/api/gen-ai-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: PROMPT }),
            });

            if (!response.ok || !response.body) {
                let errorText = 'Unable to generate a preview right now.';
                try {
                    const data = await response.json();
                    if (data?.error) {
                        errorText = data.error;
                    }
                } catch (e) {
                    // ignore JSON parse errors
                }
                setErrorMessage(errorText);
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let finalData = null;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            if (data.done && data.final) {
                                finalData = data.final;
                            }
                        } catch (e) {
                            // Skip invalid JSON
                        }
                    }
                }
            }

            if (finalData && finalData.files) {
                const processedAiFiles = preprocessFiles(finalData.files || {});
                const mergedFiles = { ...Lookup.DEFAULT_FILE, ...processedAiFiles };
                setFiles(mergedFiles);

                await UpdateFiles({
                    workspaceId: id,
                    files: finalData.files
                });
            }
        } catch (error) {
            console.error('Error generating AI code:', error);
            setErrorMessage('Something went wrong while generating the preview.');
        } finally {
            setLoading(false);
        }
    }, [messages, id, UpdateFiles, preprocessFiles]);

    useEffect(() => {
        if (messages?.length > 0) {
            const role = messages[messages?.length - 1].role;
            if (role === 'user') {
                GenerateAiCode();
            }
        }
    }, [messages, GenerateAiCode]);
    
    return (
        <div className='relative'>
            <div className='bg-[#181818] w-full p-2 border'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center flex-wrap shrink-0 bg-black p-1 justify-center
                    w-[120px] gap-3 rounded-full'>
                        <h2 className='text-sm text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full'>
                            Preview
                        </h2>
                    </div>

                    <p className="text-xs text-gray-400">
                        Your code stays managed by VANI. Preview and request edits anytime.
                    </p>
                </div>
            </div>
            {errorMessage && (
                <div className="border border-red-500/40 bg-red-500/10 text-red-200 text-sm px-4 py-3">
                    {errorMessage}
                </div>
            )}
            <SandpackProvider 
            files={files}
            template="react" 
            theme={'dark'}
            customSetup={{
                dependencies: {
                    ...Lookup.DEPENDANCY
                },
                entry: '/index.js'
            }}
            options={{
                externalResources: ['https://cdn.tailwindcss.com'],
                bundlerTimeoutSecs: 120,
                recompileMode: "immediate",
                recompileDelay: 300
            }}
            >
                <div className="relative">
                    <SandpackLayout>
                        <SandpackPreview 
                            style={{ height: '80vh' }} 
                            showNavigator={true}
                            showOpenInCodeSandbox={false}
                            showRefreshButton={true}
                        />
                    </SandpackLayout>
                </div>
            </SandpackProvider>

            {loading&&<div className='p-10 bg-gray-900 opacity-80 absolute top-0 
            rounded-lg w-full h-full flex items-center justify-center'>
                <Loader2Icon className='animate-spin h-10 w-10 text-white'/>
                <h2 className='text-white'> Generating files...</h2>
            </div>}
        </div>
    );
}

export default CodeView;
