
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Clock, AlertTriangle, User, Globe, Smartphone, Zap, Database } from 'lucide-react';

interface TestFlow {
  id: string;
  name: string;
  duration: string;
  priority: 'critical' | 'high' | 'medium';
  status: 'pending' | 'in-progress' | 'passed' | 'failed';
  steps: TestStep[];
  icon: React.ReactNode;
}

interface TestStep {
  id: string;
  description: string;
  status: 'pending' | 'passed' | 'failed';
  notes?: string;
}

const E2ETestDashboard: React.FC = () => {
  const [testFlows, setTestFlows] = useState<TestFlow[]>([
    {
      id: 'flow-1',
      name: 'Complete User Journey',
      duration: '45 min',
      priority: 'critical',
      status: 'pending',
      icon: <User className="w-5 h-5" />,
      steps: [
        { id: 'auth-signup', description: 'Test Signup Wizard flow', status: 'pending' },
        { id: 'auth-login', description: 'Login with aviadn777@gmail.com', status: 'pending' },
        { id: 'auth-session', description: 'Test session persistence', status: 'pending' },
        { id: 'discovery-hero', description: 'Test Welcome Hero interactions', status: 'pending' },
        { id: 'discovery-search', description: 'Test search system', status: 'pending' },
        { id: 'discovery-filters', description: 'Test filter combinations', status: 'pending' },
        { id: 'discovery-cards', description: 'Test business card interactions', status: 'pending' },
        { id: 'gamification', description: 'Test heart collection & achievements', status: 'pending' }
      ]
    },
    {
      id: 'flow-2',
      name: 'Multi-Language Testing',
      duration: '30 min',
      priority: 'high',
      status: 'pending',
      icon: <Globe className="w-5 h-5" />,
      steps: [
        { id: 'hebrew-interface', description: 'Test Hebrew RTL interface', status: 'pending' },
        { id: 'hebrew-content', description: 'Verify Hebrew content display', status: 'pending' },
        { id: 'english-interface', description: 'Test English LTR interface', status: 'pending' },
        { id: 'language-switching', description: 'Test language toggle functionality', status: 'pending' }
      ]
    },
    {
      id: 'flow-3',
      name: 'Responsive Design Testing',
      duration: '40 min',
      priority: 'high',
      status: 'pending',
      icon: <Smartphone className="w-5 h-5" />,
      steps: [
        { id: 'mobile-layout', description: 'Test mobile layout (390×844)', status: 'pending' },
        { id: 'mobile-touch', description: 'Test touch interactions', status: 'pending' },
        { id: 'tablet-layout', description: 'Test tablet layouts', status: 'pending' },
        { id: 'desktop-layout', description: 'Test desktop layout (1920×1080)', status: 'pending' }
      ]
    },
    {
      id: 'flow-4',
      name: 'Performance & Error Testing',
      duration: '25 min',
      priority: 'medium',
      status: 'pending',
      icon: <Zap className="w-5 h-5" />,
      steps: [
        { id: 'load-performance', description: 'Measure page load times (<3s)', status: 'pending' },
        { id: 'filter-performance', description: 'Test filter response times', status: 'pending' },
        { id: 'offline-testing', description: 'Test offline functionality', status: 'pending' },
        { id: 'error-handling', description: 'Test error scenarios', status: 'pending' }
      ]
    },
    {
      id: 'flow-5',
      name: 'Data Integration Testing',
      duration: '20 min',
      priority: 'high',
      status: 'pending',
      icon: <Database className="w-5 h-5" />,
      steps: [
        { id: 'supabase-connection', description: 'Verify Supabase connectivity', status: 'pending' },
        { id: 'data-loading', description: 'Test business data loading', status: 'pending' },
        { id: 'data-accuracy', description: 'Verify data accuracy', status: 'pending' },
        { id: 'rls-policies', description: 'Test security policies', status: 'pending' }
      ]
    }
  ]);

  const updateStepStatus = (flowId: string, stepId: string, status: TestStep['status'], notes?: string) => {
    setTestFlows(prev => prev.map(flow => {
      if (flow.id === flowId) {
        const updatedSteps = flow.steps.map(step => 
          step.id === stepId ? { ...step, status, notes } : step
        );
        
        // Update flow status based on steps
        let flowStatus: TestFlow['status'] = 'pending';
        const hasInProgress = updatedSteps.some(s => s.status === 'in-progress');
        const allCompleted = updatedSteps.every(s => s.status === 'passed' || s.status === 'failed');
        const hasFailed = updatedSteps.some(s => s.status === 'failed');
        
        if (hasInProgress) flowStatus = 'in-progress';
        else if (allCompleted && !hasFailed) flowStatus = 'passed';
        else if (hasFailed) flowStatus = 'failed';
        
        return { ...flow, steps: updatedSteps, status: flowStatus };
      }
      return flow;
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-600" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOverallStats = () => {
    const totalSteps = testFlows.reduce((sum, flow) => sum + flow.steps.length, 0);
    const passedSteps = testFlows.reduce((sum, flow) => 
      sum + flow.steps.filter(s => s.status === 'passed').length, 0);
    const failedSteps = testFlows.reduce((sum, flow) => 
      sum + flow.steps.filter(s => s.status === 'failed').length, 0);
    
    return {
      total: totalSteps,
      passed: passedSteps,
      failed: failedSteps,
      completion: Math.round((passedSteps / totalSteps) * 100)
    };
  };

  const stats = getOverallStats();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">End-to-End Testing Dashboard</h1>
        <p className="text-gray-600">Comprehensive QA testing for QFLOW application</p>
        <Badge className="mt-2 bg-blue-100 text-blue-800">
          Test User: aviadn777@gmail.com
        </Badge>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Testing Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Steps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.passed}</div>
              <div className="text-sm text-gray-600">Passed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.completion}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
          <Progress value={stats.completion} className="w-full" />
        </CardContent>
      </Card>

      {/* Test Flows */}
      <div className="grid gap-6">
        {testFlows.map(flow => (
          <Card key={flow.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {flow.icon}
                  <span>{flow.name}</span>
                  <Badge className={getPriorityColor(flow.priority)}>
                    {flow.priority}
                  </Badge>
                  <Badge variant="outline">{flow.duration}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(flow.status)}
                  <span className="text-sm font-normal capitalize">{flow.status}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {flow.steps.map(step => (
                  <div key={step.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(step.status)}
                        <span className="font-medium">{step.description}</span>
                      </div>
                    </div>
                    {step.notes && (
                      <p className="text-sm text-gray-600 mt-2 italic">Notes: {step.notes}</p>
                    )}
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant={step.status === 'passed' ? 'default' : 'outline'}
                        onClick={() => updateStepStatus(flow.id, step.id, 'passed')}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Pass
                      </Button>
                      <Button
                        size="sm"
                        variant={step.status === 'failed' ? 'destructive' : 'outline'}
                        onClick={() => updateStepStatus(flow.id, step.id, 'failed')}
                      >
                        Fail
                      </Button>
                      <Button
                        size="sm"
                        variant={step.status === 'in-progress' ? 'secondary' : 'outline'}
                        onClick={() => updateStepStatus(flow.id, step.id, 'in-progress')}
                      >
                        In Progress
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              onClick={() => window.open('/discovery', '_blank')}
            >
              Test Discovery (EN)
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open('/גילוי', '_blank')}
            >
              Test Discovery (HE)
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open('/discover-salons', '_blank')}
            >
              Test Discover Salons
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const report = `# E2E Testing Report\n\n## Summary\n- Total Steps: ${stats.total}\n- Passed: ${stats.passed}\n- Failed: ${stats.failed}\n- Completion: ${stats.completion}%\n\n## Flow Status\n${testFlows.map(f => `- ${f.name}: ${f.status.toUpperCase()}`).join('\n')}`;
                navigator.clipboard.writeText(report);
                alert('E2E Test report copied to clipboard!');
              }}
            >
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default E2ETestDashboard;
