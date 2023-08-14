using Url.Shortener.API.Entities;
using Url.Shortener.API.Models;

namespace Url.Shortener.API.Service
{
    public interface IUrlService
    {
        Task<bool> IsShortUrlExists(string shortUrl);
        Task<UrlEntity> CreateShortUrl(string longUrl);
        Task<UrlEntity> GetLongUrlByShortUrl(string shortUrl);

        Task<IEnumerable<UrlEntity>> GetTrendingUrls(int noOfResult);

    }
}
