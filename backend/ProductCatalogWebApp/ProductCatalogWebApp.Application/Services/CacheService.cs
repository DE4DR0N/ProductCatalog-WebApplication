using System.Collections.Concurrent;
using Microsoft.Extensions.Caching.Memory;
using ProductCatalogWebApp.Application.Abstractions;

namespace ProductCatalogWebApp.Application.Services;

public class CacheService : ICacheService
{
    private readonly IMemoryCache _memoryCache;
    private readonly ConcurrentDictionary<string, bool> _keys;

    public CacheService(IMemoryCache memoryCache)
    {
        _memoryCache = memoryCache;
        _keys = new ConcurrentDictionary<string, bool>();
    }

    public void Set<T>(string key, T value, TimeSpan expiration)
    {
        _memoryCache.Set(key, value, expiration);
        _keys.TryAdd(key, true);
    }

    public bool TryGetValue<T>(string key, out T value)
    {
        return _memoryCache.TryGetValue(key, out value);
    }

    public void Remove(string key)
    {
        _memoryCache.Remove(key);
        _keys.TryRemove(key, out _);
    }

    public void RemoveByPrefix(string prefix)
    {
        var keysToRemove = _keys.Keys.Where(k => k.StartsWith(prefix)).ToList();
        foreach (var key in keysToRemove)
        {
            _memoryCache.Remove(key);
            _keys.TryRemove(key, out _);
        }
    }
}