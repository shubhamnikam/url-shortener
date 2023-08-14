using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System.Data;
using System.Security.Cryptography;
using Url.Shortener.API.Entities;
using Url.Shortener.API.Options;
using Url.Shortener.API.Service;
using Url.Shortener.API.Utilities;
using static MongoDB.Driver.WriteConcern;

namespace Url.Shortener.API.Services
{
    public class UrlService : IUrlService
    {
        private readonly ILogger<UrlService> logger;
        private readonly ExtraConfigOptions extraConfigOptions;
        private readonly IMongoDbService dbService;
        private readonly Random random;

        public UrlService(ILogger<UrlService> logger,
            IOptions<ExtraConfigOptions> extraConfigOptions,
            IMongoDbService dbService)
        {
            this.logger = logger;
            this.extraConfigOptions = extraConfigOptions.Value;
            this.dbService = dbService;
            this.random = new Random();

        }
        public async Task<UrlEntity> CreateShortUrl(string longUrl)
        {
            var inputUrlModel = new UrlEntity()
            {
                //encode url
                LongUrl = longUrl,
                ShortUrl = await __GetUniqueShortUrl(AppConstants.LENGTH_SHORT_URL),
                Count = 0,
                IsActive = true,
                CreatedTimestamp = DateTime.UtcNow,
            };

            await dbService
               .GetMongoCollection<UrlEntity>(this.extraConfigOptions.MongoDbConfig.DefaultCollectionName)
               .InsertOneAsync(inputUrlModel);

            return inputUrlModel;
        }

        public async Task<bool> IsShortUrlExists(string shortUrl)
        {
            var result = await dbService
                .GetMongoCollection<UrlEntity>(this.extraConfigOptions.MongoDbConfig.DefaultCollectionName)
                .FindAsync(x => x.ShortUrl == shortUrl);

            var data = await result.FirstOrDefaultAsync();

            return data is null ? false : true;
        }

        private async Task<string> __GetUniqueShortUrl(int length)
        {

            var retryCount = 0;
            var url = string.Empty;
            string timestamp;
            int randomNum;
            byte[] hash;
            var rand = new Random();
            using var sha256 = SHA256.Create();
            do
            {
                retryCount++;
                timestamp = DateTime.Now.ToString("yyyyMMddHHmmss");
                randomNum = rand.Next(100000, 999999);
                hash = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes($"{timestamp}{randomNum}"));
                url = BitConverter.ToString(hash).Replace("-", "").Substring(0, length);

            } while (await IsShortUrlExists(url));
            return url;
        }

        public async Task<UrlEntity> GetLongUrlByShortUrl(string shortUrl)
        {
            var result = await dbService
                .GetMongoCollection<UrlEntity>(this.extraConfigOptions.MongoDbConfig.DefaultCollectionName)
                .FindOneAndUpdateAsync(
                    Builders<UrlEntity>.Filter.Eq(x => x.ShortUrl, shortUrl),
                    Builders<UrlEntity>.Update.Inc(x => x.Count, 1),
                    new FindOneAndUpdateOptions<UrlEntity, UrlEntity>
                    {
                        IsUpsert = true,
                        ReturnDocument = ReturnDocument.After
                    }
                );
            return result;
        }

        public async Task<IEnumerable<UrlEntity>> GetTrendingUrls(int noOfResult)
        {
            return await dbService
                 .GetMongoCollection<UrlEntity>(this.extraConfigOptions.MongoDbConfig.DefaultCollectionName)
                 .Find(Builders<UrlEntity>.Filter.Empty)
                 .SortByDescending(x => x.Count)
                 .Limit(noOfResult)
                 .ToListAsync();
        }
    }
}
