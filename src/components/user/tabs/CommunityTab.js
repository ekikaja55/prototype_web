'use client'
import React, { useState, useMemo } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  TrendingUp, 
  Clock, 
  Flame, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  ChevronUp, 
  ChevronDown, 
  Send, 
  X, 
  Hash, 
  Image, 
  Video, 
  Link,
  MoreHorizontal,
  Flag,
  Bookmark,
  Award
} from 'lucide-react';

const CommunityTab = ({ communityPosts, setCommunityPosts, userProfile }) => {
  const [sortBy, setSortBy] = useState('recent');
  const [filterTag, setFilterTag] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState('');

  // Get all unique tags from posts
  const allTags = useMemo(() => {
    const tags = communityPosts.flatMap(post => post.tags || []);
    return [...new Set(tags)];
  }, [communityPosts]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = communityPosts.filter(post => {
      const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.author.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = filterTag === 'all' || (post.tags && post.tags.includes(filterTag));
      
      return matchesSearch && matchesTag;
    });

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.timestamp) - new Date(a.timestamp);
        case 'popular':
          return b.likes - a.likes;
        case 'comments':
          return (b.comments?.length || 0) - (a.comments?.length || 0);
        case 'trending':
          // Simple trending algorithm: likes + comments in last 24h
          const aScore = a.likes + (a.comments?.length || 0);
          const bScore = b.likes + (b.comments?.length || 0);
          return bScore - aScore;
        default:
          return 0;
      }
    });

    return filtered;
  }, [communityPosts, searchTerm, filterTag, sortBy]);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleLike = (postId) => {
    setCommunityPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked 
            }
          : post
      )
    );
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const tags = newPostTags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    const newPost = {
      id: Date.now(),
      author: {
        name: userProfile.name,
        avatar: userProfile.avatar
      },
      content: newPostContent,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
      tags: tags,
      isLiked: false
    };

    setCommunityPosts(prev => [newPost, ...prev]);
    setNewPostContent('');
    setNewPostTags('');
    setShowCreatePost(false);
  };

  const handleAddComment = (postId) => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: userProfile.name,
      content: commentText,
      timestamp: new Date().toISOString()
    };

    setCommunityPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, comments: [...(post.comments || []), newComment] }
          : post
      )
    );

    setCommentText('');
  };

  const CreatePostModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Create Post</h2>
            <button
              onClick={() => setShowCreatePost(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center mb-4">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <div className="font-medium text-gray-900">{userProfile.name}</div>
              <div className="text-sm text-gray-500">Posting to Sports Community</div>
            </div>
          </div>

          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="What's on your mind? Share your sports journey, tips, or ask questions..."
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={newPostTags}
              onChange={(e) => setNewPostTags(e.target.value)}
              placeholder="e.g., basketball, training, tips"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Image className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Link className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCreatePost(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                disabled={!newPostContent.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PostCard = ({ post }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      {/* Post Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <div className="font-medium text-gray-900">{post.author.name}</div>
              <div className="text-sm text-gray-500">{formatTimeAgo(post.timestamp)}</div>
            </div>
          </div>
          
          <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <p className="text-gray-900 whitespace-pre-wrap mb-3">{post.content}</p>
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full cursor-pointer hover:bg-blue-100 transition-colors duration-200"
                onClick={() => setFilterTag(tag)}
              >
                <Hash className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleLike(post.id)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors duration-200 ${
                post.isLiked 
                  ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{post.likes}</span>
            </button>
            
            <button
              onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{post.comments?.length || 0}</span>
            </button>
            
            <button className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200">
              <Share className="w-4 h-4" />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Flag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {selectedPost === post.id && (
        <div className="border-t border-gray-100 bg-gray-50">
          {/* Existing Comments */}
          {post.comments && post.comments.length > 0 && (
            <div className="p-4 space-y-3">
              {post.comments.map(comment => (
                <div key={comment.id} className="flex space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                        <span className="text-xs text-gray-500">{formatTimeAgo(comment.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                    <div className="flex items-center space-x-3 mt-1 ml-3">
                      <button className="text-xs text-gray-500 hover:text-gray-700">Like</button>
                      <button className="text-xs text-gray-500 hover:text-gray-700">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Add Comment */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-3">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    disabled={!commentText.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sports Community</h1>
          <p className="text-gray-600">Connect with fellow athletes and sports enthusiasts</p>
        </div>
        
        <button
          onClick={() => setShowCreatePost(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </button>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Active Members</p>
              <p className="text-lg font-semibold text-gray-900">2,451</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <MessageCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Posts Today</p>
              <p className="text-lg font-semibold text-gray-900">47</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Trending</p>
              <p className="text-lg font-semibold text-gray-900">#basketball</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Award className="w-5 h-5 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Your Posts</p>
              <p className="text-lg font-semibold text-gray-900">
                {communityPosts.filter(p => p.author.name === userProfile.name).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'recent', label: 'Recent', icon: Clock },
              { key: 'popular', label: 'Popular', icon: Heart },
              { key: 'trending', label: 'Trending', icon: Flame },
              { key: 'comments', label: 'Most Discussed', icon: MessageCircle }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  sortBy === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4 mr-1" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setFilterTag('all')}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                filterTag === 'all'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Tags
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                  filterTag === tag
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Hash className="w-3 h-3 mr-1" />
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {filteredAndSortedPosts.length > 0 ? (
          filteredAndSortedPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterTag !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Be the first to share something with the community!'}
            </p>
            <button
              onClick={() => setShowCreatePost(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Post
            </button>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      {showCreatePost && <CreatePostModal />}
    </div>
  );
};

export default CommunityTab;


