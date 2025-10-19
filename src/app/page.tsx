"use client";
import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  IconButton,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import toast, { Toaster } from "react-hot-toast";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    if (!url.trim()) return toast.error("Please enter a valid URL");
    setLoading(true);
    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();

      if (res.ok) {
        setShortUrl(data.shortUrl);
        toast.success("URL shortened successfully!");
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Toaster position="top-center" />
      <Card
        sx={{
          p: 5,
          borderRadius: "22px",
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(168,85,247,0.3))",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(25px)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          transition: "all 0.3s ease",
          
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3, fontWeight: 700, color: "#fff" }}
        >
          ✂️ URL Shortener
        </Typography>

        <TextField
          label="Enter your URL"
          variant="outlined"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        />

        <Button
          variant="contained"
          onClick={handleShorten}
          disabled={loading}
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: "10px",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
            "&:hover": {
              background: "linear-gradient(90deg, #818cf8, #a78bfa)",
            },
          }}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </Button>

        {shortUrl && (
          <Card
            sx={{
              mt: 3,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: "#ffffff", // ✅ White text for shortened URL
                flexGrow: 1,
                mr: 1,
                fontWeight: 500,
              }}
            >
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#fff",
                  textDecoration: "underline",
                }}
              >
                {shortUrl}
              </a>
            </Typography>
            <Tooltip title="Copy">
              <IconButton onClick={handleCopy} color="primary">
                {copied ? <CheckIcon /> : <ContentCopyIcon />}
              </IconButton>
            </Tooltip>
          </Card>
        )}
      </Card>
    </Container>
  );
}





// "use client";
// import { useState } from "react";
// import { Container, TextField, Button, Typography, Card } from "@mui/material";

// export default function HomePage() {
//   const [url, setUrl] = useState("");
//   const [shortUrl, setShortUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleShorten = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch("/api/shorten", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ url }),
//       });
//       const data = await res.json();

//       if (res.ok) {
//         setShortUrl(data.shortUrl);
//       } else {
//         setError(data.error || "Something went wrong");
//       }
//     } catch (err) {
//       setError("Network error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 10 }}>
//       <Card sx={{ p: 4, textAlign: "center" }}>
//         <Typography variant="h4" gutterBottom>
//           URL Shortener
//         </Typography>
//         <TextField
//           label="Enter your URL"
//           variant="outlined"
//           fullWidth
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <Button
//           variant="contained"
//           onClick={handleShorten}
//           disabled={loading}
//         >
//           {loading ? "Shortening..." : "Shorten URL"}
//         </Button>

//         {shortUrl && (
//           <Typography sx={{ mt: 2 }}>
//             Shortened URL: <a href={shortUrl}>{shortUrl}</a>
//           </Typography>
//         )}
//         {error && (
//           <Typography sx={{ mt: 2, color: "red" }}>{error}</Typography>
//         )}
//       </Card>
//     </Container>
//   );
// }
