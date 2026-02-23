import { useQuery } from '@tanstack/react-query'

async function fetchPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!response.ok) throw new Error('Failed to fetch posts')
  return response.json()
}

function PostsComponent() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    gcTime: 1000 * 60 * 10     // 10 minutes garbage collection
  })

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Posts</h1>
          
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isFetching ? 'Refreshing...' : 'Refresh Posts'}
          </button>
        </div>

        {isLoading && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">Loading posts...</p>
          </div>
        )}

        {isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
            <p>Error: {error.message}</p>
          </div>
        )}

        {posts && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 9).map(post => (
              <div 
                key={post.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 line-clamp-4">
                  {post.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PostsComponent