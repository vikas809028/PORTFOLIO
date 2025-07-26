import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vikas Tiwari | Full Stack Developer & DevOps Practitioner",
  description: "Full Stack Developer with DevOps expertise, building scalable web applications at Prutor.ai (IIT Kanpur). Passionate about end-to-end system development, from coding to CI/CD pipelines and cloud infrastructure. Explore my projects showcasing full-stack development and DevOps implementations.",  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/exp1.svg" sizes="any" />
        
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

