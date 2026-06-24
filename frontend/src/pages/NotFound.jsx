import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-serif text-6xl font-bold text-brand-600">404</p>
      <h1 className="text-2xl font-semibold text-gray-900">Page not found</h1>
      <p className="max-w-md text-gray-500">
        The page you’re looking for doesn’t exist.
      </p>
      <Button to="/">Back home</Button>
    </div>
  )
}
