
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TestingChecklist from '@/components/testing/TestingChecklist';
import E2ETestDashboard from '@/components/testing/E2ETestDashboard';
import BugReportForm from '@/components/testing/BugReportForm';

const Testing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">QFLOW Testing Center</h1>
          <p className="text-lg text-gray-600">Comprehensive testing dashboard for quality assurance</p>
        </div>

        <Tabs defaultValue="e2e" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="e2e">End-to-End Testing</TabsTrigger>
            <TabsTrigger value="checklist">Feature Checklist</TabsTrigger>
            <TabsTrigger value="bugs">Bug Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="e2e" className="mt-6">
            <E2ETestDashboard />
          </TabsContent>
          
          <TabsContent value="checklist" className="mt-6">
            <TestingChecklist />
          </TabsContent>
          
          <TabsContent value="bugs" className="mt-6">
            <BugReportForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Testing;
