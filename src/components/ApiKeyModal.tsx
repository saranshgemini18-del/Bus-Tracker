import React, { useState } from 'react';
import { X, Key, CheckCircle2, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentKey: string;
  onSaveKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  currentKey,
  onSaveKey,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState(currentKey);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const defaultKey = 'qj4xC9Up9YmsSAbfywNyD0vdpubZ09m9';

  const handleTestKey = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch(`/api/buses/summary?key=${encodeURIComponent(apiKeyInput)}&force=true`);
      const data = await res.json();
      if (data.success && data.summary) {
        setTestResult({
          success: true,
          message: `Success! Connected to Delhi OTD. ${data.summary.totalBuses.toLocaleString()} active buses retrieved in ${data.summary.latencyMs}ms.`,
        });
      } else {
        setTestResult({
          success: false,
          message: data.error || 'Failed to authenticate with Delhi OTD API.',
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || 'Network error during verification.',
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    onSaveKey(apiKeyInput.trim() || defaultKey);
    onClose();
  };

  const handleResetDefault = () => {
    setApiKeyInput(defaultKey);
    setTestResult(null);
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">DTC Open Data API Key</h3>
              <p className="text-xs text-slate-400">Delhi Open Transit Data (OTD) Platform</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-sm text-slate-700">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Active API Key
            </label>
            <input
              type="text"
              value={apiKeyInput}
              onChange={(e) => {
                setApiKeyInput(e.target.value);
                setTestResult(null);
              }}
              placeholder="Enter DTC OTD API Key..."
              className="w-full px-3.5 py-2.5 font-mono text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />
          </div>

          {/* Test Status Message */}
          {testResult && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                testResult.success
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <span>{testResult.message}</span>
            </div>
          )}

          {/* Info Card */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1.5">
            <div className="font-semibold text-slate-800">About Delhi Open Transit Data:</div>
            <p>
              This application connects directly to the Government of NCT Delhi Open Transit Data
              real-time GTFS Protocol Buffer feed (<code>otd.delhi.gov.in/api/realtime/VehiclePositions.pb</code>).
            </p>
            <p className="text-[11px] text-slate-500">
              Your key{' '}
              <span className="font-mono font-semibold text-slate-700">
                qj4xC9Up9YmsSAbfywNyD0vdpubZ09m9
              </span>{' '}
              is configured and actively retrieving live Delhi bus telemetry.
            </p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handleResetDefault}
              className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
            >
              Reset to Default Key
            </button>

            <button
              onClick={handleTestKey}
              disabled={testing || !apiKeyInput.trim()}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${testing ? 'animate-spin' : ''}`} />
              {testing ? 'Verifying...' : 'Test Connection'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition"
          >
            Apply Key
          </button>
        </div>
      </div>
    </div>
  );
};
