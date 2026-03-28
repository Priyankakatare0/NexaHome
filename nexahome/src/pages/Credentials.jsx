import { Plus, Eye, Copy, Link as LinkIcon } from 'lucide-react';
import React, { useState } from 'react';

const Credentials = () => {
  const [credentials] = useState([]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Credentials</h1>
          <p className="text-slate-400">Manage API keys and authentication tokens for your devices.</p>
        </div>
        <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex-shrink-0">
          <Plus size={20} />
          New Credential
        </button>
      </div>

      {/* Credentials List */}
      <div className="space-y-4">
        {credentials.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-slate-400 text-lg">No credentials added yet. Click "New Credential" to get started.</p>
          </div>
        ) : (
          credentials.map((cred) => (
            <div
              key={cred.id}
              className="bg-gradient-to-r from-slate-900/50 to-slate-950/50 border border-slate-800 rounded-lg p-6 flex items-center justify-between hover:border-slate-700 transition-all duration-200"
            >
              {/* Left Section - Icon and Info */}
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <LinkIcon size={24} className="text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{cred.name}</h3>
                  <p className="text-sm text-slate-500">
                    {cred.type} · Created {cred.createdAt}
                  </p>
                </div>
              </div>

              {/* Right Section - Value and Actions */}
              <div className="flex items-center gap-4 ml-4">
                <code className="text-slate-400 text-sm bg-slate-800/50 px-4 py-2 rounded font-mono">
                  {cred.maskedValue}
                </code>
                <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors" title="Toggle visibility">
                  <Eye size={18} className="text-slate-400 hover:text-slate-300" />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors" title="Copy to clipboard">
                  <Copy size={18} className="text-slate-400 hover:text-slate-300" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Credentials;
