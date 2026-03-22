'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null,
  );
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'unread' | 'unreplied'
  >('all');
  const router = useRouter();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch('/api/admin/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data.data || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/messages?id=${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessages(messages.filter((m) => m._id !== id));
        setSelectedMessage(null);
      } else {
        setError('Failed to delete message');
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const openMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      // Mark as read
      try {
        const token = localStorage.getItem('adminToken');
        await fetch(`/api/admin/messages/${message._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(
          messages.map((m) =>
            m._id === message._id ? { ...m, isRead: true } : m,
          ),
        );
        setSelectedMessage({ ...message, isRead: true });
      } catch (err) {
        console.error('Error marking message as read:', err);
      }
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (filterStatus === 'unread') return !m.isRead;
    if (filterStatus === 'unreplied') return !m.isReplied;
    return true;
  });

  const stats = {
    total: messages.length,
    unread: messages.filter((m) => !m.isRead).length,
    unreplied: messages.filter((m) => !m.isReplied).length,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[80vh]">
      {/* Messages List */}
      <div className="lg:col-span-1 flex flex-col">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">Messages</h1>
          <p className="text-zinc-400">
            Total: {stats.total} | Unread: {stats.unread} | Unreplied:{' '}
            {stats.unreplied}
          </p>
        </div>

        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              filterStatus === 'all'
                ? 'bg-white text-black'
                : 'bg-zinc-800 text-white hover:bg-zinc-700'
            }`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilterStatus('unread')}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              filterStatus === 'unread'
                ? 'bg-white text-black'
                : 'bg-zinc-800 text-white hover:bg-zinc-700'
            }`}
          >
            Unread ({stats.unread})
          </button>
          <button
            onClick={() => setFilterStatus('unreplied')}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              filterStatus === 'unreplied'
                ? 'bg-white text-black'
                : 'bg-zinc-800 text-white hover:bg-zinc-700'
            }`}
          >
            Unreplied ({stats.unreplied})
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {isLoading ? (
            <div className="text-white text-center py-4">
              Loading messages...
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-center text-zinc-400">
              No messages
            </div>
          ) : (
            filteredMessages.map((message) => (
              <button
                key={message._id}
                onClick={() => openMessage(message)}
                className={`w-full text-left p-3 rounded-lg transition border ${
                  selectedMessage?._id === message._id
                    ? 'bg-blue-900 border-blue-700'
                    : 'bg-zinc-900 border-zinc-700 hover:border-zinc-600'
                }`}
              >
                <div className="flex items-start gap-2">
                  {!message.isRead && (
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">
                      {message.name}
                    </h3>
                    <p className="text-xs text-zinc-400 truncate">
                      {message.subject}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Message Details */}
      <div className="lg:col-span-2 flex flex-col">
        {selectedMessage ? (
          <>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                {selectedMessage.subject}
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-zinc-400">From: </span>
                <span className="text-white">{selectedMessage.name}</span>
                <span className="text-zinc-500">({selectedMessage.email})</span>
              </div>
              <p className="text-xs text-zinc-500">
                {new Date(selectedMessage.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto mb-6 p-4 bg-zinc-900 border border-zinc-700 rounded-lg">
              <p className="text-white whitespace-pre-wrap">
                {selectedMessage.message}
              </p>
            </div>

            <div className="flex gap-2 mb-4">
              {selectedMessage.isReplied ? (
                <div className="text-green-400 text-sm font-medium">
                  ✓ Replied
                </div>
              ) : (
                <div className="text-orange-400 text-sm font-medium">
                  ⏱ Awaiting Reply
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(selectedMessage._id)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete Message
              </button>
              <a
                href={`mailto:${selectedMessage.email}`}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center"
              >
                Reply via Email
              </a>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-400">
            <p>Select a message to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
