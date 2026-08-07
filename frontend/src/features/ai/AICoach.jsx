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
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

import { useAIChat } from "./hooks";

const suggestedPrompts = [
  "Improve my CV",
  "Review my LinkedIn profile",
  "Prepare me for an AI Engineer interview",
  "Generate a cover letter",
  "How should I negotiate salary?",
  "Analyse this job description",
];

export default function AICoach() {
  const [messages, setMessages] = useState([]);

  const [prompt, setPrompt] = useState("");

  const chatMutation = useAIChat();

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const send = async () => {
    if (!prompt.trim()) return;

    const question = prompt;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
      },
    ]);

    setPrompt("");

    try {
      const response = await chatMutation.mutateAsync({
        message: question,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        AI Career Coach
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Ask CareerWise anything about CVs, interviews,
        LinkedIn, salary negotiation or job searching.
      </Typography>

      {messages.length === 0 && (
        <>
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
            flexWrap="wrap"
            sx={{ mb: 4 }}
          >
            {suggestedPrompts.map((item) => (
              <Chip
                key={item}
                label={item}
                clickable
                onClick={() => setPrompt(item)}
              />
            ))}
          </Stack>
        </>
      )}

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
        {messages.length === 0 && (
          <Typography
            color="text.secondary"
          >
            Start a conversation with your AI Career Coach.
          </Typography>
        )}

        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent:
                message.role === "user"
                  ? "flex-end"
                  : "flex-start",
              mb: 2,
            }}
          >
            <Paper
              elevation={2}
              sx={{
                p: 2,
                maxWidth: "80%",
                bgcolor:
                  message.role === "user"
                    ? "primary.main"
                    : "grey.100",
                color:
                  message.role === "user"
                    ? "white"
                    : "black",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ mb: 1 }}
              >
                {message.role === "user"
                  ? "You"
                  : "CareerWise AI"}
              </Typography>

              <Typography
                sx={{
                  whiteSpace: "pre-wrap",
                }}
              >
                {message.content}
              </Typography>
            </Paper>
          </Box>
        ))}

        {chatMutation.isPending && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mt: 2,
            }}
          >
            <CircularProgress size={20} />

            <Typography>
              AI Coach is thinking...
            </Typography>
          </Box>
        )}

        <div ref={bottomRef} />
      </Paper>

      <TextField
        fullWidth
        multiline
        minRows={3}
        maxRows={8}
        label="Ask CareerWise AI..."
        value={prompt}
        onChange={(e) =>
          setPrompt(e.target.value)
        }
        onKeyDown={handleKeyDown}
      />

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
    </Box>
  );
}