using System.Text.Json;
using Application.Contracts.Interfaces;
using Microsoft.Extensions.Caching.Distributed;
using StackExchange.Redis;
namespace Persistence.Repositories
{
    public class CacheRepository : ICacheRepository
    {
        private readonly IDistributedCache _cache;
        private readonly IConnectionMultiplexer _redis;

        public CacheRepository(IDistributedCache cache, IConnectionMultiplexer redis)
        {
            _cache = cache;
            _redis = redis;
        }
        public async Task<T?> GetAsync<T>(string key)
        {
            var data = await _cache.GetStringAsync(key);
            if (data == null) return default;

            return JsonSerializer.Deserialize<T>(data);
        }

        public async Task SetAsync<T>(string key, T value, TimeSpan expiration)
        {
            var options = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = expiration
            };

            var json = JsonSerializer.Serialize(value);
            await _cache.SetStringAsync(key, json, options);
        }

        // 🔹 Register cache key inside a Redis Set
        public async Task RegisterKeyAsync(string group, string key)
        {
            var db = _redis.GetDatabase();
            await db.SetAddAsync(group, key);
        }

        // 🔥 Remove all keys in a group
        public async Task RemoveGroupAsync(string group)
        {
            var db = _redis.GetDatabase();

            var members = await db.SetMembersAsync(group);

            if (members.Any())
            {
                RedisKey[] keys = members
                    .Select(m => (RedisKey)m.ToString())
                    .ToArray();

                await db.KeyDeleteAsync(keys);
            }

            // delete the group set itself
            await db.KeyDeleteAsync(group);
        }


    }
}