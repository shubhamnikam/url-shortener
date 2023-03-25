using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using Url.Shortener.API.Models;
using Url.Shortener.API.Utilities;

namespace Url.Shortener.API.Repositories
{
    public class UrlRepository : IUrlRepository
    {
        private readonly UrlDbContext urlDbContext;

        public UrlRepository(UrlDbContext urlDbContext)
        {
            this.urlDbContext = urlDbContext;
        }

        public async Task<UrlModel> CreateShortUrl(string longUrl)
        {
            var inputUrlModel = new UrlModel()
            {
                //encode url
                LongUrl = longUrl,
                ShortUrl = await __GetUniqueShortUrl(AppConstants.LENGTH_SHORT_URL),
                Count = 0,
                IsActive = true,
                CreatedTimestamp = DateTime.UtcNow,
            };

            var result = await urlDbContext.Urls.AddAsync(inputUrlModel);
            result.State = EntityState.Added;
            urlDbContext.SaveChanges();
            return inputUrlModel;
        }

        public async Task<bool> IsShortUrlExists(string shortUrl)
        {
            var result = urlDbContext.Urls.Where(x => x.ShortUrl == shortUrl)
                        .FirstOrDefault();

            return result is null ? false : true;
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

        public async Task<UrlModel> GetLongUrlByShortUrl(string shortUrl)
        {
            var model = urlDbContext.Urls.Where(x => x.ShortUrl == shortUrl).FirstOrDefault();
            if (model is not null)
            {
                model.Count++;
                var op = urlDbContext.Urls.Update(model);
                op.State = EntityState.Modified;
                await urlDbContext.SaveChangesAsync();

            }
            return model;
        }

        public async Task<IEnumerable<UrlModel>> GetTrendingUrls(int noOfResult)
        {
            return await urlDbContext.Urls.OrderByDescending(x => x.Count)
                .Take(noOfResult)
                .ToListAsync();
        }

    }
}
