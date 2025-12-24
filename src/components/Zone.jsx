export default function Zone({ title, content }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center space-y-6">
      <h1 className="text-5xl font-bold text-white tracking-wide drop-shadow-lg">{title}</h1>
      <div className="w-3/4">{content}</div>
    </div>
  );
}