
import React, { useState, useEffect } from 'react';
import { ExternalLink, Clock, Rss } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NewsFeedProps {
  location: { latitude: number; longitude: number};
}

const NewsFeed: React.FC<NewsFeedProps> = ({ location }) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock news articles
  const mockArticles = [
    {
      id: 1,
      title: "Emergency Response Teams Mobilized Following 6.2 Earthquake",
      description: "Local authorities have deployed emergency response teams to assess damage and provide assistance to affected communities...",
      source: "Emergency News Network",
      publishedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
      url: "#",
      category: "Emergency Response",
      relevance: "High"
    },
    {
      id: 2,
      title: "Flood Warning Systems Activated Across River Basin",
      description: "Advanced warning systems have been activated as meteorologists predict significant rainfall in the coming hours...",
      source: "Weather Channel",
      publishedAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
      url: "#",
      category: "Weather Alert",
      relevance: "Medium"
    },
    {
      id: 3,
      title: "Community Preparedness Program Shows Success in Recent Drills",
      description: "Local community emergency preparedness programs demonstrated effective coordination during recent disaster response drills...",
      source: "Community Safety Report",
      publishedAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
      url: "#",
      category: "Preparedness",
      relevance: "Low"
    },
    {
      id: 4,
      title: "Technology Advances in Early Warning Systems",
      description: "New satellite-based monitoring systems are improving the accuracy and speed of disaster early warning capabilities...",
      source: "Tech Today",
      publishedAt: new Date(Date.now() - 1000 * 60 * 130).toISOString(),
      url: "#",
      category: "Technology",
      relevance: "Medium"
    }
  ];

  useEffect(() => {
    // Simulate API call to news service
    setIsLoading(true);
    setTimeout(() => {
      setArticles(mockArticles);
      setIsLoading(false);
    }, 800);
  }, [location]);

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffMins < 1440) {
      const diffHours = Math.floor(diffMins / 60);
      return `${diffHours}h ago`;
    } else {
      const diffDays = Math.floor(diffMins / 1440);
      return `${diffDays}d ago`;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {articles.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Rss className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No recent news available</p>
          <p className="text-sm">Check back later for updates</p>
        </div>
      ) : (
        articles.map((article) => (
          <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    {article.category}
                  </Badge>
                  <Badge className={`text-xs ${getRelevanceColor(article.relevance)}`}>
                    {article.relevance}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {formatTimestamp(article.publishedAt)}
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {article.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  {article.source}
                </div>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  Read More
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default NewsFeed;
