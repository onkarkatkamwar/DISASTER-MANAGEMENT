
import React, { useState, useEffect } from 'react';
import { MessageCircle, Heart, Share, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SocialMediaFeedProps {
  location: { latitude: number; longitude: number; };
}

const SocialMediaFeed: React.FC<SocialMediaFeedProps> = ({ location }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock social media posts
  const mockPosts = [
    {
      id: 1,
      platform: 'Reddit',
      username: 'EmergencyUpdates',
      content: "🚨 URGENT: Earthquake felt in downtown area. Everyone please stay calm and follow safety protocols. Checking on neighbors now.",
      timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
      engagement: { likes: 142, comments: 23, shares: 67 },
      verified: true,
      relevanceScore: 0.95
    },
    {
      id: 2,
      platform: 'Reddit',
      username: 'LocalReporter',
      content: "⚠️ Roads flooded near the river bridge. Alternative routes: Highway 101 or Main Street. Emergency services on scene.",
      timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
      engagement: { likes: 89, comments: 15, shares: 34 },
      verified: false,
      relevanceScore: 0.87
    },
    {
      id: 3,
      platform: 'Reddit',
      username: 'WeatherAlert',
      content: "Storm system moving in from the west. Expect heavy rain and strong winds in the next 2 hours. Secure outdoor items!",
      timestamp: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
      engagement: { likes: 156, comments: 31, shares: 78 },
      verified: true,
      relevanceScore: 0.82
    },
    {
      id: 4,
      platform: 'Reddit',
      username: 'CommunityHelp',
      content: "Setting up emergency shelter at the community center. Volunteers needed! Bring blankets and water if you can help. #DisasterRelief",
      timestamp: new Date(Date.now() - 1000 * 60 * 67).toISOString(),
      engagement: { likes: 203, comments: 45, shares: 89 },
      verified: false,
      relevanceScore: 0.78
    }
  ];

  useEffect(() => {
    // Simulate API call to social media platforms
    setIsLoading(true);
    setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1200);
  }, [location]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) {
      return `${diffMins}m`;
    } else if (diffMins < 1440) {
      const diffHours = Math.floor(diffMins / 60);
      return `${diffHours}h`;
    } else {
      const diffDays = Math.floor(diffMins / 1440);
      return `${diffDays}d`;
    }
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 0.9) return 'bg-red-100 text-red-800';
    if (score >= 0.8) return 'bg-orange-100 text-orange-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Reddit': return '🔴';
      case 'Twitter': return '🔵';
      default: return '💬';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {posts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No social media reports</p>
          <p className="text-sm">Monitoring platforms for updates</p>
        </div>
      ) : (
        posts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{getPlatformIcon(post.platform)}</span>
                  <span className="font-medium text-sm text-gray-900">
                    {post.username}
                  </span>
                  {post.verified && (
                    <span className="text-blue-500 text-xs">✓</span>
                  )}
                  <Badge className={`text-xs ${getRelevanceColor(post.relevanceScore)}`}>
                    {Math.round(post.relevanceScore * 100)}% match
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {formatTimestamp(post.timestamp)}
                </div>
              </div>
              
              <p className="text-sm text-gray-800 mb-3 leading-relaxed">
                {post.content}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {post.engagement.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    {post.engagement.comments}
                  </div>
                  <div className="flex items-center gap-1">
                    <Share className="h-3 w-3" />
                    {post.engagement.shares}
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default SocialMediaFeed;
