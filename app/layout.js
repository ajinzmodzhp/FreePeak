export const metadata = {
  title: "My ChatGPT",
  description: "AI Chat Website powered by OpenAI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">{children}</body>
    </html>
  );
}