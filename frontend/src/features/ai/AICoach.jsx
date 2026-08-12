import { useState, useRef, useEffect } from "react";

import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    CircularProgress,
    Chip,
    Stack,
    IconButton,
    Tooltip,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

import { useAIChat } from "./hooks";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


const suggestedPrompts = [
    "What should I focus on in my job search?",
    "Which applications should I follow up on?",
    "How should I prepare for my next interview?",
    "What are my current application priorities?",
    "Which opportunities need my attention?",
    "How can I improve my job search strategy?",
];


export default function AICoach() {

    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState("");

    const chatMutation = useAIChat();

    const bottomRef = useRef(null);


    // -----------------------------------------
    // Scroll to latest message
    // -----------------------------------------

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);


    // -----------------------------------------
    // Send message
    // -----------------------------------------

    const send = async () => {

        if (!prompt.trim() || chatMutation.isPending) {
            return;
        }

        const question = prompt.trim();

        // Add user message immediately
        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: question,
            },
        ]);

        // Clear input
        setPrompt("");


        try {

            const response = await chatMutation.mutateAsync(question);


            // Add AI response
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: response.data.answer,
                },
            ]);

        } catch (error) {

            console.error("AI Coach error:", error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "Sorry, something went wrong while contacting the AI service.",
                },
            ]);

        }
    };


    // -----------------------------------------
    // Enter = send
    // Shift + Enter = new line
    // -----------------------------------------

    const handleKeyDown = (event) => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            send();
        }
    };


    // -----------------------------------------
    // Suggested prompt
    // -----------------------------------------

    const handleSuggestedPrompt = (item) => {

        setPrompt(item);

    };


    // -----------------------------------------
    // Clear conversation
    // -----------------------------------------

    const clearConversation = () => {

        setMessages([]);
        setPrompt("");

    };


    return (

        <Box
            sx={{
                maxWidth: 900,
                mx: "auto",
                width: "100%",
            }}
        >

            {/* -------------------------------- */}
            {/* Header */}
            {/* -------------------------------- */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 1,
                }}
            >

                <Box>

                    <Typography
                        variant="h4"
                        sx={{ mb: 1 }}
                    >
                        AI Career Coach
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mb: 3 }}
                    >
                        Ask CareerWise anything about CVs,
                        interviews, LinkedIn, salary negotiation
                        or job searching.
                    </Typography>

                </Box>


                {/* Clear conversation */}

                {messages.length > 0 && (

                    <Tooltip title="Clear conversation">

                        <IconButton
                            onClick={clearConversation}
                            color="primary"
                        >
                            <DeleteSweepIcon />
                        </IconButton>

                    </Tooltip>

                )}

            </Box>


            {/* -------------------------------- */}
            {/* Suggested prompts */}
            {/* -------------------------------- */}

            {messages.length === 0 && (

                <Box sx={{ mb: 4 }}>

                    <Typography
                        variant="subtitle1"
                        sx={{ mb: 2 }}
                    >
                        Try one of these:
                    </Typography>


                    <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        sx={{
                            flexWrap: "wrap",
                        }}
                    >

                        {suggestedPrompts.map((item) => (

                            <Chip
                                key={item}
                                label={item}
                                clickable
                                onClick={() =>
                                    handleSuggestedPrompt(item)
                                }
                                sx={{
                                    mb: 1,
                                }}
                            />

                        ))}

                    </Stack>

                </Box>

            )}


            {/* -------------------------------- */}
            {/* Chat window */}
            {/* -------------------------------- */}

            <Paper
                elevation={3}
                sx={{
                    height: 500,
                    overflowY: "auto",
                    p: 3,
                    mb: 3,
                    bgcolor: "background.default",
                }}
            >

                {/* Empty state */}

                {messages.length === 0 && (

                    <Box
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            color: "text.secondary",
                        }}
                    >

                        <SmartToyIcon
                            sx={{
                                fontSize: 60,
                                mb: 2,
                                opacity: 0.6,
                            }}
                        />

                        <Typography
                            variant="h6"
                            sx={{ mb: 1 }}
                        >
                            Your AI Career Coach
                        </Typography>

                        <Typography>
                            Ask me anything about your career,
                            applications or job search.
                        </Typography>

                    </Box>

                )}


                {/* -------------------------------- */}
                {/* Messages */}
                {/* -------------------------------- */}

                {messages.length > 0 && (

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >

                        {messages.map((message, index) => {

                            const isUser =
                                message.role === "user";


                            return (

                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        justifyContent:
                                            isUser
                                                ? "flex-end"
                                                : "flex-start",
                                    }}
                                >

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: 1,
                                            maxWidth: "75%",
                                        }}
                                    >

                                        {/* AI icon */}

                                        {!isUser && (

                                            <SmartToyIcon
                                                color="primary"
                                                sx={{
                                                    mt: 1,
                                                    flexShrink: 0,
                                                }}
                                            />

                                        )}


                                        {/* Message bubble */}

                                        <Box
                                            sx={{
                                                px: 2,
                                                py: 1.5,
                                                borderRadius: 3,

                                                bgcolor: isUser
                                                    ? "primary.main"
                                                    : "background.paper",

                                                color: isUser
                                                    ? "white"
                                                    : "text.primary",

                                                boxShadow: 1,

                                                overflowWrap:
                                                    "break-word",

                                                "& p": {
                                                    marginTop: 0,
                                                    marginBottom: 1,
                                                },

                                                "& p:last-child": {
                                                    marginBottom: 0,
                                                },

                                                "& ul, & ol": {
                                                    paddingLeft: 3,
                                                },

                                                "& li": {
                                                    marginBottom: 0.5,
                                                },

                                                "& code": {
                                                    fontFamily:
                                                        "monospace",
                                                },
                                            }}
                                        >

                                            <ReactMarkdown
                                                remarkPlugins={[
                                                    remarkGfm,
                                                ]}
                                            >
                                                {message.content}
                                            </ReactMarkdown>

                                        </Box>

                                    </Box>

                                </Box>

                            );

                        })}


                        {/* -------------------------------- */}
                        {/* Thinking indicator */}
                        {/* -------------------------------- */}

                        {chatMutation.isPending && (

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1.5,
                                }}
                            >

                                <SmartToyIcon
                                    color="primary"
                                />

                                <CircularProgress
                                    size={18}
                                />

                                <Typography
                                    color="text.secondary"
                                >
                                    AI Coach is thinking...
                                </Typography>

                            </Box>

                        )}

                    </Box>

                )}


                <div ref={bottomRef} />

            </Paper>


            {/* -------------------------------- */}
            {/* Input */}
            {/* -------------------------------- */}

            <TextField
                fullWidth
                multiline
                minRows={3}
                maxRows={8}
                label="Ask CareerWise AI..."
                placeholder="Ask a career question..."
                value={prompt}
                onChange={(event) =>
                    setPrompt(event.target.value)
                }
                onKeyDown={handleKeyDown}
                disabled={chatMutation.isPending}
            />


            {/* -------------------------------- */}
            {/* Send button */}
            {/* -------------------------------- */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2,
                }}
            >

                <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={send}
                    disabled={
                        chatMutation.isPending ||
                        !prompt.trim()
                    }
                >
                    Send
                </Button>

            </Box>


            {/* -------------------------------- */}
            {/* Keyboard hint */}
            {/* -------------------------------- */}

            <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                    display: "block",
                    textAlign: "right",
                    mt: 1,
                }}
            >
                Enter to send · Shift + Enter for a new line
            </Typography>

        </Box>

    );

}