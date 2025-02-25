import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vikas Tiwari | Full Stack Developer | Portfolio",
  description: "Explore the portfolio of Vikas Tiwari, a Full Stack developer specializing in full-stack web applications. Check out projects, skills, and contact details.",
  keywords: "Vikas Tiwari, Full Stack developer, Full Stack Developer, React, Node.js, Portfolio, JavaScript, Next.js",
  authors: [{ name: "Vikas Tiwari", url: "https://portfolivikastiwari.vercel.app" }],
  creator: "Vikas Tiwari",
  robots: "index, follow",
  openGraph: {
    title: "Vikas Tiwari | Full Stack Developer",
    description: "Showcasing the projects and skills of Vikas Tiwari, a Full Stack Developer.",
    url: "https://portfolivikastiwari.vercel.app",
    siteName: "Vikas Tiwari Portfolio",
    type: "website",
    images: [
      {
        url: "https://portfolivikastiwari.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vikas Tiwari Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "",
    title: "Vikas Tiwari | Full Developer",
    description: "Explore my portfolio showcasing my Full stack development projects.",
    images: ["https://portfolivikastiwari.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/exp1.svg" sizes="any" />
        <link rel="canonical" href="https://portfolivikastiwari.vercel.app/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Vikas Tiwari",
            "url": "https://portfolivikastiwari.vercel.app",
            "jobTitle": "Full Stack Developer",
            "sameAs": [
              "https://linkedin.com/in/vikas-tiwari-62a963238",
              "https://github.com/vikas809028"
            ]
          })}
        </script>
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
