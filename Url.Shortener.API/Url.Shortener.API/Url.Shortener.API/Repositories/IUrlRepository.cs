using Url.Shortener.API.Models;

namespace Url.Shortener.API.Repositories
{
    public interface IUrlRepository
    {
        Task<bool> IsShortUrlExists(string shortUrl);
        Task<UrlModel> CreateShortUrl(string longUrl);
        Task<UrlModel> GetLongUrlByShortUrl(string shortUrl);

        Task<IEnumerable<UrlModel>> GetTrendingUrls(int noOfResult);

    }
}
