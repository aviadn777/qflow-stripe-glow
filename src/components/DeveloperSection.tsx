
import React from 'react';
import { Code, Rocket, Users, Star } from 'lucide-react';

const DeveloperSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-gray-900 mb-4">
            Built by Developers, for Business Success
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our team of experienced developers understands the challenges of running a beauty salon in Israel. 
            We've created QFLOW to solve real problems with cutting-edge technology.
          </p>
        </div>

        {/* Developer Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">15,000+</div>
            <div className="text-gray-600">Lines of Code</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime Guarantee</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-600">Happy Salons</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
            <div className="text-gray-600">User Rating</div>
          </div>
        </div>

        {/* Developer Story */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 lg:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why We Built QFLOW
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              "After seeing countless Israeli salon owners struggle with outdated queue management systems, 
              we decided to build something better. QFLOW combines modern web technology with deep understanding 
              of the Israeli beauty industry to deliver a solution that actually works."
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Development Team</div>
                <div className="text-gray-600">QFLOW Founders</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
