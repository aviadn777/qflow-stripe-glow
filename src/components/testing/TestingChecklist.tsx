
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

interface TestCase {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'passed' | 'failed' | 'blocked';
  notes?: string;
}

const TestingChecklist: React.FC = () => {
  const [testCases, setTestCases] = useState<TestCase[]>([
    // Authentication Tests
    {
      id: 'auth-01',
      category: 'Authentication',
      title: 'User Registration Flow',
      description: 'Test complete signup wizard from start to finish',
      priority: 'high',
      status: 'pending'
    },
    {
      id: 'auth-02',
      category: 'Authentication',
      title: 'User Login Flow',
      description: 'Test email/password and Google OAuth login',
      priority: 'high',
      status: 'pending'
    },
    {
      id: 'auth-03',
      category: 'Authentication',
      title: 'Session Management',
      description: 'Test logout and session persistence',
      priority: 'high',
      status: 'pending'
    },
    
    // Discovery Tests
    {
      id: 'disc-01',
      category: 'Discovery',
      title: 'Welcome Hero Section',
      description: 'Test time-based greetings and interactive elements',
      priority: 'medium',
      status: 'pending'
    },
    {
      id: 'disc-02',
      category: 'Discovery',
      title: 'Smart Search',
      description: 'Test search input, suggestions, and voice search',
      priority: 'high',
      status: 'pending'
    },
    {
      id: 'disc-03',
      category: 'Discovery',
      title: 'Filter System',
      description: 'Test all filter combinations (location, type, price, rating)',
      priority: 'high',
      status: 'pending'
    },
    {
      id: 'disc-04',
      category: 'Discovery',
      title: 'Business Cards',
      description: 'Test card display, animations, and interactions',
      priority: 'high',
      status: 'pending'
    },
    
    // Gamification Tests
    {
      id: 'game-01',
      category: 'Gamification',
      title: 'Heart Collection',
      description: 'Test heart accumulation from various interactions',
      priority: 'medium',
      status: 'pending'
    },
    {
      id: 'game-02',
      category: 'Gamification',
      title: 'Achievement System',
      description: 'Test achievement unlocks at correct thresholds',
      priority: 'medium',
      status: 'pending'
    },
    
    // Language Tests
    {
      id: 'lang-01',
      category: 'Language',
      title: 'Hebrew Interface',
      description: 'Test RTL layout, Hebrew fonts, and content',
      priority: 'high',
      status: 'pending'
    },
    {
      id: 'lang-02',
      category: 'Language',
      title: 'English Interface',
      description: 'Test LTR layout and English content',
      priority: 'high',
      status: 'pending'
    },
    
    // Responsive Tests
    {
      id: 'resp-01',
      category: 'Responsive',
      title: 'Mobile Layout',
      description: 'Test mobile breakpoints and touch interactions',
      priority: 'high',
      status: 'pending'
    },
    {
      id: 'resp-02',
      category: 'Responsive',
      title: 'Tablet Layout',
      description: 'Test tablet breakpoints in both orientations',
      priority: 'medium',
      status: 'pending'
    },
    
    // Performance Tests
    {
      id: 'perf-01',
      category: 'Performance',
      title: 'Load Performance',
      description: 'Test initial load times and data fetching speed',
      priority: 'medium',
      status: 'pending'
    },
    {
      id: 'perf-02',
      category: 'Performance',
      title: 'Filter Response',
      description: 'Test filter application speed and UI responsiveness',
      priority: 'medium',
      status: 'pending'
    }
  ]);

  const updateTestStatus = (id: string, status: TestCase['status'], notes?: string) => {
    setTestCases(prev => prev.map(test => 
      test.id === id ? { ...test, status, notes } : test
    ));
  };

  const getStatusIcon = (status: TestCase['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'blocked':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: TestCase['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = [...new Set(testCases.map(test => test.category))];
  
  const getStats = () => {
    const total = testCases.length;
    const passed = testCases.filter(t => t.status === 'passed').length;
    const failed = testCases.filter(t => t.status === 'failed').length;
    const blocked = testCases.filter(t => t.status === 'blocked').length;
    const pending = testCases.filter(t => t.status === 'pending').length;
    
    return { total, passed, failed, blocked, pending };
  };

  const stats = getStats();
  const completionRate = Math.round(((stats.passed + stats.failed + stats.blocked) / stats.total) * 100);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">QFLOW Testing Dashboard</h1>
        <p className="text-gray-600">Comprehensive testing checklist for all implemented features</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Tests</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.passed}</div>
            <div className="text-sm text-gray-600">Passed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
            <div className="text-sm text-gray-600">Failed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.blocked}</div>
            <div className="text-sm text-gray-600">Blocked</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{completionRate}%</div>
            <div className="text-sm text-gray-600">Complete</div>
          </CardContent>
        </Card>
      </div>

      {/* Test Cases by Category */}
      {categories.map(category => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{category} Tests</span>
              <Badge variant="outline">
                {testCases.filter(t => t.category === category && t.status === 'passed').length} / {testCases.filter(t => t.category === category).length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {testCases
              .filter(test => test.category === category)
              .map(test => (
                <div key={test.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(test.status)}
                        <h3 className="font-semibold text-gray-900">{test.title}</h3>
                        <Badge className={getPriorityColor(test.priority)}>
                          {test.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm">{test.description}</p>
                      {test.notes && (
                        <p className="text-gray-500 text-xs mt-1 italic">Notes: {test.notes}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant={test.status === 'passed' ? 'default' : 'outline'}
                      onClick={() => updateTestStatus(test.id, 'passed')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Pass
                    </Button>
                    <Button
                      size="sm"
                      variant={test.status === 'failed' ? 'destructive' : 'outline'}
                      onClick={() => updateTestStatus(test.id, 'failed')}
                    >
                      Fail
                    </Button>
                    <Button
                      size="sm"
                      variant={test.status === 'blocked' ? 'secondary' : 'outline'}
                      onClick={() => updateTestStatus(test.id, 'blocked')}
                    >
                      Block
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateTestStatus(test.id, 'pending')}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      ))}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              onClick={() => setTestCases(prev => prev.map(test => ({ ...test, status: 'pending' })))}
            >
              Reset All Tests
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const report = `# QFLOW Testing Report\n\n## Summary\n- Total: ${stats.total}\n- Passed: ${stats.passed}\n- Failed: ${stats.failed}\n- Blocked: ${stats.blocked}\n- Completion: ${completionRate}%\n\n## Details\n${testCases.map(t => `- [${t.status.toUpperCase()}] ${t.title}: ${t.description}`).join('\n')}`;
                navigator.clipboard.writeText(report);
                alert('Test report copied to clipboard!');
              }}
            >
              Export Report
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open('/discovery', '_blank')}
            >
              Open Discovery Page
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open('/גילוי', '_blank')}
            >
              Open Hebrew Discovery
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestingChecklist;
