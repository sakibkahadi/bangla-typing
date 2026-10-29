import "./globals.css";

export const metadata = {
  title: "Bangla Typing Practice",
  description: "Practice Bangla typing, improve your speed, and track accuracy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
