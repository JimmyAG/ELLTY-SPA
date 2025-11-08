'use client'

import { FC } from 'react'
import ReplyForm from '../../forms/ReplyForm'
import { Post, ViewPost } from '@/@types/post'
import { buildPostTree, formatMediumDateTime } from '@/app/lib/utilities/utils'

interface PostsViewProps {
  posts?: Post[]
  parentId?: number
}

interface PostItemProps {
  post: ViewPost
  depth?: number
  maxDepth?: number
}

const PostItem: FC<PostItemProps> = ({ post, depth = 0, maxDepth = 2 }) => {
  const indent = depth <= maxDepth ? depth * 20 : maxDepth * 20

  return (
    <div
      className={`relative my-3 rounded-md border bg-gray-50 p-3`}
      style={{ marginLeft: indent }}
    >
      <div className='mb-2 flex items-center gap-2'>
        <span className='font-semibold text-gray-800'>Post #{post.id}</span>
        <span className='text-sm text-gray-500'>
          {formatMediumDateTime(new Date(post.created_at))}
        </span>
      </div>

      <div className='mb-3 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700'>
        {post.operation
          ? `${post.operation} ${post.operand} → ${post.result}`
          : post.result}
      </div>

      {post.children &&
        post.children.length > 0 &&
        post.children.map((child) => (
          <PostItem
            key={child.id}
            post={child}
            depth={depth + 1}
            maxDepth={maxDepth}
          />
        ))}

      {/* Reply form */}
      <div className='mt-2'>
        <ReplyForm parentId={post.id} />
      </div>
    </div>
  )
}

const PostsView: FC<PostsViewProps> = ({ posts }) => {
  const tree = buildPostTree(posts || [])

  return (
    <div className='w-full space-y-4'>
      {tree.length > 0 ? (
        tree.map((post) => <PostItem key={post.id} post={post} />)
      ) : (
        <div className='flex w-full items-center justify-center'>
          <p className='text-lg font-medium'>No new discussion posts</p>
        </div>
      )}
    </div>
  )
}

export default PostsView
