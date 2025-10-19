"use client";
import { ReactNode } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import "./globals.css";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#3984caff" },
    background: { default: "#0f172a", paper: "#1e293b" },
    text: { primary: "#f8fafc" },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}





// "use client"; // Client component needed for MUI
// import { ReactNode } from "react";
// import { ThemeProvider, CssBaseline } from "@mui/material";
// import theme from "../theme";
// import "./globals.css";

// interface LayoutProps {
//   children: ReactNode;
// }

// export default function RootLayout({ children }: LayoutProps) {
//   return (
//     <html lang="en">
//       <body>
//         <ThemeProvider theme={theme}>
//           <CssBaseline />
//           {children}
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

