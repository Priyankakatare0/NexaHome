import { Plus, Eye, Copy, Trash2, CheckCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const Credentials = () => {
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFullKey, setShowFullKey] = useState({});
  const [formData, setFormData] = useState({ name: '' });
  const [newCredential, setNewCredential] = useState(null);

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      const res = await api.get('/credentials');
      if(res.data.status === 'success') {
        setCredentials(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching credentials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCredential = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/credentials', formData);
      if(res.data.status === 'success') {
        setNewCredential(res.data.data);
        setFormData({ name: '' });
        setShowAddForm(false);
        fetchCredentials();
      }
    } catch (error) {
      alert('Error creating credential: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleRevoke = async (id) => {
    if(!window.confirm('Are you sure you want to revoke this credential? Devices using it will no longer authenticate.')) return;
    
    try {
      const res = await api.put(`/credentials/${id}/revoke`);
      if(res.data.status === 'success') {
        fetchCredentials();
      }
    } catch (error) {
      alert('Error revoking credential: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('This will permanently delete the credential. Are you sure?')) return;
    
    try {
      const res = await api.delete(`/credentials/${id}`);
      if(res.data.status === 'success') {
        fetchCredentials();
      }
    } catch (error) {
      alert('Error deleting credential: ' + (error.response?.data?.message || error.message));
    }
  };

  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`${label} copied to clipboard!`);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">API Credentials</h1>
          <p className="text-slate-400">Manage API keys for IoT device authentication.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex-shrink-0">
          <Plus size={20} />
          New Credential
        </button>
      </div>

      {/* New Credential Display */}
      {newCredential && (
        <div className="mb-8 bg-emerald-900/30 border border-emerald-600 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <CheckCircle className="text-emerald-500 flex-shrink-0 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4">✅ Credential Created Successfully!</h3>
              <p className="text-emerald-300 text-sm mb-4">Save this API Key securely. You can always view or copy it from the credentials page.</p>
              <div className="space-y-3 bg-slate-900 rounded p-4 mb-4">
                <div>
                  <label className="block text-emerald-300 text-xs font-medium mb-1">API Key</label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-emerald-200 bg-slate-800 px-3 py-2 rounded font-mono text-sm break-all">
                      {newCredential.api_key}
                    </code>
                    <button
                      onClick={() => copyToClipboard(newCredential.api_key, 'API Key')}
                      className="p-2 hover:bg-slate-700 rounded transition-colors"
                    >
                      <Copy size={16} className="text-emerald-400" />
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setNewCredential(null)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Credential Form */}
      {showAddForm && (
        <div className="mb-8 bg-slate-900 border border-slate-800 rounded-lg p-6">
          <form onSubmit={handleAddCredential} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Credential Name</label>
              <input
                type="text"
                placeholder="e.g., Living Room Devices, Kitchen IoT"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                required
              />
              <p className="text-slate-400 text-xs mt-2">Give this credential a meaningful name to identify it later.</p>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2 px-4 rounded-lg"
              >
                Create Credential
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Credentials List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-slate-400 text-lg">Loading credentials...</p>
          </div>
        ) : credentials.length === 0 ? (
          <div className="flex items-center justify-center py-12 bg-slate-900/30 border border-slate-800 rounded-lg">
            <div className="text-center">
              <p className="text-slate-400 text-lg mb-4">No credentials yet.</p>
              <p className="text-slate-500 text-sm mb-4">Create an API credential to authenticate your IoT devices.</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2 px-4 rounded-lg inline-flex items-center gap-2"
              >
                <Plus size={18} />
                Create First Credential
              </button>
            </div>
          </div>
        ) : (
          credentials.map((cred) => {
            // Masking helpers
            const mask = (str, visible = 4) => str ? `${str.slice(0, visible)}${'•'.repeat(Math.max(0, str.length - 2*visible))}${str.slice(-visible)}` : '';
            const showKey = showFullKey[cred.id]?.api_key;
            return (
              <div
                key={cred.id}
                className="bg-gradient-to-r from-slate-900/50 to-slate-950/50 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-all duration-200"
              >
                {/* Left Section - Icon and Info */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      🔑
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{cred.name}</h3>
                        {cred.is_active ? (
                          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-medium rounded">
                            Revoked
                          </span>
                        )}
                      </div>
                      {/* API Key Row */}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-slate-400 font-semibold w-16">API Key</span>
                        <code className="flex-1 text-cyan-300 bg-slate-800 px-2 py-1 rounded font-mono text-xs break-all">
                          {showKey ? cred.api_key : mask(cred.api_key)}
                        </code>
                        <button
                          onClick={() => setShowFullKey((prev) => ({...prev, [cred.id]: {...prev[cred.id], api_key: !showKey}}))}
                          className="p-1 hover:bg-slate-700 rounded transition-colors"
                          title={showKey ? 'Hide' : 'Show'}
                        >
                          <Eye size={16} className="text-cyan-400" />
                        </button>
                        <button
                          onClick={() => copyToClipboard(cred.api_key, 'API Key')}
                          className="p-1 hover:bg-slate-700 rounded transition-colors"
                          title="Copy API Key"
                        >
                          <Copy size={16} className="text-cyan-400" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 mt-2">Created: {new Date(cred.created_at).toUTCString()}</p>
                      {cred.last_used && <p className="text-xs text-slate-700">Last used: {new Date(cred.last_used).toLocaleDateString()}</p>}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 justify-end">
                  {cred.is_active && (
                    <button
                      onClick={() => handleRevoke(cred.id)}
                      className="px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 border border-yellow-600/50 rounded-lg font-medium text-sm transition-colors"
                    >
                      Revoke
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(cred.id)}
                    className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/50 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

     
    </div>
  );
};

export default Credentials;
